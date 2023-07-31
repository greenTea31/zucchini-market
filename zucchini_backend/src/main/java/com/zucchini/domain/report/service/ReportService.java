package com.zucchini.domain.report.service;

import com.zucchini.domain.report.dto.AddReportRequest;

public interface ReportService {
    int addReport(AddReportRequest report);
}
