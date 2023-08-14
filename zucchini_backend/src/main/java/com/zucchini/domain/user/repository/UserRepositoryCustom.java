package com.zucchini.domain.user.repository;

import com.zucchini.domain.item.domain.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepositoryCustom {

    /**
     * 회원이 거래한 상품 개수 조회
     * @param id : 아이디
     * @return long : 상품 개수
     */
    long countItemsByStatusAndUserNo(String id);

    /**
     * 회원의 판매 목록 조회(페이징)
     * @param keyword
     * @param pageable
     * @return
     */
    Page<Item> findPageSellListByUser(String userId, String keyword, Pageable pageable, int category);

    /**
     * 회원의 구매 목록 조회(페이징)
     * @param keyword
     * @param pageable
     * @return
     */
    Page<Item> findPageBuyListByUser(String userId, String keyword, Pageable pageable);

}
