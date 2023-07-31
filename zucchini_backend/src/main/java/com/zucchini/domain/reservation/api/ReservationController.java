package com.zucchini.domain.reservation.api;

import com.zucchini.domain.reservation.dto.ReservationResponse;
import com.zucchini.domain.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reservation")
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping
    public ResponseEntity<List<ReservationResponse>> getReservationList() {
        List<ReservationResponse> reservationList = reservationService.findReservationList();
        return ResponseEntity.ok(reservationList);
    }

}
