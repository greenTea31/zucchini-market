package com.zucchini.domain.reservation.service;

import com.zucchini.domain.reservation.dto.ReservationResponse;
import java.util.List;

public interface ReservationService {

    // 사용자의 모든 예약 내역 조회
    List<ReservationResponse> findReservationList();

    // 판매자와 구매자한테 예약 내역 추가
    void addReservation(String sellerId, String buyerId, int conferenceNo);

}
