package com.zucchini.domain.video.service;

import com.zucchini.domain.video.dto.request.AddVideoRequest;
import com.zucchini.domain.video.dto.response.FindVideoResponse;

import java.util.Date;

public interface VideoService {

    /**
     * 비디오 등록
     * @param addVideoRequest : 비디오 등록 request
     * @return int : 등록된 비디오 no(PK)
     */
    int addVideo(AddVideoRequest addVideoRequest);

    /**
     * 비디오 기한 연장
     * @param no : 비디오 no(PK)
     * @return 연장된 비디오 기한 반환
     */
    Date extendVideoDeadLine(int no);

    /**
     * 비디오 조회
     * @param no : 상품번호(PK)
     * @return FindVideoResponse : 비디오 조회 response
     */
    FindVideoResponse findVideo(int no);

    /**
     * 비디오 존재 여부
     * @param itemNo : 상품번호(PK)
     * @return boolean : 상품 존재 여부
     */
    boolean checkVideo(int itemNo);

    /**
     * 비디오 삭제
     * @param no : 비디오 no(PK)
     */
    void deleteVideo(int no);

    /**
     * 비디오 링크 수정
     * @param no
     * @param link
     */
//    void modifyVideo(int no, String link);

}
