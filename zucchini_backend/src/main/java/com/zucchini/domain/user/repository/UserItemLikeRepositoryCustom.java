package com.zucchini.domain.user.repository;

import com.zucchini.domain.item.domain.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserItemLikeRepositoryCustom {

    /**
     * 회원의 찜 목록 조회(페이징)
     * @param keyword
     * @param pageable
     * @return
     */
    Page<Item> findPageUserLikeItems(String userId, String keyword, Pageable pageable, int category);

}
