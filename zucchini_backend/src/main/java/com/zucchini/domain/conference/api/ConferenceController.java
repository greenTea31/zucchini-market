package com.zucchini.domain.conference.api;

import com.zucchini.domain.conference.dto.FindConferenceResponse;
import com.zucchini.domain.conference.dto.FindItemUserResponse;
import com.zucchini.domain.conference.service.ConferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/conference")
public class ConferenceController {

    private final ConferenceService conferenceService;

    /**
     * 로그인한 유저의 회의 조회
     * @param no : 회의 번호
     * @return List<FindConferenceResponse> : 예약 전체 리스트
     * 200 : 조회 성공
     * 403 : 참석하지 않은 회의 조회 시도
     */
    @GetMapping("/{no}")
    public ResponseEntity<FindConferenceResponse> findConference(@PathVariable int no) {
        FindConferenceResponse response = conferenceService.findConference(no);
        return ResponseEntity.ok(response);
    }

    /**
     * 회의 상품 번호 조회
     *
     * @param no : 회의 번호
     * @return FindConferenceResponse : 회의 상품 번호 반환
     */
    @GetMapping("/{no}/itemNo")
    public ResponseEntity<FindItemUserResponse> findConferenceItemNo(@PathVariable int no) {
        FindItemUserResponse response = conferenceService.findConferenceItemUser(no);
        return ResponseEntity.ok(response);
    }

    /**
     * 회의 취소
     * @param no : 회의 번호
     * @return ResponseEntity<Void>
     * 200 : 회의 취소 성공
     * 403 : 참석하지 않은 회의 취소 시도
     */
    @DeleteMapping("/{no}")
    public ResponseEntity<Void> cancelConference(@PathVariable int no) {
        conferenceService.cancelConference(no);
        return ResponseEntity.ok().build();
    }

}
