package com.zucchini.domain.reservation.repository;

import com.zucchini.domain.conference.domain.Conference;
import com.zucchini.domain.reservation.domain.Reservation;
import com.zucchini.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    // user_no으로 모든 예약 내역 조회
    List<Reservation> findAllByUser(User user);

    @Query("SELECT c.confirmedDate FROM Reservation r JOIN r.conference c WHERE r.user = :user")
    List<Date> findAllConfirmedDatesByUser(User user);

    @Query("SELECT c.confirmedDate FROM Reservation r JOIN r.conference c WHERE r.user = :user AND c.confirmedDate IN :dates")
    List<Date> findOverlapDatesByUserAndDates(@Param("user") User user, @Param("dates") List<Date> dates);

    @Query(value = "select r from Reservation r " +
            "join fetch r.user u " +
            "join fetch r.conference c " +
            "where u.id = :userId " +
            "and c.confirmedDate = :date")
    Optional<Reservation> findWithFetchJoinByUserIdAndDate(String userId, Date date);
    // 회원의 예약된 화상 일정들에 해당 날짜가 존재하는지 확인하는 함수

    // 찾은 컨퍼런스와 관련된 모든 reservation을 찾은 후, reservation들의 User 필드가 현재 로그인한 유저랑 단 하나라도 같지 않다면 권한이 없다는 예외를 발생시킴
    // 컨퍼런스와 관련된 모든 reservation을 조회해서 입력받은 id를 가진 seller나 buyer가 하나라도 존재하는지를 판단하는 쿼리
    @Query("SELECT r FROM Reservation r JOIN FETCH r.conference c WHERE c.no = :conferenceNo AND r.user = :user")
    List<Reservation> findByConferenceNoAndUser(@Param("conferenceNo") int conferenceNo, @Param("user") User user);


}
