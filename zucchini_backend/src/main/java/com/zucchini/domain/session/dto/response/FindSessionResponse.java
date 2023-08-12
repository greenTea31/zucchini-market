package com.zucchini.domain.session.dto.response;

import io.openvidu.java.client.OpenViduRole;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FindSessionResponse {

    private boolean user;
    private OpenViduRole role;
    private String nickName;
    private String token;
    private String sessionId;

    public FindSessionResponse(OpenViduRole role, String token, String nickName, String sessionId) {
        this.user = true;
        this.role = role;
        this.nickName = nickName;
        this.token = token;
        this.sessionId = sessionId;
    }

}
