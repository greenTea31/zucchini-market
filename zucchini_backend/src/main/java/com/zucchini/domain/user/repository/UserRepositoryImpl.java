package com.zucchini.domain.user.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
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
public class UserRepositoryImpl implements UserRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    /**
     * 회원이 거래한 상품 개수 조회
     * @param id : 아이디
     * @return long : 상품 개수
     */
    @Override
    public long countItemsByStatusAndUserNo(String id) {
        QUser user = QUser.user;
        QItem item = QItem.item;

        int userId = queryFactory
                .select(user.no)
                .from(user)
                .where(user.nickname.eq(id))
                .fetchFirst();

        return queryFactory
                .select(item.count())
                .from(item)
                .where(
                        item.status.eq(2)
                                .and(
                                        item.buyer.no.eq(userId)
                                                .or(item.seller.no.eq(userId))
                                )
                )
                .fetchOne();
    }

    @Override
    public Page<Item> findPageSellListByUser(String userId, String keyword, Pageable pageable, int category) {
        QUser u = QUser.user;
        QItem i = QItem.item;

        BooleanExpression whereClause = u.id.eq(userId).and(i.title.contains(keyword));
        if (category >= 0) {
            whereClause = whereClause.and(i.status.eq(category));
        }

        List<Item> sellList = queryFactory
                .select(i)
                .from(i)
                .join(i.seller, u)
                .fetchJoin()
                .where(whereClause)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(i.no.desc())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(i.count())
                .from(i)
                .join(i.seller, u)
                .where(whereClause);

        return PageableExecutionUtils.getPage(sellList, pageable, countQuery::fetchOne);
    }

    @Override
    public Page<Item> findPageBuyListByUser(String userId, String keyword, Pageable pageable) {
        QUser u = QUser.user;
        QItem i = QItem.item;

        List<Item> buyList = queryFactory
                .select(i)
                .from(i)
                .join(i.buyer, u)
                .fetchJoin()
                .where(u.id.eq(userId), i.title.contains(keyword))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(i.no.desc())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(i.count())
                .from(i)
                .join(i.buyer, u)
                .where(u.id.eq(userId), i.title.contains(keyword));

        return PageableExecutionUtils.getPage(buyList, pageable, countQuery::fetchOne);
    }

}
