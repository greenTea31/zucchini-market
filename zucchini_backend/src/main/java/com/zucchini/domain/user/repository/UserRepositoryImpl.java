package com.zucchini.domain.user.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.zucchini.domain.user.domain.QUser;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public long countItemsByStatusAndUserNo(String id) {
        QUser user = QUser.user;
//        QItem item = QItem.item;
//
//        return queryFactory
//                .select(item)
//                .from(item)
//                .where(item.status.eq(2)
//                        .and(queryFactory.select(user.no)
//                                .from(user)
//                                .where(user.id.eq(id))
//                                .in(item.buyer.no, item.seller.no)))
//                .fetchCount();
        return 1L;
    }
}
