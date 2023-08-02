package com.zucchini.domain.reservation.dto.request;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

/**
 * 재확인 요청 Request
 * - 구매자가 등록한 판매 상품의 날짜 목록에 예약 원하는 날짜가 포함된 경우
 * - UUID 코드와 함께 확인 요청을 보냄
 */
@Data
public class ConfirmReservationRequest {

    @NotNull
    //아이템 번호
    Integer itemNo;

    @NotNull
    // 구매자가 예약하려는 선택한 날짜
    Date selectDate;

    @NotNull
    // UUID 코드
    UUID code;

}
