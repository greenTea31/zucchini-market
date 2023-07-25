package com.zucchini.domain.room.repository;

import com.zucchini.domain.room.domain.Message;
import com.zucchini.domain.room.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    List<Message> findAllByRoom(Room room);

}
