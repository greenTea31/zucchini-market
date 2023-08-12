package com.zucchini.domain.session.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaveSessionResponse {

    // 화상이 완전히 종료되었는지 여부(참가자가 모두 나간 상황)
    Boolean isFinished;

    // 저장된 비디오 DB PK
    int videoNo;

    // 저장된 비디오 링크 호출
    String link;

}
