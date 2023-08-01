package com.zucchini.domain.reservation.dto.response;

import com.zucchini.domain.reservation.domain.Reservation;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;
import java.util.List;

@Getter
@Builder
public class ReservationResponse {

    String title;
    Date confirmedDate;
    int conferenceNo;

    public static ReservationResponse of (Reservation reservation) {
        return ReservationResponse.builder()
                .title(reservation.getConference().getItem().getTitle())
                .confirmedDate(reservation.getConference().getConfirmedDate())
                .conferenceNo(reservation.getConference().getNo())
                .build();
    }

    public static List<ReservationResponse> listOf(List<Reservation> reservationList) {
        return reservationList.stream()
                .map(ReservationResponse::of)
                .collect(java.util.stream.Collectors.toList());
    }

}