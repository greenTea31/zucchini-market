package com.zucchini.domain.user.repository;

import com.zucchini.domain.user.domain.UserItemLike;
import com.zucchini.domain.user.domain.UserItemLikeId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserItemLikeRepository extends JpaRepository<UserItemLike, UserItemLikeId> {

    /**
     * 해당 회원이 찜한 아이템 목록 조회
     */
    List<UserItemLike> findAllByUserId(String userId);

    /**
     * 해당 회원이 찜한 아이템 취소
     */
    void deleteByUser_IdAndItem_No(String userId, int itemNo);

}
