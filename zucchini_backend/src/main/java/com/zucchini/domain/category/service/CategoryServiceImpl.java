package com.zucchini.domain.category.service;

import com.zucchini.domain.category.domain.Category;
import com.zucchini.domain.category.dto.response.FindCategoryResponse;
import com.zucchini.domain.category.repository.CategoryRepository;
import com.zucchini.domain.category.repository.ItemCategoryRepository;
import com.zucchini.domain.item.domain.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;
    private final ItemCategoryRepository itemCategoryRepository;

    /**
     * 카테고리 전체 조회
     * @return List<FindCategoryResponse> : 카테고리 목록
     */
    @Override
    @Transactional(readOnly = true)
    public List<FindCategoryResponse> findCategoryList() {
        List<Category> categoryList = categoryRepository.findAll();
        List<FindCategoryResponse> findCategoryResponseList = categoryList.stream()
                .map(category -> new FindCategoryResponse(category.getNo(), category.getCategory()))
                .collect(Collectors.toList());
        return findCategoryResponseList;
    }

    /**
     * 카테고리에 속한 상품 목록 전체 조회
     * @param category : 카테고리
     * @return List<Item> : 상품 목록
     */
    @Override
    @Transactional(readOnly = true)
    public List<Item> findCategoryItemList(String category) {
        return itemCategoryRepository.findAllByCategory(category);
    }

    /**
     * 카테고리에 속한 상품 목록 페이징 조회
     * @param category : 카테고리
     * @param keyword : 검색어
     * @param pageable : 페이지 정보
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Item> findCategoryPageItemList(String category, String keyword, Pageable pageable) {
        return itemCategoryRepository.findPageItemsByCategory(category, keyword, pageable);
    }

}
