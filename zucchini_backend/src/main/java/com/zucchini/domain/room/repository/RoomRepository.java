package com.zucchini.domain.room.repository;

import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.room.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {

    List<Room> findAllByItem(Item item);

}
