package com.zucchini.domain.room.repository;

import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.room.domain.Room;
import com.zucchini.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {

    /**
     * 특정 아이템에 대한 모든 채팅방을 조회함
     * @param item : 아이템
     * @return List<Room> : 채팅방 리스트
     */
    List<Room> findAllByItem(Item item);

    /**
     * 특정 아이템에 대한 회원의 채팅방을 조회함
     * @param itemNo : 상품 번호
     * @param user : 회원
     * @return Room : 채팅방
     */
    @Query(value = "SELECT r FROM RoomUser ru JOIN ru.room r WHERE r.item.no = :itemNo AND ru.user = :user")
    Room findByItemAndUser(int itemNo, User user);

    @Query(value = "SELECT i FROM Room r JOIN r.item i WHERE r.no = :roomNo")
    Item findItemByRoom(int roomNo);

}
