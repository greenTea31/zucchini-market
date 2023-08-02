package com.zucchini.domain.room.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

/**
 * 채팅방을 생성할 때 아이템 정보를 입력받는 DTO
 */
@Getter @Setter
@RequiredArgsConstructor
public class AddRoomRequest {

    @NotBlank
    private int itemNo;

}
