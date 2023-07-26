package com.zucchini.domain.item.dto.request;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

public class ItemRequest {

    @NotBlank
    @Length(max = 200)
    private String title;

    @NotBlank
    private String content;

    @NotBlank
    private int price;

    private String image;

}
