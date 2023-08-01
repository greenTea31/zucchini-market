package com.zucchini.domain.conference.service;

import com.zucchini.domain.conference.dto.FindConferenceResponse;

import java.util.Date;

public interface ConferenceService {

    /**
     * 회의 생성
     * 성공시 생성된 회의의 번호와 201 코드 리턴
     * 실패시 400, 500 코드 리턴
     */
    int addConference(int itemNo, Date confirmDate);
    

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

    /**
     * 판매자의 예약 취소
     * reservation에서 conference 조회하는 쿼리 날리고 conference의 confirmedDate와 같은 모든 date status를 0으로 변경함. 단 Date.item.seller or Date.item.buyer가 현 로그인한 유저와 같아야 함.
     */
    void cancelConference(int conferenceNo);

}
