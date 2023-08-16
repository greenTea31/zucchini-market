package com.zucchini.domain.grade.dto.request;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * 별점 평가 요청 DTO
 */
@Data
public class GiveGradeRequest {

    @NotBlank
    private String gradeRecipient; // 점수를 받은 사용자 닉네임

    @NotNull
    private Integer itemNo; // 아이템 번호

    @NotNull
    @Min(0)
    @Max(5)
    private Float grade; // 매긴 점수

}
