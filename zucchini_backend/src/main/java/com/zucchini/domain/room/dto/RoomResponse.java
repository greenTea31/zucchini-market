package com.zucchini.domain.room.dto;

import com.zucchini.domain.room.domain.Room;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class RoomResponse {
    private int no;
    private int itemNo;

    public static RoomResponse of(Room room) {
        return RoomResponse.builder()
                .no(room.getNo())
                .itemNo(room.getItem().getNo())
                .build();
    }

    public static List<RoomResponse> listOf(List<Room> rooms) {
        return rooms.stream()
                .map(RoomResponse::of)
                .collect(java.util.stream.Collectors.toList());
    }
}
