package com.zucchini.domain.image.repository;

import com.zucchini.domain.image.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Integer> {

    List<Image> findAllByItemNo(int itemNo);
    void deleteAllByItemNo(int itemNo);

}
