package com.zucchini.domain.category.repository;

import com.zucchini.domain.category.domain.ItemCategory;
import com.zucchini.domain.category.domain.ItemCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemCategoryRepository extends JpaRepository<ItemCategory, ItemCategoryId> {

    /**
     * 카테고리에 해당하는 아이템 목록 조회
     */
    List<ItemCategory> findAllByCategory(String category);

}
