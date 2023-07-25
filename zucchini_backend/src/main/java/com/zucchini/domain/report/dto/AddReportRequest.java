package com.zucchini.domain.report.dto;

import com.zucchini.domain.report.domain.Report;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter
@RequiredArgsConstructor
public class AddReportRequest {

    private String reported;
    private String reason;
    private int itemNo;
    private int roomNo;

    public Report toEntity() {
        return Report.builder()
                .reported(reported)
                .reason(reason)
                .itemNo(itemNo)
                .roomNo(roomNo)
                .build();
    }
}
