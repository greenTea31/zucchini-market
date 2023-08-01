package com.zucchini.domain.report.repository;

import com.zucchini.domain.report.domain.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Date;

public interface ReportRepository extends JpaRepository<Report, Integer> {
//    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM Report r WHERE r.reporter = :reporter AND r.reported = :reported AND r.reportDate >= :oneDayBeforeNow")
//    boolean existsByReporterAndReportedAndReportDateAfter(@Param("reporter") String reporter, @Param("reported") String reported, @Param("oneDayBeforeNow") LocalDateTime oneDayBeforeNow);

    Report findByReporterAndReportedAndReportDateBetween(String reporter, String reported, Date now, Date before24Hour);

    // room_no 입력받아서 해당 방을 신고하는 report가 존재 여부 확인함
    boolean existsByRoomNo(int roomNo);

}
