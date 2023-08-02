package com.zucchini.domain.conference.dto;

import com.zucchini.domain.conference.domain.Conference;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

/**
 * 회의 정보를 반환하는 DTO
 */
@Getter
@Builder
public class FindConferenceResponse {

    private int no;
    private boolean isActive;
    private int itemNo;
    private Date comfirmedDate;

    public static FindConferenceResponse of (Conference conference) {
        return FindConferenceResponse.builder()
                .no(conference.getNo())
                .isActive(conference.isActive())
                .itemNo(conference.getItem().getNo())
                .comfirmedDate(conference.getConfirmedDate())
                .build();
    }

}
