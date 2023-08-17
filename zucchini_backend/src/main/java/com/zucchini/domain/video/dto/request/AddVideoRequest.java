package com.zucchini.domain.video.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
public class AddVideoRequest {

    @NotNull
    Integer itemNo;

    @NotBlank
    String link;

    @NotNull
    Date startTime;

    @NotNull
    Date endTime;

}
