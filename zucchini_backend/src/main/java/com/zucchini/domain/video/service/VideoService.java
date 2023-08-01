package com.zucchini.domain.video.service;

import com.zucchini.domain.video.dto.request.AddVideoRequest;
import com.zucchini.domain.video.dto.response.FindVideoResponse;

public interface VideoService {

    int addVideo(AddVideoRequest addVideoRequest);
    void extendVideoDeadLine(int no);
    FindVideoResponse findVideo(int no);
    void deleteVideo(int no);
}
