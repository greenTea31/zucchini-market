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
    @PostMapping
    public ResponseEntity<Integer> addReport(@RequestBody AddReportRequest request) {
        int result = reportService.addReport(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

}
