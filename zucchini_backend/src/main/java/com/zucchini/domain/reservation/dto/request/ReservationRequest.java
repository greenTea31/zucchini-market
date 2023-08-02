package com.zucchini.domain.reservation.dto.request;

import lombok.Data;

import java.util.Date;

/**
 * 유저가 보내는 예약 요청 객체
 */
@Data
public class ReservationRequest {

    //아이템 번호
    int itemNo;
    // 구매자가 예약하려는 선택한 날짜
    Date selectDate;

}
