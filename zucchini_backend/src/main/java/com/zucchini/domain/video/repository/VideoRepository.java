package com.zucchini.domain.video.repository;

import com.zucchini.domain.video.domain.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VideoRepository extends JpaRepository<Video, Integer> {

//    @Query(value = "select i from Video v " +
//            "where v.itemNo = :itemNo")
    Optional<Video> findByItemNo(int itemNo);

}
