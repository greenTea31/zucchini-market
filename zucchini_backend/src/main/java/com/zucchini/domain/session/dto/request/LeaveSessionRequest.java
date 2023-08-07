package com.zucchini.domain.session.dto.request;

import lombok.Data;

@Data
public class LeaveSessionRequest {

    private int conferenceNo;

    private String token;

}
