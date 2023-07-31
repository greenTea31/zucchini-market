package com.zucchini.domain.room.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter @Setter
@RequiredArgsConstructor
public class AddRoomRequest {

    @NotBlank
    private int itemNo;

}
