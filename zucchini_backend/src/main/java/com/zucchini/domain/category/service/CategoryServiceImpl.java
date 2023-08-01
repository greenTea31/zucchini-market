package com.zucchini.domain.category.service;

import com.zucchini.domain.category.domain.Category;
import com.zucchini.domain.category.dto.response.FindCategoryResponse;
import com.zucchini.domain.category.repository.CategoryRepository;
import com.zucchini.domain.category.repository.ItemCategoryRepository;
import com.zucchini.domain.item.domain.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;
    private final ItemCategoryRepository itemCategoryRepository;

    /**
     * 전체 카테고리 조회
     */
    @Override
    public List<FindCategoryResponse> findCategoryList() {
        List<Category> categoryList = categoryRepository.findAll();
        List<FindCategoryResponse> findCategoryResponseList = categoryList.stream()
                .map(category -> new FindCategoryResponse(category.getNo(), category.getCategory()))
                .collect(Collectors.toList());
        return findCategoryResponseList;
    }

    /**
     * 해당 카테고리에 속한 아이템 전체 조회
     */
    @Override
    public List<Item> findCategoryItemList(String category) {
        return itemCategoryRepository.findAllByCategory(category);
    }

}
