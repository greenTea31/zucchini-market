package com.zucchini.domain.video.service;

import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.repository.ItemRepository;
import com.zucchini.domain.video.domain.Video;
import com.zucchini.domain.video.dto.request.AddVideoRequest;
import com.zucchini.domain.video.dto.response.FindVideoResponse;
import com.zucchini.domain.video.repository.VideoRepository;
import com.zucchini.global.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class VideoServiceImpl implements VideoService {

    private final VideoRepository videoRepository;
    private final ItemRepository itemRepository;
    private final long oneWeekInMillis = 24 * 60 * 60 * 1000 * 7; // 7일의 밀리초 값

    /**
     * 비디오 생성
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
     */
    @Override
    public FindVideoResponse findVideo(int no) {
        Optional<Video> video = videoRepository.findByItemNo(no);
        if(!video.isPresent()) throw new NoSuchElementException("해당 비디오가 존재하지 않습니다.");
        // 해당 아이템의 판매자 구매자가 아닌 경우 비디오 조회 권한이 없음
//        Optional<Item> item = itemRepository.findById(video.get().getItemNo());
        Item item = itemRepository.findItemWithFetchJoinById(video.get().getItem().getNo());
        String loginId = getCurrentId();
        // 최적화 방법 -> fetch join
        if(!item.getSeller().getId().equals(loginId) && !item.getBuyer().getId().equals(loginId))
            throw new UserException("해당 아이템의 비디오 조회 권한이 없습니다.");

        return FindVideoResponse.builder()
                .link(video.get().getLink())
                .startTime(video.get().getStartTime())
                .endTime(video.get().getEndTime())
                .deleteTime(video.get().getDeleteTime())
                .build();
    }

    private String getCurrentId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return principal.getUsername();
    }

    /**
     * 비디오 삭제
     */
    @Override
    public void deleteVideo(int no) {
        videoRepository.deleteById(no);
    }

    /**
     * 비디오 기한 7일 연장
     */
    @Override
    public void extendVideoDeadLine(int no) {
        Optional<Video> video = videoRepository.findById(no);
        if(!video.isPresent()) throw new NoSuchElementException("해당 비디오가 존재하지 않습니다.");
        if(isExtended(video.get().getEndTime(), video.get().getDeleteTime()))
            throw new IllegalArgumentException("해당 비디오는 이미 연장을 한 상태입니다.");
        video.get().extendDeleteTime();
    }

    private boolean isExtended(Date endTime, Date deleteTime){
        return deleteTime.getTime() - getMidnight(endTime).getTime() > oneWeekInMillis;
    }

}
