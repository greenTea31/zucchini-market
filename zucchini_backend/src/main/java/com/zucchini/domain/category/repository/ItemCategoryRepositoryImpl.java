package com.zucchini.domain.category.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.zucchini.domain.category.domain.ItemCategory;
import com.zucchini.domain.category.domain.QCategory;
import com.zucchini.domain.category.domain.QItemCategory;
import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.domain.QItem;
import com.zucchini.domain.user.domain.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class ItemCategoryRepositoryImpl implements ItemCategoryRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    /**
     * 카테고리에 속한 상품 조회(페이징)
     * @param category : 카테고리
     * @param keyword : 검색어
     * @param pageable : 페이지 정보
     * @return Page<Item>
     */
    @Override
    public Page<Item> findPageItemsByCategory(String category, String keyword, Pageable pageable) {
        QItemCategory ic = QItemCategory.itemCategory;
        QItem i = QItem.item;
        QUser u = QUser.user;
        QCategory c = QCategory.category1;
        // 해당 카테고리에 속해있고 title에 검색어가 포함된 상품 목록에서 해당 페이지에 속한 상품들 페이지 크기만큼 조회
        List<ItemCategory> itemCategoryList = queryFactory
                .select(ic)
                .from(ic)
                .join(ic.category, c)
                .fetchJoin()
                .join(ic.item, i)
                .fetchJoin()
                .where(c.category.eq(category)
                        .and(i.title.contains(keyword))
                        .and(
                                i.in(JPAExpressions
                                        .select(i)
                                        .from(i)
                                        .join(i.seller, u)
                                        .where(u.isDeleted.eq(false)
                                                .and(u.isLocked.eq(false))
                                                .and(i.status.eq(0)))
                        )
                ))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                // 상품 번호 오름차순 정렬(만약 정렬 옵션 추가 시 여기 바꿔줘야 함)
                .orderBy(ic.item.no.desc())
                .fetch();
        // 해당 카테고리에 속해있고 title에 검색어가 포함된 상품 전체 개수 구하는 카운트 쿼리
        JPAQuery<Long> countQuery = queryFactory
                .select(ic.count())
                .from(ic)
                .join(ic.category, c)
                .join(ic.item, i)
                .where(c.category.eq(category)
                        .and(i.title.contains(keyword))
                        .and(
                                i.in(JPAExpressions
                                        .select(i)
                                        .from(i)
                                        .join(i.seller, u)
                                        .where(u.isDeleted.eq(false)
                                                .and(u.isLocked.eq(false))
                                                .and(i.status.eq(0)))
                                )
                        ));

        List<Item> itemList = itemCategoryList.stream().map(
                itemCategory -> itemCategory.getItem()
        ).collect(Collectors.toList());
        // 카운트 쿼리 최적화 -> 페이지 크기보다 전체 개수가 적거나 마지막 페이지인 경우 카운트 쿼리를 수행하지 않음
        return PageableExecutionUtils.getPage(itemList, pageable, countQuery::fetchOne);
    }

}
