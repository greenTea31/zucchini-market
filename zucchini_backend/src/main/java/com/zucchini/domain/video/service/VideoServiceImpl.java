package com.zucchini.domain.video.service;

import com.zucchini.domain.video.domain.Video;
import com.zucchini.domain.video.dto.request.AddVideoRequest;
import com.zucchini.domain.video.dto.response.FindVideoResponse;
import com.zucchini.domain.video.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class VideoServiceImpl implements VideoService {

    private final VideoRepository videoRepository;


    /**
     * 비디오 생성
     */
    @Override
    public void addVideo(AddVideoRequest addVideoRequest) {
        long oneDayInMillis = 24 * 60 * 60 * 1000 * 7; // 7일의 밀리초 값
        Date deadLine = new Date(getMidnight(addVideoRequest.getEndTime()).getTime() + oneDayInMillis);
        Video video = Video.builder()
                .itemNo(addVideoRequest.getItemNo())
                .link(addVideoRequest.getLink())
                .startTime(addVideoRequest.getStartTime())
                .endTime(addVideoRequest.getEndTime())
                .deleteTime(deadLine)
                .build();
        videoRepository.save(video);
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
        Optional<Video> video = videoRepository.findById(no);
        if(!video.isPresent()) throw new IllegalArgumentException("해당 비디오가 존재하지 않습니다.");

        return FindVideoResponse.builder()
                .link(video.get().getLink())
                .startTime(video.get().getStartTime())
                .endTime(video.get().getEndTime())
                .deleteTime(video.get().getDeleteTime())
                .build();
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
        if(!video.isPresent()) throw new IllegalArgumentException("해당 비디오가 존재하지 않습니다.");
        video.get().extendDeleteTime();
    }

}
