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
     * 회원의 모든 예약 내역 조회하되, 해당 예약 내역의 컨퍼런스, 컨퍼런스의 아이템 타고 들어가서 item의 status가 0인 것만 조회 하되, 현재 시간보다 컨퍼런스의 날짜가 60분 이후이면 조회하지 않음
     * @param user : 현재 로그인한 회원
     * @return List<Reservation> : 예약 내역 리스트
     */

    @Query("SELECT r FROM Reservation r JOIN r.conference c JOIN c.item i WHERE c.confirmedDate > :before1Hour AND r.user = :user AND i.status = 0 ORDER BY c.confirmedDate ASC")
    List<Reservation> findActiveReservationAllByUser(User user, Date before1Hour);

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

    /**
     * 컨퍼런스 번호와 연관된 예약자중에 연관된 item에서 seller가 아닌 사람을 반환하는 쿼리
     */
    @Query(value = "select r from Reservation r " +
            "join fetch r.user u " +
            "join fetch r.conference c " +
            "join fetch c.item i " +
            "where i.seller.id != u.id " +
            "and c.no = :conferenceNo")
    Reservation findBuyerNameByConferenceNo(@Param("conferenceNo") int conferenceNo);

    /**
     * 해당 아이템에 관한 구매자의 예약이 존재하는지 판별하는 쿼리
     */
    @Query(value = "select r from Reservation r " +
            "join fetch r.conference c " +
            "join fetch c.item i " +
            "join fetch r.user u " +
            "where i.no = :itemNo " +
            "and u = :user")
    List<Reservation> countReservationsByItemNoAndUser(@Param("itemNo") int itemNo, @Param("user") User user);


}
