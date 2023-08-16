package com.zucchini.domain.video.api;

import com.zucchini.domain.video.dto.request.ModifyVideoRequest;
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
     * 비디오 링크 수정 (openvidu 링크에서 aws 링크로 변경)
     */
    @PutMapping("/{no}")
    public ResponseEntity<Integer> modifyVideo(@PathVariable int no, @Valid @RequestBody ModifyVideoRequest modifyVideoRequest){
        videoService.modifyVideo(no, modifyVideoRequest.getLink());
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
     * 해당 아이템의 비디오 기한 연장
     */
    @PutMapping("/extension/{no}")
    public ResponseEntity<Date> extendVideoDeadLine(@PathVariable int no){
        return ResponseEntity.ok().body(videoService.extendVideoDeadLine(no));
    }

}
