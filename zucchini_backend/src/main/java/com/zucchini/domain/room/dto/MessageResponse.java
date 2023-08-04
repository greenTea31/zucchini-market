package com.zucchini.domain.room.dto;

import com.zucchini.domain.room.domain.Message;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;
import java.util.List;

/**
 * 사용자가 채팅방에서 보는 개별 메세지를 보여주기 위한 DTO
 */
@Getter
@Builder
public class MessageResponse {

    private int roomNo;
    private String sender;
    private int senderNo;
    private String content;
    private boolean isRead;
    private Date createdAt;

    public static MessageResponse of(Message message) {
        return MessageResponse.builder()
                .roomNo(message.getRoom().getNo())
                .sender(message.getSender().getNickname())
                .senderNo(message.getSender().getNo())
                .content(message.getContent())
                .isRead(message.isRead())
                .createdAt(message.getCreatedAt())
                .build();
    }

    public static List<MessageResponse> listOf(List<Message> messages) {
        return messages.stream()
                .map(MessageResponse::of)
                .collect(java.util.stream.Collectors.toList());
    }

}
