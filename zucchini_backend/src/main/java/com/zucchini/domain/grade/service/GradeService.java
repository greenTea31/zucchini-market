package com.zucchini.domain.grade.service;

import com.zucchini.domain.grade.dto.request.GiveGradeRequest;

public interface GradeService {

    void giveGrade(GiveGradeRequest giveGradeRequest);

}
