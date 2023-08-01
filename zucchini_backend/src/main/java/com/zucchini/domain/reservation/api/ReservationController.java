package com.zucchini.domain.reservation.api;

import com.zucchini.domain.reservation.dto.request.ConfirmReservationRequest;
import com.zucchini.domain.reservation.dto.request.ReservationRequest;
import com.zucchini.domain.reservation.dto.response.CheckReservationResponse;
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
     * 구매자가 선택한 날짜가 예약이 아예 불가능한 경우는 status 0
     * 구매자가 선택한 날짜가 예약이 가능한 경우
     * 구매자가 선택한 날짜가 구매자가 등록한 아이템의 날짜 목록에 포함되면 status 1 -> 프론트에 임시코드 반환
     * 구매자가 선택한 날짜가 구매자가 등록한 아이템의 날짜 목록에 포함되지 않으면 status 2 -> 바로 예약 생성
     */
    @PostMapping("/check")
    public ResponseEntity<CheckReservationResponse> checkBuyerReservation(@Valid @RequestBody ReservationRequest checkReservationRequest){
        CheckReservationResponse checkReservationResponse = reservationService.checkReservation(checkReservationRequest);
        return ResponseEntity.ok(checkReservationResponse);
    }

    /**
     * 위에서 status가 1인 상태에서 구매자가 확인 버튼을 클릭하여 예약을 생성하고자 하는 경우
     * 구매자의 예약 날짜 설정
     */
    @PostMapping("/confirm")
    public ResponseEntity<Void> addConfirmedReservation(@Valid @RequestBody ConfirmReservationRequest confirmReservationRequest){
        // 예약 확인 UUID 코드 유효한지 검사 후 유효하면 예약 생성
        reservationService.checkReservationConfirmCode(confirmReservationRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


}
