package com.zucchini.domain.room.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class RoomResponse {

    private int no;
    private String opponentNickname;
    private String itemImage;
    private float opponentGrade;
    private String lastMessage;
    private int unreadCount;
    private Date lastMessageCreatedAt;
    private Boolean isDeleted = false;

}
