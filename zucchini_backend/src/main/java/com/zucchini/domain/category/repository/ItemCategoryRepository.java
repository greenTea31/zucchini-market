package com.zucchini.domain.category.repository;

import com.zucchini.domain.category.domain.ItemCategory;
import com.zucchini.domain.category.domain.ItemCategoryId;
import com.zucchini.domain.item.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemCategoryRepository extends JpaRepository<ItemCategory, ItemCategoryId>, ItemCategoryRepositoryCustom {

    /**
     * 카테고리에 해당하는 아이템 목록 조회
     * @param category : 카테고리
     * @return
     */
    @Query(value = "SELECT i FROM ItemCategory ic " +
            "JOIN ic.category c " +
            "JOIN ic.item i " +
            "WHERE c.category = :category")
    List<Item> findAllByCategory(String category);

}
