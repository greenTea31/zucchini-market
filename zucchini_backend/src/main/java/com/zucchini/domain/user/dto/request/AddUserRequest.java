package com.zucchini.domain.user.dto.request;

import com.zucchini.domain.user.domain.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

/**
 * 회원 가입 request
 */
@Getter @Setter
public class AddUserRequest {

    @NotBlank
    @Length(min = 8, max = 16, message = "아이디는 최소 8글자 최대 16글자 입니다.")
    @Pattern(regexp = "^[a-z0-9-_]*$", message = "아이디는 한글, 특수문자를 제외해야합니다.")
    private String id;

    @NotBlank
    @Length(min = 8, message = "비밀번호는 최소 8글자 입니다.")
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
    private String password;

    @NotBlank
    @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$", message = "닉네임은 특수문자를 제외한 2~10자리여야 합니다.")
    private String nickname;

    @NotBlank
    @Length(max = 20)
    private String name;

    @NotBlank
    @Pattern(regexp="^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$", message="전화번호 형식이 올바르지 않습니다.")
    private String phone;

    private boolean gender;

    @NotBlank
    @Email
    @Length(max = 255)
    private String email;

    @NotBlank
    private String authKey;

    public User toEntity() {
        return User.builder()
                .id(id)
                .password(password)
                .nickname(nickname)
                .name(name)
                .phone(phone)
                .gender(gender)
                .email(email)
                .build();
    }

}
