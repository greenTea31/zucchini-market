package com.zucchini.domain.user.dto.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

/**
 * 로그인 request
 */
@Getter
public class LoginRequest {

    @NotBlank
    private String id;

    @NotBlank
    private String password;

}
