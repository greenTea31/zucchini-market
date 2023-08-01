package com.zucchini.domain.conference.service;

import com.zucchini.domain.conference.domain.Conference;
import com.zucchini.domain.conference.dto.FindConferenceResponse;
import com.zucchini.domain.conference.repository.ConferenceRepository;
import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.repository.ItemRepository;
import com.zucchini.domain.reservation.domain.Reservation;
import com.zucchini.domain.reservation.repository.ReservationRepository;
import com.zucchini.domain.user.domain.User;
import com.zucchini.domain.user.repository.UserRepository;
import com.zucchini.global.config.security.CustomUserDetails;
import com.zucchini.global.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class ConferenceServiceImpl implements ConferenceService{

    private final ConferenceRepository conferenceRepository;
    private final ItemRepository itemRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    /**
     * 회의 생성
     * 성공시 생성된 회의의 번호와 201 코드 리턴
     * 실패시 404, 500 코드 리턴
     */
    @Override
    public int addConference(int itemNo, Date confirmDate) {
        // 아이템 넘버 입력받아서 해당 아이템에 해당하는 회의만 생성하면 됨
        Item item = itemRepository.findById(itemNo).orElseThrow(() -> new NoSuchElementException("아이템이 존재하지 않습니다."));
        Conference conference = Conference.builder().item(item).date(confirmDate).build();
        conferenceRepository.save(conference);
        return conference.getNo();
    }

    /**
     * 회의 조회
     * 실제 화상 채팅 구현 안되어서 일단 API 명세서 그대로 구현
     */
    @Override
    @Transactional(readOnly = true)
    public FindConferenceResponse findConference(int conferenceNo) {
        Conference conference = getConferenceByNo(conferenceNo);

        // conference의 item 확인하고 현재 로그인한 유저가 seller나 buyer에 있지 않으면 예외처리
        String currentPrincipalId = getLoginUserId();

        if (!currentPrincipalId.equals(conference.getItem().getSeller().getId()) == !currentPrincipalId.equals(conference.getItem().getBuyer().getId())) {
            throw new UserException("회의를 조회할 권한이 없습니다.");
        }

        return FindConferenceResponse.of(conference);
    }

    /**
     * 회의 삭제
     * 회의 조회와 같음
     */
    @Override
    public void removeConference(int conferenceNo) {
        Conference conference = getConferenceByNo(conferenceNo);
        conferenceRepository.delete(conference);
    }

    /**
     * 판매자의 예약 취소
     * reservation에서 conference 조회하는 쿼리 날리고 conference의 confirmedDate와 같은 모든 date status를 0으로 변경함. 단 Date.item.seller or Date.item.buyer가 현 로그인한 유저와 같아야 함.
     *
     * @param conferenceNo
     */
    @Override
    public void cancelConference(int conferenceNo) {
        Conference conference = getConferenceByNo(conferenceNo);
        String currentPrincipalId = getLoginUserId();
        User user = userRepository.findById(currentPrincipalId).get();

        // 찾은 컨퍼런스와 관련된 모든 reservation을 찾은 후, reservation들의 User 필드가 현재 로그인한 유저랑 단 하나라도 같지 않다면 권한이 없다는 예외를 발생시킴
        List<Reservation> reservations = reservationRepository.findByConferenceNoAndUser(conferenceNo, user);

        if (reservations.isEmpty()) {
            throw new UserException("회의를 취소할 권한이 없습니다.");
        }

        // conferenceNo로 conference를 찾음
        // 해당 conference랑 연결된 item의 이랑 연결된 모든 Date에 대해 date == confirmed_date이면 status를 0으로 초기화 함
        conference.getItem().getDateList().stream().filter(date -> date.getDate().equals(conference.getConfirmedDate())).forEach(date -> date.setStatus(0));


        // 해당 예약을 삭제함 -> cascade로 reservation도 같이 날아감
        conferenceRepository.delete(conference);
    }

    private Conference getConferenceByNo(int conferenceNo) {
        return conferenceRepository.findById(conferenceNo)
                .orElseThrow(() -> new NoSuchElementException("회의가 존재하지 않습니다."));
    }

    private String getLoginUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails nowLogInDetail = (CustomUserDetails) auth.getPrincipal();
        return nowLogInDetail.getId();
    }



}
