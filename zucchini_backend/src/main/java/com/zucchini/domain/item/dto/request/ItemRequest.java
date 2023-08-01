package com.zucchini.domain.item.dto.request;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;

@Data
public class ItemRequest {

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
