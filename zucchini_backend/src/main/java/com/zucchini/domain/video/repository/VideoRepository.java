package com.zucchini.domain.video.repository;

import com.zucchini.domain.video.domain.Video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, Integer> {


}
