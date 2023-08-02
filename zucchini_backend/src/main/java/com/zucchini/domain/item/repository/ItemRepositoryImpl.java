package com.zucchini.domain.item.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.domain.QItem;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ItemRepositoryImpl implements ItemRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    /**
     * 상품 전체 조회 (검색 기능 포함)
     * - 탈퇴했거나 잠긴 회원 상품 제외
     * @param keyword : 검색어
     * @return List<Item> : 상품 리스트
     */
    @Override
    public List<Item> findItemAllByUser(String keyword) {
        QItem item = QItem.item;

        return queryFactory.select(item)
                .from(item)
                .where(
                        item.title.contains(keyword)
                                .and(item.seller.isDeleted.eq(false))
                                .and(item.seller.isLocked.eq(false))
                )
                .fetch();
    }

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

}
