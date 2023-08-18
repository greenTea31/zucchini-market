package com.zucchini.domain.video.service;

import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.repository.ItemRepository;
import com.zucchini.domain.video.domain.Video;
import com.zucchini.domain.video.dto.request.AddVideoRequest;
import com.zucchini.domain.video.dto.response.FindVideoResponse;
import com.zucchini.domain.video.repository.VideoRepository;
import com.zucchini.global.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Component
public class VideoServiceImpl implements VideoService {

    private final VideoRepository videoRepository;
    private final ItemRepository itemRepository;
    private final long oneWeekInMillis = 24 * 60 * 60 * 1000 * 7; // 7일의 밀리초 값
    private final long oneMinuteInMillis =  30 * 1000; // 1분의 밀리초 값

    /**
     * 비디오 등록
     * @param addVideoRequest : 비디오 등록 request
     * @return int : 등록된 비디오 no(PK)
     */
    @Override
    public int addVideo(AddVideoRequest addVideoRequest) {
        Date deadLine = new Date(getMidnight(addVideoRequest.getEndTime()).getTime() + oneWeekInMillis);
        Video video = Video.builder()
                .itemNo(addVideoRequest.getItemNo())
                .link(addVideoRequest.getLink())
                .startTime(addVideoRequest.getStartTime())
                .endTime(addVideoRequest.getEndTime())
                .deleteTime(deadLine)
                .build();
        videoRepository.save(video);
        return video.getNo();
    }

    /**
     * 해당 시간이 자정인지 확인 후 자정이 아니면 다음날 자정 시간으로 변경해서 반환
     * @param date : 종료 시간
     * @return Date : 자정 시간으로 변경된 종료 시간
     */
    private Date getMidnight(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        int hour = calendar.get(Calendar.HOUR_OF_DAY);
        int minute = calendar.get(Calendar.MINUTE);
        int second = calendar.get(Calendar.SECOND);
        // 자정인 경우
        if(hour == 0 && minute == 0 && second == 0) return date;
        // 시, 분, 초를 0으로 설정
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);

        // 일(day)을 1 증가시켜 다음 날 자정 시간으로 설정
        calendar.add(Calendar.DAY_OF_MONTH, 1);

        return calendar.getTime();
    }

    /**
     * 비디오 조회
     * @param no : 비디오 no(PK)
     * @return FindVideoResponse : 비디오 조회 response
     */
    @Override
    @Transactional(readOnly = true)
    public FindVideoResponse findVideo(int no) {
        Optional<Video> video = videoRepository.findByItemNo(no);
        if(!video.isPresent()) throw new NoSuchElementException("해당 비디오가 존재하지 않습니다.");
        // 해당 아이템의 판매자 구매자가 아닌 경우 비디오 조회 권한이 없음
        Item item = itemRepository.findItemWithFetchJoinById(video.get().getItem().getNo());
        String loginId = getCurrentId();
        // 최적화 방법 -> fetch join
        String sellerId = item.getSeller().getId();
        String buyerId = item.getBuyer().getId();
        // 탈퇴한 회원 id는 null이 되므로 예외처리
        if(sellerId != null && buyerId != null){
            if(!sellerId.equals(loginId) && !buyerId.equals(loginId))
                throw new UserException("해당 아이템의 비디오 조회 권한이 없습니다.");
        }else if(sellerId == null){
            if(!buyerId.equals(loginId))
                throw new UserException("해당 아이템의 비디오 조회 권한이 없습니다.");
        }else if(buyerId == null){
            if(!sellerId.equals(loginId))
                throw new UserException("해당 아이템의 비디오 조회 권한이 없습니다.");
        }

        return FindVideoResponse.builder()
                .no(video.get().getNo())
                .itemNo(item.getNo())
                .itemTitle(item.getTitle())
                .seller(item.getSeller().getNickname())
                .link(video.get().getLink())
                .startTime(video.get().getStartTime())
                .endTime(video.get().getEndTime())
                .deleteTime(video.get().getDeleteTime())
                .build();
    }

    /**
     * 스프링 시큐리티 인증을 통과하여 저장된 회원의 인증 객체에서 아이디 추출
     * @return String : 아이디
     */
    private String getCurrentId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return principal.getUsername();
    }

    /**
     * 비디오 존재 여부
     * @param itemNo : 상품번호(PK)
     * @return boolean : 상품 존재 여부
     */
    public boolean checkVideo(int itemNo) {
        Optional<Video> video = videoRepository.findByItemNo(itemNo);
        if(!video.isPresent()) {
            return false;
        }
        return true;
    }

    /**
     * 비디오 삭제
     * @param no : 비디오 no(PK)
     */
    @Override
    public void deleteVideo(int no) {
        videoRepository.deleteById(no);
    }

    /**
     * 자정마다 기간이 만료된 비디오 모두 삭제
     */
    @Scheduled(cron = "0 0 0 * * *")
    public void deleteExpiredVideo(){
        Date now = new Date();
        videoRepository.deleteByDeleteTimeBefore(now);
    }

    /**
     * 비디오 기한 7일 연장
     * @param no : 비디오 no(PK)
     */
    @Override
    public Date extendVideoDeadLine(int no) {
        Optional<Video> video = videoRepository.findById(no);
        if(!video.isPresent()) throw new NoSuchElementException("해당 비디오가 존재하지 않습니다.");
        if(isExtended(video.get().getEndTime(), video.get().getDeleteTime()))
            throw new IllegalArgumentException("해당 비디오는 이미 연장을 한 상태입니다.");
        // 7일 연장
        Date extendedTime = new Date(video.get().getDeleteTime().getTime() + oneWeekInMillis);
        video.get().extendDeleteTime(extendedTime);
        return extendedTime;
    }

    /**
     * 연장 가능 여부
     * @param endTime : 비디오 종료 시간
     * @param deleteTime : 비디오 삭제 유효기간
     * @return boolean : 연장 가능 여부
     */
    private boolean isExtended(Date endTime, Date deleteTime){
        // 자정 기준으로 변환 작업
        endTime = getMidnight(endTime);
        // 초단위는 오차가 있을 수 있어서 제거
        Long endTimeInMills = endTime.getTime() - endTime.getTime() % oneMinuteInMillis;
        Long deleteTimeInMills = deleteTime.getTime() - deleteTime.getTime() % oneMinuteInMillis;
        return deleteTimeInMills - endTimeInMills > oneWeekInMillis;
    }

}
