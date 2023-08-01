package com.zucchini.domain.room.repository;

import com.zucchini.domain.room.domain.Room;

import java.util.List;

public interface RoomRepositoryCustom {
    List<Room> findAllItemRoom(int itemId);

}
