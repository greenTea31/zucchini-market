package com.zucchini.domain.user.dto.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

/**
 * 이메일 인증 request
 */
@Data
public class EmailRequest {

    @Email
    @NotBlank(message = "이메일(필수)")
    private String email;

}
