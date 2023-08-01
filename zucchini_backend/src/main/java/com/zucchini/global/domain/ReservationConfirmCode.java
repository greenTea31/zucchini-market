package com.zucchini.global.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import javax.persistence.Id;
import java.util.UUID;

@Getter
@RedisHash("reservationConfirmCode")
@AllArgsConstructor
@Builder
public class ReservationConfirmCode {

    @Id
    private UUID uuid;

    private String id;

    @TimeToLive
    private Long expiration;

    public static ReservationConfirmCode createReservationConfirmCode(UUID uuid, String id, Long remainingMilliSeconds) {
        return ReservationConfirmCode.builder()
                .uuid(uuid)
                .id(id)
                .expiration(remainingMilliSeconds / 1000)
                .build();
    }

}
