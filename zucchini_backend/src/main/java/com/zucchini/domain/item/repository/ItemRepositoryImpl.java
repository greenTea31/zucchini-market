package com.zucchini.domain.item.repository;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.domain.QItem;
import com.zucchini.domain.user.domain.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

@RequiredArgsConstructor
public class ItemRepositoryImpl implements ItemRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    /**
     * 상품 상세 조회
     * - 탈퇴했거나 잠긴 회원 상품 제외
     * @param itemNo : 상품 번호 (PK)
     * @return Item : 상품 상세 정보
     */
    @Override
    public Item findItemByUser(int itemNo) {
        QItem item = QItem.item;

        return queryFactory.select(item)
                .from(item)
                .where(
                        item.no.eq(itemNo)
                                .and(item.seller.isDeleted.eq(false))
                                .and(item.seller.isLocked.eq(false))
                )
                .fetchOne();
    }

    /**
     * 상품 전체 조회(페이징)
     * - 탈퇴했거나 잠긴 회원 상품 제외
     * @param keyword : 검색어
     * @param pageable : 페이지 정보
     * @return
     */
    @Override
    public Page<Item> findPageItems(String keyword, Pageable pageable) {
        QItem item = QItem.item;
        QUser user = QUser.user;
        // 해당 페이지에 해당되는 상품 목록 조회
        List<Item> itemList = queryFactory
                .select(item)
                .from(item)
                .join(item.seller, user)
                .fetchJoin()
                .where(item.title.contains(keyword)
                        // 탈퇴했거나 정지된 회원의 상품은 제외
                        .and(user.isDeleted.eq(false))
                        .and(user.isLocked.eq(false))
                        .and(item.status.eq(0)))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                // 상품 번호 오름차순 정렬(만약 정렬 옵션 추가 시 여기 바꿔줘야 함)
                .orderBy(item.no.desc())
                .fetch();
        // 해당 페이지에 해당되는 상품 전체 개수 구하는 카운트 쿼리
        JPAQuery<Long> countQuery = queryFactory
                .select(item.count())
                .from(item)
                .join(item.seller, user)
                .where(item.title.contains(keyword)
                        .and(user.isDeleted.eq(false))
                        .and(user.isLocked.eq(false))
                        .and(item.status.eq(0)));

        // 카운트 쿼리 최적화 -> 페이지 크기보다 전체 개수가 적거나 마지막 페이지인 경우 카운트 쿼리를 수행하지 않음
        return PageableExecutionUtils.getPage(itemList, pageable, countQuery::fetchOne);
    }

}
