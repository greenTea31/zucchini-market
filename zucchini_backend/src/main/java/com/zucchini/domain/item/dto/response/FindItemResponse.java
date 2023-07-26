package com.zucchini.domain.item.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class FindItemResponse {

    private int no;

    private String title;

    private Date createdAt;

    private Date updatedAt;

    private String content;

    private int price;

    private int status;

    private List<String> image;

    private int likeCount;

    private Seller seller;

    private List<Date> dateList;

    private List<String> categoryList;

    @Data
    @AllArgsConstructor
    public static class Seller {
        private String nickname;
        private float grade;
    }

}
