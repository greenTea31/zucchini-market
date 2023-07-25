package com.zucchini.domain.room.dto;

import com.zucchini.domain.room.domain.Message;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;
import java.util.List;

@Getter
@Builder
public class MessageResponse {

    private String sender;
    private String content;
    private Date createdAt;

    public static MessageResponse of(Message message) {
        return MessageResponse.builder()
                .sender(message.getSender().getNickname())
                .content(message.getContent())
                .createdAt(message.getCreatedAt())
                .build();
    }

    public static List<MessageResponse> listOf(List<Message> messages) {
        return messages.stream()
                .map(MessageResponse::of)
                .collect(java.util.stream.Collectors.toList());
    }

}
