package com.zucchini.domain.reservation.service;

import com.zucchini.domain.reservation.dto.request.ConfirmReservationRequest;
import com.zucchini.domain.reservation.dto.request.ReservationRequest;
import com.zucchini.domain.reservation.dto.response.CheckReservationResponse;
import com.zucchini.domain.reservation.dto.response.ReservationResponse;

import java.util.Date;
import java.util.List;

public interface ReservationService {

    /**
     * 사용자의 모든 예약 내역 조회
     *
     * @return List<ReservationResponse> : 예약 내역 리스트
     */
    List<ReservationResponse> findReservationList();


    /**
     * 현재 로그인한 유저의 화상 예약된 날짜를 조회함
     *
     * @return List<Date> : 화상 예약된 날짜 리스트
     */
    List<Date> findReservationDateList();

    /**
     * 예약 추가
     *
     * @param itemNo : 아이템 번호
     * @param selectDate : 구매자가 선택한 예약 날짜
     */
    void addReservation(int itemNo, Date selectDate);

    /**
     * 구매자가 예약하려는 날짜 가능 여부를 확인함
     *
     * @param checkReservationRequest : 예약 검사 요청 객체
     * @return CheckReservationResponse : 예약 가능 여부와 필요시 확인 코드 반환
     * 구매자가 선택한 날짜가 예약이 아예 불가능한 경우는 status 0
     * 구매자가 선택한 날짜가 구매자가 등록한 아이템의 날짜 목록에 포함되면 status 1 -> 프론트에 임시코드 반환
     * 구매자가 선택한 날짜가 구매자가 등록한 아이템의 날짜 목록에 포함되지 않으면 status 2 -> 바로 예약 생성
     */
    CheckReservationResponse checkReservation(ReservationRequest checkReservationRequest);

    /**
     * 예약 코드가 유효한지 검사 후 예약을 생성함
     *
     * @param confirmReservationRequest : 예약 코드와 예약 정보를 담은 요청 객체
     */
    void checkReservationConfirmCode(ConfirmReservationRequest confirmReservationRequest);

}
