package com.zucchini.domain.sse.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class BuyAlertDto {
    String userName;
    Boolean buy;
}
