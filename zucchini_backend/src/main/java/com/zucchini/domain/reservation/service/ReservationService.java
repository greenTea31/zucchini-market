package com.zucchini.domain.reservation.service;

import com.zucchini.domain.reservation.dto.request.ConfirmReservationRequest;
import com.zucchini.domain.reservation.dto.request.ReservationRequest;
import com.zucchini.domain.reservation.dto.response.CheckReservationResponse;
import com.zucchini.domain.reservation.dto.response.ReservationResponse;

import java.util.Date;
import java.util.List;

public interface ReservationService {

    // 사용자의 모든 예약 내역 조회
    List<ReservationResponse> findReservationList();

//    // 판매자와 구매자한테 예약 내역 추가
//    void addReservation(String sellerId, String buyerId, int conferenceNo);

    /**
     * 현재 로그인한 유저의 화상 예약된 날짜를 리턴함
     */
    List<Date> findReservationDateList();

    /**
     * 예약 추가
     */
    void addReservation(int itemNo, Date selectDate);

    /**
     * 예약하려는 날짜 검사
     *
     * @return
     */
    CheckReservationResponse checkReservation(ReservationRequest checkReservationRequest);

    /**
     * 확인용 예약 코드 검사
     */
    void checkReservationConfirmCode(ConfirmReservationRequest confirmReservationRequest);

}
