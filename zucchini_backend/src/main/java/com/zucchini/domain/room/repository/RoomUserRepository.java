package com.zucchini.domain.room.repository;

import com.zucchini.domain.room.domain.Room;
import com.zucchini.domain.room.domain.RoomUser;
import com.zucchini.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoomUserRepository extends JpaRepository<RoomUser, Integer> {

    /**
     * 특정 채팅방에 대한 유저 로그인 여부를 조회함
     * @param room : 채팅방
     * @param user : 유저
     * @return RoomUser : 유저 참가 정보
     */
    RoomUser findByRoomAndUser(Room room, User user);

    /**
     * 특정 채팅방에 로그인한 유저의 수를 조회함
     * @param room : 채팅방
     * @return int : 유저 수
     */
    int countByRoom(Room room);

    /**
     * 특정 채팅방에 로그인한 유저의 정보를 삭제, 즉 유저를 방에서 퇴장시킴
     * @param room : 채팅방
     * @param user : 유저
     */
    void deleteByRoomAndUser(Room room, User user);

    /**
     * 특정 아이템의 채팅방에서 유저가 들어가 있는 모든 채팅방을 조회함
     * @param itemNo
     * @param currentPrincipalNo
     * @return List<Room> : 채팅방 리스트
     */
    @Query("SELECT r FROM RoomUser ru " +
            "JOIN ru.user u " +
            "JOIN ru.room r " +
            "JOIN r.item i " +
            "WHERE u.no = :currentPrincipalNo AND i.no = :itemNo")
    List<Room> findRoomsByItemNoAndUser(@Param("itemNo") int itemNo, @Param("currentPrincipalNo") int currentPrincipalNo);

    /**
     * 특정 유저가 들어가 있는 모든 채팅방을 조회함
     * @param currentPrincipalNo : 현재 로그인한 유저의 번호
     * @return List<Room> : 채팅방 리스트
     */
    @Query("SELECT r FROM RoomUser ru " +
            "JOIN ru.user u " +
            "JOIN ru.room r " +
            "WHERE u.no = :currentPrincipalNo")
    List<Room> findAllRoomsByUser(@Param("currentPrincipalNo") int currentPrincipalNo);

    /**
     * 특정 채팅방에 특정 유저가 들어가 있는지 여부를 조회함
     * @param room : 채팅방
     * @param user : 유저
     * @return boolean : 유저가 채팅방에 들어가 있는지 여부
     */
    boolean existsByRoomAndUser(Room room, User user);

    /**
     * 특정 채팅방과 유저 아이디를 입력받아 그 채팅방에 있는 상대방 유저를 조회함
     */
    @Query("SELECT u FROM RoomUser ru " +
            "JOIN ru.user u " +
            "JOIN ru.room r " +
            "WHERE r.no = :roomNo AND u.no != :userNo")
    User findOpponentByRoomAndUser(@Param("roomNo") int roomNo, @Param("userNo") int userNo);

}
