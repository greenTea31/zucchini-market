package com.zucchini.domain.room.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * 사용자가 채팅방 목록에서 보는 개별 채팅방 정보를 보여주기 위한 DTO
 */
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
