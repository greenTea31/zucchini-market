package com.zucchini.domain.report.api;

import com.zucchini.domain.report.dto.AddReportRequest;
import com.zucchini.domain.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
@Slf4j
public class ReportController {

    private final ReportService reportService;

    /**
     * 악성 회원 신고 추가
     * @param request : 신고 정보가 담긴 객체
     * @return ResponseEntity<Integer> : 신고 번호
     * 201 : 신고 성공 및 신고 번호 반환
     * 400 : 24시간 이내 같은 회원에게 신고한 경우
     * 404 : 신고할 회원이 없음
     */
    @PostMapping
    public ResponseEntity<Integer> addReport(@RequestBody AddReportRequest request) {
        int result = reportService.addReport(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

}
