package com.zucchini.domain.reservation.repository;

import com.zucchini.domain.reservation.domain.Reservation;
import com.zucchini.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    /**
     * 회원의 모든 예약 내역 조회
     * @param user : 현재 로그인한 회원
     * @return List<Reservation> : 예약 내역 리스트
     */
    List<Reservation> findAllByUser(User user);

    /**
     * 회원의 모든 화상 일정을 반환하는 쿼리
     * @param user : 현재 로그인한 회원
     * @return List<Date> : 예약된 화상 일정 리스트
     */
    @Query("SELECT c.confirmedDate FROM Reservation r JOIN r.conference c WHERE r.user = :user")
    List<Date> findAllConfirmedDatesByUser(User user);

    /**
     * 여러 날짜들 중에서 예약된 화상 일정과 겹치는 날짜들을 조회하는데 사용
     * @param user
     * @param dates
     * @return
     */
    @Query("SELECT c.confirmedDate FROM Reservation r JOIN r.conference c WHERE r.user = :user AND c.confirmedDate IN :dates")
    List<Date> findOverlapDatesByUserAndDates(@Param("user") User user, @Param("dates") List<Date> dates);

    /**
     * 특정 날짜와 일치하는 예약을 조회하는 데 사용
     * @param userId : 유저의 아이디
     * @param date : 예약하려는 날짜
     * @return : 예약 목록을 리스트로 반환
     */
    @Query(value = "select r from Reservation r " +
            "join fetch r.user u " +
            "join fetch r.conference c " +
            "where u.id = :userId " +
            "and c.confirmedDate = :date")
    Optional<Reservation> findWithFetchJoinByUserIdAndDate(String userId, Date date);

    /**
     * 컨퍼런스와 관련된 모든 reservation을 조회해서 입력받은 id를 가진 seller나 buyer가 하나라도 존재하는지를 판단하는 쿼리
     * @param conferenceNo : 컨퍼런스 번호
     * @param user : 현재 로그인한 회원
     * @return List<Reservation> : 예약 내역 리스트
     */
    @Query("SELECT r FROM Reservation r JOIN FETCH r.conference c WHERE c.no = :conferenceNo AND r.user = :user")
    List<Reservation> findByConferenceNoAndUser(@Param("conferenceNo") int conferenceNo, @Param("user") User user);

    /**
     * 컨퍼런스 번호에 해당되는 예약 조회 쿼리
     * @param conferenceNo
     * @return
     */
    @Query(value = "select r from Reservation r where r.conferenceNo = :conferenceNo")
    List<Reservation> findByConferenceNo(@Param("conferenceNo") int conferenceNo);


}
