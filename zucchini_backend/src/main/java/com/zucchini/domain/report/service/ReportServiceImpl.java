package com.zucchini.domain.report.service;

import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.repository.ItemRepository;
import com.zucchini.domain.report.domain.Report;
import com.zucchini.domain.report.dto.AddReportRequest;
import com.zucchini.domain.report.repository.ReportRepository;
import com.zucchini.domain.user.domain.User;
import com.zucchini.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.Date;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    /**
     * 새로운 신고 접수함
     *
     * @param report 신고 정보를 담은 요청 객체 (@Valid 어노테이션으로 유효성 검사)
     * @return int : 생성된 신고의 식별번호를 반환
     */
    @Override
    public int addReport(@Valid AddReportRequest report) {
        String currentPrincipalId = getCurrentId();

        // User에 reported가 없으면 예외 -> 필요
        User reporteduser = userRepository.findByNickname(report.getReported()).orElseThrow(() -> new NoSuchElementException("신고할 회원이 없습니다."));
        // 프론트에서 넘어오는 reported는 nickname이라서 id로 변경해주는 작업이 필요함
        report.setReported(reporteduser.getId());
        // item table에 itemNo가 없으면 예외
        Item item = itemRepository.findById(report.getItemNo()).orElseThrow(() -> new NoSuchElementException("해당 아이템이 없습니다."));

        // 신고가 들어오면 같은 reporter와 reported로 삽입된 신고가 있는지 확인, 있다면 24시간 이내인지 확인함
        // 24시간 이내라면 24시간 이내에는 신고할수 없다는 메세지를 반환
        Date realnow = new Date();
        Date realbefore24Hour = new Date(realnow.getTime() - (1000 * 60 * 60 * 24));

        if (reportRepository.findByReporterAndReportedAndReportDateBetween(currentPrincipalId, report.getReported(), realbefore24Hour, realnow) != null) {
            throw new IllegalArgumentException("24시간 이내에는 같은 회원에게 신고할 수 없습니다.");
        }

        // 24시간 이내가 아니라면 신고 테이블에 신고를 삽입함
        // 신고 횟수 증가시키고 임계점 이상이면 lock 넣어야함
        Report newReport = report.toEntity();
        newReport.setReporter(currentPrincipalId);
        reporteduser.increaseReportCount();
        reportRepository.save(newReport);
        return newReport.getNo();
    }

    /**
     * 신고 삭제(회원 탈퇴 경우)
     * @param id : 회원 아이디
     */
    @Override
    public void removeReport(String id) {
        reportRepository.deleteAllByUser(id);
    }

    /**
     * 스프링 시큐리티 인증을 통과하여 저장된 회원의 인증 객체에서 아이디 추출
     * @return String : 아이디
     */
    private String getCurrentId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return principal.getUsername();
    }

}
