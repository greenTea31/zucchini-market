package com.zucchini.domain.session.dto.request;

import lombok.Data;

@Data
public class StartRecordingRequest {

    String sessionId;

    Boolean hasAudio;

    Boolean hasVideo;

}
