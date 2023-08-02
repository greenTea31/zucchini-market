package com.zucchini.domain.video.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

/**
 * 비디오 조회 response
 */
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
