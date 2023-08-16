package com.zucchini.domain.user.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

/**
 * 회원 정보 수정 request
 */
@Data
@AllArgsConstructor
public class ModifyUserRequest {


    @NotBlank
    @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$", message = "닉네임은 특수문자를 제외한 2~10자리여야 합니다.")
    private String nickname;

    @NotBlank
    @Pattern(regexp="^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$", message="전화번호 형식이 올바르지 않습니다.")
    private String phone;

    private Boolean gender;

}
