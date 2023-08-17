package com.zucchini.domain.reservation.api;

import com.zucchini.domain.reservation.dto.request.ConfirmReservationRequest;
import com.zucchini.domain.reservation.dto.request.ReservationRequest;
import com.zucchini.domain.reservation.dto.response.CheckReservationResponse;
import com.zucchini.domain.reservation.dto.response.ReservationResponse;
import com.zucchini.domain.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reservation")
@Slf4j
public class ReservationController {

    private final ReservationService reservationService;

    /**
     * 로그인한 유저의 예약 전체 조회
     * @return List<ReservationResponse> : 예약 전체 리스트
     * 200 : 조회 성공
     * 403 : 로그인 없이 조회 시도
     */
    @GetMapping
    public ResponseEntity<List<ReservationResponse>> getReservationList() {
        List<ReservationResponse> reservationList = reservationService.findReservationList();
        return ResponseEntity.ok(reservationList);
    }

    /**
     * 로그인한 유저의 예약 날짜 전체 조회
     * @return List<Date> : 예약 날짜 전체 리스트
     * 200 : 조회 성공
     * 403 : 로그인 없이 조회 시도
     */
    @GetMapping("/date")
    public ResponseEntity<List<Date>> getReservationDateList() {
        List<Date> reservationDateList = reservationService.findReservationDateList();
        return ResponseEntity.ok(reservationDateList);
    }

    /**
     * 구매자의 날짜 선택시 해당 날짜가 예약 가능한지 확인하고, 가능하면 예약함
     * 구매자가 선택한 날짜가 예약이 아예 불가능한 경우는 status 0
     * 구매자가 선택한 날짜가 구매자가 등록한 아이템의 날짜 목록에 포함되면 status 1 -> 프론트에 임시코드 반환
     * 구매자가 선택한 날짜가 구매자가 등록한 아이템의 날짜 목록에 포함되지 않으면 status 2 -> 바로 예약 생성
     * @param checkReservationRequest : 예약 가능 여부를 확인하기 위한 요청 객체
     * @return CheckReservationResponse : 예약 가능 여부와 필요시 확인 코드 반환
     * 200 : 조회 성공
     * 400 : 판매자가 설정하지 않은 날짜를 지정함
     * 403 : 로그인 없이 조회 시도
     */
    @PostMapping("/check")
    public ResponseEntity<CheckReservationResponse> checkBuyerReservation(@Valid @RequestBody ReservationRequest checkReservationRequest){
        CheckReservationResponse checkReservationResponse = reservationService.checkReservation(checkReservationRequest);
        return ResponseEntity.ok(checkReservationResponse);
    }

    /**
     * 위에서 status가 1인 상태에서 구매자가 확인 버튼을 클릭하여 예약을 생성하고자 하는 경우 구매자의 예약 날짜 설정
     * @param confirmReservationRequest 예약 생성을 위한 확인 요청 객체
     * @return ResponseEntity<Void>
     * 201 : 예약 생성 성공
     * 400 : 유효하지 않은 예약 확인 코드
     * 403 : 로그인 없이 예약 생성 시도
     * 404 : 유효하지 않은 confirmCode
     */
    @PostMapping("/confirm")
    public ResponseEntity<Void> addConfirmedReservation(@Valid @RequestBody ConfirmReservationRequest confirmReservationRequest){
        // 예약 확인 UUID 코드 유효한지 검사 후 유효하면 예약 생성
        reservationService.checkReservationConfirmCode(confirmReservationRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


}
