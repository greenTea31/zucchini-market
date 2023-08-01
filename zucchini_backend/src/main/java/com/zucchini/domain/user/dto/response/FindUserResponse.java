package com.zucchini.domain.user.dto.response;

import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class FindUserResponse {

    private String id;

    private String nickname;

    private String name;

    private String phone;

    private boolean gender;

    private String email;

    private int reportCount;

    private double grade;

    private int dealCount;

    private boolean isLocked;

}
