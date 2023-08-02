package com.zucchini.domain.reservation.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

/**
 * 구매자의 예약 날짜 확인 Response
 * - status 0 : 구매자가 예약 원하는 날짜가 예약 불가능인 경우 : status 0
 * - status 1 : 구매자가 예약 원하는 날짜가 예약 가능하지만 구매자가 등록한 판매 상품에 해당 날짜가 포함된 경우 UUID 코드와 함께 반환(재확인 용도)
 * - status 2 : 구매자가 예약 원하는 날짜가 예약 가능하고 겹치지 않는 경우 예약 생성까지 완료된 상태
 */
@Data
@Builder
public class CheckReservationResponse {

    // 예약하려는 날짜 검사 결과
    int status;

    // status가 1인 경우 code 반환
    UUID code;

}
