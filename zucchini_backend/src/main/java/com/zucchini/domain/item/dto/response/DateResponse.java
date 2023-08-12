package com.zucchini.domain.item.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

/**
 * 날짜 상태와 함께 반환하는 response
 * - 판매자 화상 예약 날짜 반환 시 사용
 */
@Data
@Builder
public class DateResponse {

    Date date;

    int status;

}
