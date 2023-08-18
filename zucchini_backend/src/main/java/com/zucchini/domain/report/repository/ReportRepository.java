package com.zucchini.domain.report.repository;

import com.zucchini.domain.report.domain.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;

public interface ReportRepository extends JpaRepository<Report, Integer> {

    Report findByReporterAndReportedAndReportDateBetween(String reporter, String reported, Date before24Hour, Date now);

    // room_no 입력받아서 해당 방을 신고하는 report가 존재 여부 확인함
    boolean existsByRoomNo(int roomNo);

    @Modifying
    @Query(value = "DELETE FROM Report r WHERE r.reported = :userId OR r.reporter = :userId")
    void deleteAllByUser(String userId);

}
