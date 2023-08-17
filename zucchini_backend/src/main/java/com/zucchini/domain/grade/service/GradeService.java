package com.zucchini.domain.grade.service;

import com.zucchini.domain.grade.dto.request.GiveGradeRequest;

public interface GradeService {

    /**
     * 별점 평가
     * @param giveGradeRequest : 별점 평가 요청 DTO
     */
    void giveGrade(GiveGradeRequest giveGradeRequest);

    /**
     * 해당하는 별점 기록 삭제
     */

    void removeGrade(String userId);

}
