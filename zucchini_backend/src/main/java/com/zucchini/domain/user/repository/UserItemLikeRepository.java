package com.zucchini.domain.user.repository;

import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.user.domain.UserItemLike;
import com.zucchini.domain.user.domain.UserItemLikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserItemLikeRepository extends JpaRepository<UserItemLike, UserItemLikeId> {

    /**
     * 해당 회원이 찜한 아이템 목록 조회
     */
    @Query(value = "select i from UserItemLike uil " +
            "join uil.user u " +
            "join uil.item i " +
            "where u.id = :userId and i.title like concat('%',:keyword,'%')")
    List<Item> findAllByUserId(String userId, String keyword);

    /**
     * 해당 회원이 찜한 아이템 취소
     */
    @Modifying
    @Query(value = "delete user_item_like from user_item_like inner join user on user_item_like.user_no = user.no  " +
            "where user.id = :userId and user_item_like.item_no = :itemNo", nativeQuery = true)
//    @Query(value = "delete from UserItemLike uil " +
//            "where uil.user.id = :userId")
    void deleteByUserIdAndItemNo(String userId, int itemNo);

    /**
     * 회원이 등록한 판매 아이템의 찜 개수 확인
     */
    int countById_ItemNo(int itemNo);

    /**
     * 회원이 찜한 아이템 목록 페이징
     */

    /**
     * 회원이 찜한 아이템 목록 검색 & 페이징
     */

}
