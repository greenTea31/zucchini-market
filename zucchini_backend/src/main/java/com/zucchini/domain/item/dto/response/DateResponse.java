package com.zucchini.domain.item.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class DateResponse {

    Date date;
    int status;

}
