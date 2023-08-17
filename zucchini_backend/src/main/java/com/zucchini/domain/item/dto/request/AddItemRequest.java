package com.zucchini.domain.item.dto.request;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;

/**
 * 상품 등록, 수정 시 사용하는 request
 */
@Data
public class AddItemRequest {

    @NotBlank
    @Length(max = 200)
    private String title;

    @NotBlank
    private String content;

    @Min(0)
    private int price;

    private List<String> imageList;

    private List<Date> dateList;

    private List<Integer> categoryList;

}
