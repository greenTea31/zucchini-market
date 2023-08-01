package com.zucchini.global.domain;

import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

/**
 * 구매자가 예약하려고 하는 날짜가 구매자가 등록한 판매 상품에 설정한 날짜 목록에 포함되어 있는 상황이라
 * 해당 날짜를 모두 status 2로 변경하려는 작업을 하기 위해 code를 UUID 형태로 임시 생성함
 * 이 code를 redis에 저장
 */
public interface ReservationConfirmCodeRepository extends CrudRepository<ReservationConfirmCode, UUID> {


}
