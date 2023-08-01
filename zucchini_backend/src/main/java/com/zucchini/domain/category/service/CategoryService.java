package com.zucchini.domain.category.service;

import com.zucchini.domain.category.dto.response.FindCategoryResponse;
import com.zucchini.domain.item.domain.Item;

import java.util.List;

public interface CategoryService {

    List<FindCategoryResponse> findCategoryList();
    List<Item> findCategoryItemList(String category);

}
