package com.zucchini.domain.session.dto.response;

import io.openvidu.java.client.OpenViduRole;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionResponse {

    private boolean user;
    private OpenViduRole role;
    private String nickName;
    private String token;

    public SessionResponse(OpenViduRole role, String token, String nickName) {
        this.user = true;
        this.role = role;
        this.nickName = nickName;
        this.token = token;
    }

}
