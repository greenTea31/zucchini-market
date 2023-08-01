package com.zucchini.domain.video.dto.response;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;
import java.util.Date;

@Data
public class FindVideoResponse {

    String link;

    Date startTime;

    Date endTime;

    Date deleteTime;

    @Builder
    public FindVideoResponse(String link, Date startTime, Date endTime, Date deleteTime) {
        this.link = link;
        this.startTime = startTime;
        this.endTime = endTime;
        this.deleteTime = deleteTime;
    }

}
