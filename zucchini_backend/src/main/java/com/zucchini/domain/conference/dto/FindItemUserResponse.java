package com.zucchini.domain.conference.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindItemUserResponse {

    int itemNo;
    String username;

}
