package com.zucchini.domain.room.repository;

import com.zucchini.domain.room.domain.Message;
import com.zucchini.domain.room.domain.Room;
import com.zucchini.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    List<Message> findAllByRoom(Room room);
    Message findTopByRoomOrderByCreatedAtDesc(Room room);
    int countByRoomAndIsRead(Room room, boolean isRead);
    List<Message> findAllByRoomAndSenderNotAndIsRead(Room room, User user, boolean isRead);

}
