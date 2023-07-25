package com.zucchini.domain.report.service;
import com.zucchini.domain.report.domain.Report;
import com.zucchini.domain.report.dto.AddReportRequest;
import com.zucchini.domain.report.repository.ReportRepository;
import com.zucchini.domain.user.domain.User;
import com.zucchini.domain.user.exception.UserException;
import com.zucchini.domain.user.repository.UserRepository;
import com.zucchini.global.config.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Transactional
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    // 새로운 신고 접수가 들어옴
    @Override
    public void addReport(AddReportRequest report) {
        // report에 reporter가 없으면 예외 -> 없을수 없음 어차피 Security에서 가져옴
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null) {
            throw new UserException("신고는 로그인 이후에 가능합니다.");
        }

        CustomUserDetails nowLogInDetail = (CustomUserDetails) auth.getPrincipal();
        String currentPrincipalId = nowLogInDetail.getId();

        // User에 reported가 없으면 예외 -> 필요
        User reporteduser = userRepository.findById(report.getReported()).orElseThrow(() -> new UserException("신고할 회원이 없습니다."));

        // report에 reason이 없으면 예외 -> 필요

        // item table에 itemNo가 없으면 예외 -> 차후

        // 신고가 들어오면 같은 reporter와 reported로 삽입된 신고가 있는지 확인, 있다면 24시간 이내인지 확인함
        // 24시간 이내라면 24시간 이내에는 신고할수 없다는 메세지를 반환
//        LocalDateTime now = LocalDateTime.now();
//        LocalDateTime before24Hour = LocalDateTime.now().minusDays(1);
        Date realnow = new Date();
        Date realbefore24Hour = new Date(realnow.getTime() - (1000 * 60 * 60 * 24));

        if (reportRepository.findByReporterAndReportedAndReportDateBetween(currentPrincipalId, report.getReported(), realnow, realbefore24Hour) != null) {
            throw new UserException("24시간 이내에는 같은 회원에게 신고할 수 없습니다.");
        }

//        LocalDateTime oneDayBeforeNow = LocalDateTime.now().minusDays(1);
//
//        if (reportRepository.existsByReporterAndReportedAndReportDateAfter(currentPrincipalId, report.getReported(), oneDayBeforeNow)) {
//            throw new UserException("24시간 이내에는 같은 회원에게 신고할 수 없습니다.");
//        }

        // 24시간 이내가 아니라면 신고 테이블에 신고를 삽입함
        // 신고 횟수 증가시키고 임계점 이상이면 lock 넣어야함
        Report newReport = report.toEntity();
        newReport.setReporter(currentPrincipalId);
        reporteduser.increaseReportCount();
        reportRepository.save(newReport);
    }
}
