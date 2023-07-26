package com.zucchini.domain.reservation.service;

import com.zucchini.domain.conference.domain.Conference;
import com.zucchini.domain.conference.repository.ConferenceRepository;
import com.zucchini.domain.reservation.domain.Reservation;
import com.zucchini.domain.reservation.dto.ReservationResponse;
import com.zucchini.domain.reservation.repository.ReservationRepository;
import com.zucchini.domain.user.domain.User;
import com.zucchini.domain.user.exception.UserException;
import com.zucchini.domain.user.repository.UserRepository;
import com.zucchini.global.config.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ReservationServiceImpl implements ReservationService {

    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;
    private final ConferenceRepository conferenceRepository;

    /**
     * 사용자의 모든 예약 내역 조회
     */
    @Override
    public List<ReservationResponse> findReservationList() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null) {
            throw new UserException("예약 내역 조회는 로그인 이후에 가능합니다.");
        }

        CustomUserDetails nowLogInDetail = (CustomUserDetails) auth.getPrincipal();
        String currentPrincipalId = nowLogInDetail.getId();
        User user = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("예약 내역 조회는 로그인 이후에 가능합니다."));

        // 모든 예약 목록 불러오고, 예약된 날짜와 예약 아이템의 이름 리스트를 반환함.
        List<Reservation> reservationList = reservationRepository.findAllByUser(user);
        List<ReservationResponse> reservationResponseList = ReservationResponse.listOf(reservationList);
        return reservationResponseList;
    }

    /**
     * 예약 추가
     * @param sellerId
     * @param buyerId
     * @param conferenceNo
     */
    @Override
    public void addReservation(String sellerId, String buyerId, int conferenceNo) {
        User seller = userRepository.findById(sellerId).orElseThrow(() -> new UserException("판매자가 존재하지 않습니다."));
        User buyer = userRepository.findById(buyerId).orElseThrow(() -> new UserException("구매자가 존재하지 않습니다."));
        Conference conference = conferenceRepository.findById(conferenceNo).orElseThrow(() -> new UserException("존재하지 않는 회의입니다."));
        List<Reservation> reservationList = new ArrayList<>();

        Reservation reservation = Reservation.builder()
                .user(buyer)
                .conference(conference)
                .isSeller(false)
                .build();
        reservationList.add(reservation);

        Reservation reservation2 = Reservation.builder()
                .user(seller)
                .conference(conference)
                .isSeller(true)
                .build();
        reservationList.add(reservation2);

        reservationRepository.saveAll(reservationList);
    }

}
