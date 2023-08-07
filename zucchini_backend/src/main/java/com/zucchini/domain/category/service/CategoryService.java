package com.zucchini.domain.category.service;

import com.zucchini.domain.category.dto.response.FindCategoryResponse;
import com.zucchini.domain.item.domain.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {

    /**
     * 카테고리 전체 조회
     * @return List<FindCategoryResponse> : 카테고리 목록
     */
    List<FindCategoryResponse> findCategoryList();

    /**
     * 카테고리에 속한 상품 목록 조회
     * @param category : 카테고리
     * @return List<Item> : 상품 목록
     */
    List<Item> findCategoryItemList(String category);

    Page<Item> findCategoryPageItemList(String category, String keyword, Pageable pageable);

}
