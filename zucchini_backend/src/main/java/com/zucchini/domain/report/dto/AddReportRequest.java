package com.zucchini.domain.report.dto;

import com.zucchini.domain.report.domain.Report;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

/**
 * 악성 회원 신고 추가 요청 객체
 */
@Getter @Setter 
@RequiredArgsConstructor
public class AddReportRequest {

    @NotBlank
    private String reported;

    @NotBlank
    private String reason;

    @Min(1)
    private int itemNo;

    private Integer roomNo;

    public Report toEntity() {
        return Report.builder()
                .reported(reported)
                .reason(reason)
                .itemNo(itemNo)
                .roomNo(roomNo)
                .build();
    }
}
