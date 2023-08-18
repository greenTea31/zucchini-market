package com.zucchini.domain.image.service;

import java.util.List;

public interface ImageService {

    /**
     * 상품 사진 링크 조회
     * @param itemNo : 상품 번호
     * @return List<String> : 상품 링크 리스트
     */
    List<String> findImageLinkList(int itemNo);

}
