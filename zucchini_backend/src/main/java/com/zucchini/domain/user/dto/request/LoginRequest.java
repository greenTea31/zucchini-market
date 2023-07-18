package com.zucchini.domain.user.dto.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class LoginRequest {

    @NotBlank
    private String id;

    @NotBlank
    private String password;

}
