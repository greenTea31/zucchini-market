package com.zucchini.global.common;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

/**
 * 페이지 응답용
 * @param <T> : 제네릭
 */
@Data
@AllArgsConstructor
public class PageResponse<T> {

    // 조회한 데이터
    List<T> content;

    // 전체 페이지 수
    int totalPages;

}
