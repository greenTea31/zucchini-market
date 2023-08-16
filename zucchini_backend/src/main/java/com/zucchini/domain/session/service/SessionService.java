package com.zucchini.domain.session.service;

import com.zucchini.domain.session.dto.request.LeaveSessionRequest;
import com.zucchini.domain.session.dto.response.FindSessionResponse;
import com.zucchini.domain.session.dto.response.StopRecordingResponse;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import org.apache.hc.core5.http.HttpResponse;

import javax.servlet.http.HttpSession;

public interface SessionService {

    /**
     * 컨퍼런스에 대한 활성화된 세션이 있는지 확인 -> 없으면 새로 생성, 있으면 조회만
     * @param no
     * @param httpSession
     * @param response
     * @return
     * @throws OpenViduJavaClientException
     * @throws OpenViduHttpException
     */
    FindSessionResponse findConferenceSession(int no, HttpSession httpSession, HttpResponse response) throws OpenViduJavaClientException, OpenViduHttpException;

    /**
     * 세션 연결 종료 시 남은 인원 확인 후 세션 완전히 종료할지 설정
     * @param leaveSessionRequest
     */
    void leaveConferenceSession(LeaveSessionRequest leaveSessionRequest) throws OpenViduJavaClientException, OpenViduHttpException;

    /**
     * 녹화 종료 후 openvidu 에 저장된 임시 링크 반환
     */
    StopRecordingResponse stopRecording(int conferenceNo) throws OpenViduJavaClientException, OpenViduHttpException;

}
