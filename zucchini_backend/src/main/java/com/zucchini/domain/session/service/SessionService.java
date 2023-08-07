package com.zucchini.domain.session.service;

import com.zucchini.domain.session.dto.response.SessionResponse;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import org.apache.hc.core5.http.HttpResponse;

import javax.servlet.http.HttpSession;

public interface SessionService {

    SessionResponse findConferenceSession(int no, HttpSession httpSession, HttpResponse response) throws OpenViduJavaClientException, OpenViduHttpException;

}
