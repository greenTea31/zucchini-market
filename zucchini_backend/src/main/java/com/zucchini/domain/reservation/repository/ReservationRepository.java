package com.zucchini.domain.reservation.repository;

import com.zucchini.domain.reservation.domain.Reservation;
import com.zucchini.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    // user_no으로 모든 예약 내역 조회
    List<Reservation> findAllByUser(User user);

}
