package com.zucchini.domain.room.repository;

import com.zucchini.domain.room.domain.Room;
import com.zucchini.domain.room.domain.RoomUser;
import com.zucchini.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoomUserRepository extends JpaRepository<RoomUser, Integer> {

    RoomUser findByRoomAndUser(Room room, User user);
    int countByRoom(Room room);
    void deleteByRoomAndUser(Room room, User user);

    @Query("SELECT r FROM RoomUser ru " +
            "JOIN ru.user u " +
            "JOIN ru.room r " +
            "JOIN r.item i " +
            "WHERE u.no = :currentPrincipalNo AND i.no = :itemNo")
    List<Room> findRoomsByItemNoAndUser(@Param("itemNo") int itemNo, @Param("currentPrincipalNo") int currentPrincipalNo);

    @Query("SELECT r FROM RoomUser ru " +
            "JOIN ru.user u " +
            "JOIN ru.room r " +
            "WHERE u.no = :currentPrincipalNo")
    List<Room> findAllRoomsByUser(@Param("currentPrincipalNo") int currentPrincipalNo);

    // currentPrincipalNo와 roomNo로 유저가 방에 접속해 있는지를 여부를 판단한다.
    boolean existsByRoomAndUser(Room room, User user);

}
