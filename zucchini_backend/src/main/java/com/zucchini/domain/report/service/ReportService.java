package com.zucchini.domain.report.service;

import com.zucchini.domain.report.dto.AddReportRequest;

public interface ReportService {

    /**
     * 새로운 신고 접수함
     *
     * @param report 신고 정보를 담은 요청 객체 (@Valid 어노테이션으로 유효성 검사)
     * @return int : 생성된 신고의 식별번호를 반환
     */
    int addReport(AddReportRequest report);

    /**
     * 신고 삭제(회원 탈퇴 경우)
     * @param id : 회원 아이디
     */
    void removeReport(String id);

}
