package com.zucchini.domain.reservation.service;

import com.zucchini.domain.reservation.dto.request.AddReservationRequest;
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
    void addReservation(AddReservationRequest addReservationRequest);

}
