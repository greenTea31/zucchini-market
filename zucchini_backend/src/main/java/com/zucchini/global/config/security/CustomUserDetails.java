package com.zucchini.global.config.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zucchini.domain.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomUserDetails implements UserDetails {

    private String username = null;
    private String id;          // 로그인용 ID 값
    private String password;    // 비밀번호
    private String email;       // 이메일
    private boolean isLocked;         // 계정 잠김 여부
    private String nickname;        // 닉네임
    private String authority;        // 권한

    public static UserDetails of(User user) {
        return CustomUserDetails.builder()
                .id(user.getId())
                .password(user.getPassword())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .build();
    }

    /**
     * 해당 유저의 권한 목록
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<GrantedAuthority> auth = new ArrayList<>();
        auth.add(new SimpleGrantedAuthority(authority));
        return auth;
    }

    /**
     * 비밀 번호
     */
    @Override
    public String getPassword() {
        return password;
    }

    /**
     * PK값 => id
     */
    @Override
    public String getUsername() {
        return id;
    }

    /**
     * 계정 만료 여부
     * true: 만료 안됨
     * false: 만료
     */
    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * 계정 잠김 여부
     * true: 잠기지 않음
     * false: 잠김
     */
    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return isLocked;
    }

    /**
     * 비밀번호 만료 여부
     * true: 만료 안됨
     * false: 만료
     */
    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * 사용자 활성화 여부
     * true: 활성화
     * false: 비활성화
     */
    @Override
    @JsonIgnore
    public boolean isEnabled() {
        // 계정이 잠겨잇지 않으면 true
        return !isLocked;
    }

}