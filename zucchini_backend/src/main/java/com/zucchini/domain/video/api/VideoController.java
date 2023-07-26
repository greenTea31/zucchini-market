package com.zucchini.domain.video.api;

import com.zucchini.domain.video.dto.request.AddVideoRequest;
import com.zucchini.domain.video.dto.response.FindVideoResponse;
import com.zucchini.domain.video.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/video")
public class VideoController {

    private final VideoService videoService;

    /**
     * 비디오 등록
     */
    @PostMapping
    public ResponseEntity<Integer> addVideo(@Valid @RequestBody AddVideoRequest addVideoRequest, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST);
        }
        try{
            videoService.addVideo(addVideoRequest);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(HttpStatus.OK.value());
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
    public ResponseEntity<Integer> extendVideoDeadLine(@PathVariable int no){
        videoService.extendVideoDeadLine(no);
        return ResponseEntity.ok(HttpStatus.OK.value());
    }

}
