package com.zucchini.domain.reservation.api;

import com.zucchini.domain.reservation.dto.request.AddReservationRequest;
import com.zucchini.domain.reservation.dto.response.ReservationResponse;
import com.zucchini.domain.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
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

    @GetMapping("/date")
    public ResponseEntity<List<Date>> getReservationDateList() {
        List<Date> reservationDateList = reservationService.findReservationDateList();
        return ResponseEntity.ok(reservationDateList);
    }

    /**
     * 구매자의 예약 날짜 설정
     */
    @PostMapping
    public ResponseEntity<Void> addReservation(@Valid @RequestBody AddReservationRequest addReservationRequest){
        reservationService.addReservation(addReservationRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


}
