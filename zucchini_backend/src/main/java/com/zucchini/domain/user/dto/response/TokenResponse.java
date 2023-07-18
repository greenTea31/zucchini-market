package com.zucchini.domain.user.dto.response;

import lombok.*;

@Getter
@Builder
public class TokenResponse {
    private String accessToken;
    private String refreshToken;
    private Long expireTime;
}
