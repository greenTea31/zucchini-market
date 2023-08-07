package com.zucchini.domain.session.api;

import com.zucchini.domain.session.dto.response.SessionResponse;
import com.zucchini.domain.session.service.SessionService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
@RequestMapping("/session")
public class SessionController {

    private final SessionService sessionService;

    @GetMapping("/{conferenceNo}")
    public ResponseEntity<SessionResponse> findConferenceSession(@PathVariable int conferenceNo,
                                                     HttpSession httpSession,
                                                     HttpResponse response) throws OpenViduJavaClientException, OpenViduHttpException {

        System.out.println(conferenceNo+" -> 세션 진입 확인");

        return ResponseEntity.ok().body(sessionService.findConferenceSession(conferenceNo, httpSession, response));
    }

}
