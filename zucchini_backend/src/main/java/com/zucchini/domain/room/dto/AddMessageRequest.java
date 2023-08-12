package com.zucchini.domain.room.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

/**
 * 채팅 메세지를 입력받는 DTO
 */
@Getter
@Setter
@RequiredArgsConstructor
public class AddMessageRequest {

    @Min(1)
    private int roomNo;

    @Min(1)
    private int senderNo;

    @NotBlank
    private String content;

}
