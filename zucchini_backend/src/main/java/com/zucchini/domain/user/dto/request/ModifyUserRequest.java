package com.zucchini.domain.user.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
public class ModifyUserRequest {

    @NotBlank
    @Length(min = 8, max = 16, message = "아이디는 최소 8글자 최대 16글자 입니다.")
    @Pattern(regexp = "^[a-z0-9-_]*$", message = "아이디는 한글, 특수문자를 제외해야합니다.")
    private String id;
    @NotBlank
    @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$", message = "닉네임은 특수문자를 제외한 2~10자리여야 합니다.")
    private String nickname;
    @NotBlank
    @Length(max = 20)
    private String name;
    @NotBlank
    @Pattern(regexp="^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$", message="전화번호 형식이 올바르지 않습니다.")
    private String phone;
    private Boolean gender;


}
