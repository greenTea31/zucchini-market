package com.zucchini.domain.room.repository;

import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.room.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {

    /**
     * 특정 아이템에 대한 모든 채팅방을 조회함
     * @param item : 아이템
     * @return List<Room> : 채팅방 리스트
     */
    List<Room> findAllByItem(Item item);

}
