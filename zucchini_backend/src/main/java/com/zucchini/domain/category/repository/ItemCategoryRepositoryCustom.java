package com.zucchini.domain.category.repository;

import com.zucchini.domain.item.domain.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ItemCategoryRepositoryCustom {

    /**
     * 카테고리에 속한 상품 조회(페이징)
     * @param category : 카테고리
     * @param keyword : 검색어
     * @param pageable : 페이지 정보
     * @return Page<Item>
     */
    Page<Item> findPageItemsByCategory(String category, String keyword, Pageable pageable);

}
