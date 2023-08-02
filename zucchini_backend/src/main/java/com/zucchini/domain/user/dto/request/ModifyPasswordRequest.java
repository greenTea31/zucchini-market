package com.zucchini.domain.user.dto.request;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

/**
 * 비밀번호 변경 request
 */
@Data
public class ModifyPasswordRequest {

    @NotBlank
    @Length(min = 8, message = "비밀번호는 최소 8글자 입니다.")
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
    String password;

}
