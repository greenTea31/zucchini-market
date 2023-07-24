package com.zucchini.domain.room.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.zucchini.domain.room.domain.Room;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class RoomRepositoryImpl implements RoomRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    @Override
    public List<Room> findAllItemRoom(int itemId) {
        return null;
    }
}
