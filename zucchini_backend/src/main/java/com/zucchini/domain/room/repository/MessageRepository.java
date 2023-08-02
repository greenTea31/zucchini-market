package com.zucchini.domain.room.repository;

import com.zucchini.domain.room.domain.Message;
import com.zucchini.domain.room.domain.Room;
import com.zucchini.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    /**
     * 특정 채팅방의 모든 메세지를 조회함
     * @param room : 채팅방
     * @return List<Message> : 메세지 리스트
     */
    List<Message> findAllByRoom(Room room);

    /**
     * 특정 채팅방의 가장 최근 메세지를 조회함
     * @param room : 채팅방
     * @return Message : 가장 최근 메세지
     */
    Message findTopByRoomOrderByCreatedAtDesc(Room room);

    /**
     * 특정 채팅방의 읽지 않은 메세지의 개수를 조회함
     * @param room : 채팅방
     * @param isRead : 읽음 여부 (false로 호출함)
     * @return int : 읽지 않은 메세지의 개수
     */
    int countByRoomAndIsRead(Room room, boolean isRead);

    /**
     * 특정 채팅방의 내가 보내지 않았으면서 읽음 표시가 되지 않은 메세지의 개수를 조회함
     * @param room : 채팅방
     * @param user : 사용자
     * @param isRead : 읽음 여부 (false로 호출함)
     * @return List<Message> : 메세지 리스트
     */
    List<Message> findAllByRoomAndSenderNotAndIsRead(Room room, User user, boolean isRead);

}
