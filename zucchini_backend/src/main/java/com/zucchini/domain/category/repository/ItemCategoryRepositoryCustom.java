package com.zucchini.domain.category.repository;

import com.zucchini.domain.item.domain.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ItemCategoryRepositoryCustom {

    Page<Item> findPageItemsByCategory(String category, String keyword, Pageable pageable);

}
