package com.zucchini.domain.user.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class EmailCheckRequest {

    @Email
    @NotBlank(message = "이메일(필수)")
    private String email;

    @NotBlank(message = "인증키(필수)")
    private String authKey;

}
