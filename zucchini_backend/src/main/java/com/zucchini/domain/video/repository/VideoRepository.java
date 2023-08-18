package com.zucchini.domain.video.repository;

import com.zucchini.domain.video.domain.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.Optional;

public interface VideoRepository extends JpaRepository<Video, Integer> {

    /**
     * 상품 번호로 조회
     * @param itemNo : 상품 번호
     * @return Optional<Video> : 비디오
     */
    Optional<Video> findByItemNo(int itemNo);

    /**
     * 만료된 비디오 삭제
     * @param now
     */
    void deleteByDeleteTimeBefore(Date now);

}
