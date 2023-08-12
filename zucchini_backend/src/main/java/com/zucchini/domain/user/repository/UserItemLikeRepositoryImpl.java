package com.zucchini.domain.user.repository;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.domain.QItem;
import com.zucchini.domain.user.domain.QUser;
import com.zucchini.domain.user.domain.QUserItemLike;
import com.zucchini.domain.user.domain.User;
import com.zucchini.domain.user.domain.UserItemLike;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class UserItemLikeRepositoryImpl implements UserItemLikeRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    /**
     * 회원의 찜 목록 조회(페이징)
     * @param keyword
     * @param pageable
     * @return
     */
    @Override
    public Page<Item> findPageUserLikeItems(String userId, String keyword, Pageable pageable) {
        QUserItemLike uil = QUserItemLike.userItemLike;
        QUser u = QUser.user;
        QItem i = QItem.item;
        // 회원이 찜한 상품 중 검색어를 포함하는 title을 가진 상품 목록에서 해당 페이지의 회원이 찜한 상품 조회
        List<UserItemLike> userItemLikeList = queryFactory
                .select(uil)
                .from(uil)
                .join(uil.user, u)
                .fetchJoin()
                .join(uil.item, i)
                .fetchJoin()
                .where(u.id.eq(userId), i.title.contains(keyword))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                // 상품 번호 오름차순 정렬(만약 정렬 옵션 추가 시 여기 바꿔줘야 함)
                .orderBy(uil.item.no.asc())
                .fetch();
        // 회원이 찜한 상품 중 검색어를 포함하는 title을 가진 상품 전체 개수 구하는 카운트 쿼리
        JPAQuery<Long> countQuery = queryFactory
                .select(uil.count())
                .from(uil)
                .join(uil.user, u)
                .join(uil.item, i)
                .where(u.id.eq(userId), i.title.contains(keyword));

        List<Item> itemList = userItemLikeList.stream().map(
                userItemLike -> userItemLike.getItem()
        ).collect(Collectors.toList());
        // 카운트 쿼리 최적화 -> 페이지 크기보다 전체 개수가 적거나 마지막 페이지인 경우 카운트 쿼리를 수행하지 않음
        return PageableExecutionUtils.getPage(itemList, pageable, countQuery::fetchOne);
    }

//    @EntityGraph(value = "Item.withImages", type = EntityGraph.EntityGraphType.LOAD)
//    @Query(value = "select i from Item i " +
//            "where i.buyer = :user and i.title like concat('%', :keyword, '%') ")
//    List<Item> findAllByBuyer(User user, String keyword);
//
//    /**
//     * 판매 목록 조회 (검색 기능 포함)
//     * @param user : 회원
//     * @param keyword : 검색어
//     * @return List<Item> : 판매 목록 리스트
//     */
//    @EntityGraph(value = "Item.withImages", type = EntityGraph.EntityGraphType.LOAD)
//    @Query(value = "select i from Item i " +
//            "where i.seller = :user and i.title like concat('%', :keyword, '%') ")
//    List<Item> findAllBySeller(User user, String keyword);

}
