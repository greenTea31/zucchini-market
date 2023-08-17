package com.zucchini.domain.video.api;

import com.zucchini.domain.video.dto.request.AddVideoRequest;
import com.zucchini.domain.video.dto.response.FindVideoResponse;
import com.zucchini.domain.video.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequiredArgsConstructor
@RequestMapping("/video")
public class VideoController {

    private final VideoService videoService;

    /**
     * 비디오 저장 (aws링크 저장)
     */
    @PostMapping
    public ResponseEntity<Integer> addVideo(@Valid @RequestBody AddVideoRequest addVideoRequest){
        videoService.addVideo(addVideoRequest);
        return ResponseEntity.ok().build();
    }

    /**
     * 해당 아이템의 비디오 조회
     */
    @GetMapping("/{no}")
    public ResponseEntity<FindVideoResponse> findVideo(@PathVariable int no){
        FindVideoResponse findVideoResponse = videoService.findVideo(no);
        return ResponseEntity.ok(findVideoResponse);
    }

    /**
     * 해당 아이템의 비디오 존재 여부 확인
     */
    @GetMapping("/check/{itemNo}")
    public ResponseEntity<Boolean> checkVideo(@PathVariable int itemNo) {
        boolean check = videoService.checkVideo(itemNo);
        return ResponseEntity.ok(check);
    }

    /**
     * 해당 아이템의 비디오 기한 연장
     */
    @PutMapping("/extension/{no}")
    public ResponseEntity<Date> extendVideoDeadLine(@PathVariable int no){
        return ResponseEntity.ok().body(videoService.extendVideoDeadLine(no));
    }

}
