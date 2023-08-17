package com.zucchini.domain.session.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StopRecordingResponse {

    int itemNo;

    // openvidu에 저장된 임시 링크
    String link;

    Date startTime;

    Date endTime;

}
