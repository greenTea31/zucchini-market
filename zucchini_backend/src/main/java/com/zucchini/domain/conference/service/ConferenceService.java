package com.zucchini.domain.conference.service;

import com.zucchini.domain.conference.dto.FindConferenceResponse;

public interface ConferenceService {

    /**
     * 회의 생성
     * 성공시 생성된 회의의 번호와 201 코드 리턴
     * 실패시 400, 500 코드 리턴
     */
    int addConference(int itemNo);
    

    /**
     * 회의 조회
     * 실제 화상 채팅 구현 안되어서 일단 API 명세서 그대로 구현
     */
    FindConferenceResponse findConference(int conferenceNo);

    /**
     * 회의 삭제
     * 회의 조회와 같음
     */
    void removeConference(int conferenceNo);

}
