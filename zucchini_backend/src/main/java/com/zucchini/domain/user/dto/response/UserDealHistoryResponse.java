package com.zucchini.domain.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserDealHistoryResponse {

    private int status;
    private int price;
    private String title;
    private String thumbnailLink;
    private String name;

}
