package com.zucchini.global.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 페이지 크기 설정
 */
@Getter
@AllArgsConstructor
public enum PageSizeEnums {

    ITEM_PAGE_SIZE("1 페이지 당 불러오는 상품 개수", 8),
    USER_ITEM_LIKE_PAGE_SIZE("1 페이지 당 불러오는 찜 상품 개수", 8),
    USER_ITEM_MINI_PAGE_SIZE("1 페이지 당 불러오는 찜 상품 개수", 6);

    private String description;

    private int value;

}
