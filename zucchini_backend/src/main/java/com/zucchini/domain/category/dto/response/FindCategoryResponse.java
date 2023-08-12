package com.zucchini.domain.category.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 카테고리 조회 response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindCategoryResponse {

    int no;

    String category;

}
