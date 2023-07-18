package com.zucchini.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.Column;

@Getter
@AllArgsConstructor
public class FindUserResponse {

    private int no;

    private String id;

    private String nickname;

    private String name;

    private String phone;

    private boolean gender;

    private String email;

    private int reportCount;

    private double grade;

}
