package com.zucchini.domain.room.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoomUserResponse {
    String opponentNickname;
    float opponentGrade;
}
