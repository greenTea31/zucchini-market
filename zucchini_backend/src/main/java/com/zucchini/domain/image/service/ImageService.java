package com.zucchini.domain.image.service;

import java.util.List;

public interface ImageService {

    /**
     * 상품 사진 추가
     * @param itemNo : 상품 번호
     * @param linkList : 상품의 사진 링크 리스트
     */
    void addImage(int itemNo, List<String> linkList);

    /**
     * 상품 사진 수정
     * @param itemNo : 상품 번호
     * @param linkList : 상품의 사진 링크 리스트
     */
    void modifyImage(int itemNo, List<String> linkList);

    /**
     * 상품 사진 링크 조회
     * @param itemNo : 상품 번호
     * @return List<String> : 상품 링크 리스트
     */
    List<String> findImageLinkList(int itemNo);

}
