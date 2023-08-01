package com.zucchini.domain.reservation.dto.request;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

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
