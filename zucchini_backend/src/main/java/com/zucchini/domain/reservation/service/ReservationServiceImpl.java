package com.zucchini.domain.reservation.service;

import com.zucchini.domain.conference.repository.ConferenceRepository;
import com.zucchini.domain.conference.service.ConferenceService;
import com.zucchini.domain.item.domain.ItemDate;
import com.zucchini.domain.item.repository.ItemDateRepository;
import com.zucchini.domain.item.repository.ItemRepository;
import com.zucchini.domain.item.service.ItemService;
import com.zucchini.domain.reservation.domain.Reservation;
import com.zucchini.domain.reservation.dto.request.ConfirmReservationRequest;
import com.zucchini.domain.reservation.dto.request.ReservationRequest;
import com.zucchini.domain.reservation.dto.response.CheckReservationResponse;
import com.zucchini.domain.reservation.dto.response.ReservationResponse;
import com.zucchini.domain.reservation.repository.ReservationRepository;
import com.zucchini.domain.user.domain.User;
import com.zucchini.domain.user.repository.UserRepository;
import com.zucchini.global.domain.ReservationConfirmCode;
import com.zucchini.global.domain.ReservationConfirmCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class ReservationServiceImpl implements ReservationService {

    // 예약 확인 유효 시간 1분
    private static final Long reservationConfirmExpiration = 1000L * 60;

    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;
    private final ConferenceRepository conferenceRepository;
    private final ItemDateRepository itemDateRepository;
    private final ItemRepository itemRepository;
    private final ReservationConfirmCodeRepository reservationConfirmCodeRepository;

    private final ItemService itemService;
    private final ConferenceService conferenceService;

    /**
     * 사용자의 모든 예약 내역 조회
     */
    @Override
    public List<ReservationResponse> findReservationList() {
        String currentPrincipalId = getCurrentId();
        User user = userRepository.findById(currentPrincipalId).get();

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
//    @Override
//    public void addReservation(String sellerId, String buyerId, int conferenceNo) {
//        User seller = userRepository.findById(sellerId).orElseThrow(() -> new NoSuchElementException("판매자가 존재하지 않습니다."));
//        User buyer = userRepository.findById(buyerId).orElseThrow(() -> new NoSuchElementException("구매자가 존재하지 않습니다."));
//        Conference conference = conferenceRepository.findById(conferenceNo).orElseThrow(() -> new NoSuchElementException("존재하지 않는 회의입니다."));
//        List<Reservation> reservationList = new ArrayList<>();
//
//        Reservation reservation = Reservation.builder()
//                .user(buyer)
//                .conference(conference)
//                .isSeller(false)
//                .build();
//        reservationList.add(reservation);
//
//        Reservation reservation2 = Reservation.builder()
//                .user(seller)
//                .conference(conference)
//                .isSeller(true)
//                .build();
//        reservationList.add(reservation2);
//
//        reservationRepository.saveAll(reservationList);
//    }

    /**
     * 예약 추가
     */
    @Override
    public void addReservation(int itemNo, Date selectDate) {
        // 예약 성공
        // 컨퍼런스 생성 후 예약 생성 -> 논의해야 함
        // 일단 해당 날짜로 컨퍼런스 생성 후 컨퍼런스에 대한 구매자, 판매자 예약 생성하는 방식으로 구현한 상태
        String buyerId = getCurrentId();
        int conferenceNo = conferenceService.addConference(itemNo, selectDate);
        Reservation buyerReservation = Reservation.builder()
                .user(userRepository.findById(buyerId).get())
                .conferenceNo(conferenceNo)
                // 구매자라서
                .isSeller(false)
                .build();
        // 쿼리 최적화...?
        int sellerNo = itemRepository.findById(itemNo).get().getSeller().getNo();
        Reservation sellerReservation = Reservation.builder()
                .user(userRepository.findById(sellerNo).get())
                .conferenceNo(conferenceNo)
                // 판매자라서
                .isSeller(true)
                .build();
        // 리스트 형태로 변경
        List<Reservation> reservationList = new ArrayList<>();
        reservationList.add(buyerReservation);
        reservationList.add(sellerReservation);
        // 한번에 save 하기 위함
        reservationRepository.saveAll(reservationList);
        //예약 성공 -> 구매자와 판매자가 판매하는 아이템의 날짜 목록 중 해당 날짜에 해당하는 것들 모두 status 2로 변경
        itemService.modifyDateStatus(sellerNo, selectDate);
        //예약 성공 -> 아이템의 해당 날짜 status 1로 변경
        itemService.modifyDateReservation(itemNo, selectDate);
    }

    /**
     * 예약하려는 날짜 가능 여부 검사
     * 예약 가능 -> 구매자가 등록한 판매 상품의 날짜 목록에 포함되는지 검사
     * @param checkReservationRequest
     * @return
     */
    @Override
    public CheckReservationResponse checkReservation(ReservationRequest checkReservationRequest) {
        int status = 0;
        UUID code = null;
        // date status 확인
        int itemNo = checkReservationRequest.getItemNo();
        Date selectDate = checkReservationRequest.getSelectDate();
        ItemDate itemDate = itemDateRepository.searchItemDateByItemNoAndDate(itemNo, selectDate);
        if (itemDate == null) throw new IllegalArgumentException("해당 날짜는 판매자가 판매하지 않는 날짜입니다.");
        if(itemDate.getStatus() != 0) {
            return CheckReservationResponse.builder()
                    .status(status)
                    .code(code)
                    .build();
        }
        // conference와 reservation 조인 -> 선택한 날짜가 이미 예약된 일정 날짜 목록에 포함되어있는지 확인
        String buyerId = getCurrentId();
        Optional<Reservation> reservation = reservationRepository.findWithFetchJoinByUserIdAndDate(buyerId, selectDate);
        // 포함되어 있으므로 예약 실패
        if(reservation.isPresent()) {
            return CheckReservationResponse.builder()
                    .status(status)
                    .code(code)
                    .build();
        }
        // 예약 가능한 상황
        // 구매자가 등록한 판매 상품 날짜 목록에 해당 날짜가 포함되어 있는지 확인
        int buyerNo = userRepository.findById(buyerId).get().getNo();
        List<ItemDate> itemDateList = itemDateRepository.searchItemDatesByUser(buyerNo, selectDate);
        if(itemDateList.isEmpty()){
            // 포함되어 있는 날짜가 없음
            // 바로 예약 생성 가능
            status = 2;
            addReservation(itemNo, selectDate);
        }else {
            status = 1;
            // UUID 생성
            // 랜덤 UUID 생성
            code = UUID.randomUUID();
            // redis에 유효시간 1분으로 UUID 코드 저장
            reservationConfirmCodeRepository.save(ReservationConfirmCode.createReservationConfirmCode(code, buyerId, reservationConfirmExpiration));
        }
        return CheckReservationResponse.builder()
                .status(status)
                .code(code)
                .build();
    }


    /**
     * 예약 코드가 유효한지 검사 후 예약 생성으로 이동
     */
    @Override
    public void checkReservationConfirmCode(ConfirmReservationRequest confirmReservationRequest) {
        UUID code = confirmReservationRequest.getCode();
        ReservationConfirmCode confirmCode = reservationConfirmCodeRepository.findById(code).orElseThrow(NoSuchElementException::new);
        // 유효해서 예약 생성
        int itemNo = confirmReservationRequest.getItemNo();
        Date selectDate = confirmReservationRequest.getSelectDate();
        addReservation(itemNo, selectDate);
        // code 확인이 완료되었으므로 파기
        reservationConfirmCodeRepository.deleteById(code);
    }


    /**
     * 현재 로그인한 유저의 화상 예약된 날짜를 리턴함
     */
    @Override
    public List<Date> findReservationDateList() {
        String currentPrincipalId = getCurrentId();
        User user = userRepository.findById(currentPrincipalId).get();
        // userNo를 가진 reservation 목록에서 conference를 호출함. 그리고 conference의 confirmedDate 리스트를 가져옴
        List<Date> reservationList = reservationRepository.findAllConfirmedDatesByUser(user);
        return reservationList;
    }


    private String getCurrentId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return principal.getUsername();
    }

}
