package com.zucchini.domain.reservation.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class CheckReservationResponse {

    // 예약하려는 날짜 검사 결과
    int status;
    // status가 1인 경우 code 반환
    UUID code;

}
