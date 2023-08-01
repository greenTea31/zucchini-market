package com.zucchini.domain.item.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class FindItemListResponse {

    private int no;

    private String title;

    private String content;

    private Date updatedAt;

    private int price;

    private int status;

    private String image;

    private int likeCount;

    private List<String> categoryList;

    private int view;

}
