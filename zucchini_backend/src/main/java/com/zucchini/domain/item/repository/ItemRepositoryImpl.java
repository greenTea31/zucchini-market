package com.zucchini.domain.item.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.domain.QItem;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ItemRepositoryImpl implements ItemRepositoryCustom{

    private final JPAQueryFactory queryFactory;

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
