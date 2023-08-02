package com.zucchini.domain.user.dto.response;

import lombok.Builder;
import lombok.Getter;

/**
 * 회원 거래 내역 조회 응답 DTO
 */
@Getter
@Builder
public class UserDealHistoryResponse {

    private int status;

    private int price;

    private String title;

    private String thumbnailLink;

    private String name;

}
