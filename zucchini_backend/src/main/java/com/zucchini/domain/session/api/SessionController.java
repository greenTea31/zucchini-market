package com.zucchini.domain.session.api;

import com.zucchini.domain.session.dto.request.LeaveSessionRequest;
import com.zucchini.domain.session.dto.response.FindSessionResponse;
import com.zucchini.domain.session.dto.response.StopRecordingResponse;
import com.zucchini.domain.session.service.SessionService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.apache.hc.core5.http.HttpResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/session")
public class SessionController {

    private final SessionService sessionService;

    /**
     * 컨퍼런스에 대한 활성화된 Openvidu 세션 정보 조회
     * @param conferenceNo
     * @param httpSession
     * @param response
     * @return
     * @throws OpenViduJavaClientException
     * @throws OpenViduHttpException
     */
    @GetMapping("/{conferenceNo}")
    public ResponseEntity<FindSessionResponse> findConferenceSession(@PathVariable int conferenceNo,
                                                                     HttpSession httpSession,
                                                                     HttpResponse response) throws OpenViduJavaClientException, OpenViduHttpException {

        System.out.println(conferenceNo+" -> 세션 진입 확인");

        return ResponseEntity.ok().body(sessionService.findConferenceSession(conferenceNo, httpSession, response));
    }

    /**
     * 컨퍼런스에 대한 화상 통화 연결 종료
     * @param leaveSessionRequest
     * @return
     */
    @PutMapping
    public ResponseEntity<Void> leaveConferenceSession(@Valid @RequestBody LeaveSessionRequest leaveSessionRequest) {
        try {
            sessionService.leaveConferenceSession(leaveSessionRequest);
            return ResponseEntity.ok().build();
        } catch (OpenViduJavaClientException e) {
            throw new RuntimeException(e);
        } catch (OpenViduHttpException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 녹화 중지하는 요청
     * - 중지 후 openvidu 서버에 저장된 비디오 링크를 반환
     */
    @GetMapping("/record/{conferenceNo}")
    public ResponseEntity<StopRecordingResponse> stopRecording(@PathVariable int conferenceNo){
        try {
            return ResponseEntity.ok().body(sessionService.stopRecording(conferenceNo));
        } catch (OpenViduJavaClientException e) {
            throw new RuntimeException(e);
        } catch (OpenViduHttpException e) {
            throw new RuntimeException(e);
        }
    }

}
