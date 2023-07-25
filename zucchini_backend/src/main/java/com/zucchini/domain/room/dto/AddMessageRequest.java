package com.zucchini.domain.room.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class AddMessageRequest {

    private String content;

}
