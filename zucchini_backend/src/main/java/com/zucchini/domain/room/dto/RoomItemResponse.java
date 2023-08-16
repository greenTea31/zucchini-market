package com.zucchini.domain.room.dto;

import com.zucchini.domain.item.dto.response.DateResponse;
import com.zucchini.domain.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RoomItemResponse {

    private int no;

    private String title;

    private int price;

    private String image;

    private Seller seller;

    private List<DateResponse> dateList;

    @Data
    @AllArgsConstructor
    public static class Seller {
        private String nickname;
        private float grade;
    }

}
