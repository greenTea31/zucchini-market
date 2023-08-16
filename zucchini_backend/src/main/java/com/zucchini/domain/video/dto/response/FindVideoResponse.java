package com.zucchini.domain.video.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

/**
 * 비디오 조회 response
 */
@Data
public class FindVideoResponse {

    int no;

    int itemNo;

    String itemTitle;

    String seller;

    String link;

    Date startTime;

    Date endTime;

    Date deleteTime;

    @Builder
    public FindVideoResponse(int no, int itemNo, String itemTitle, String seller, String link, Date startTime, Date endTime, Date deleteTime) {
        this.no = no;
        this.itemNo = itemNo;
        this.itemTitle = itemTitle;
        this.seller = seller;
        this.link = link;
        this.startTime = startTime;
        this.endTime = endTime;
        this.deleteTime = deleteTime;
    }

}
