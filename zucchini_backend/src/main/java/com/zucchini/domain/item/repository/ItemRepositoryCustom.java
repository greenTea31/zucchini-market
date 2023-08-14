package com.zucchini.domain.item.repository;

import com.zucchini.domain.item.domain.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ItemRepositoryCustom {

    /**
     * 상품 상세 조회
     * - 탈퇴했거나 잠긴 회원 상품 제외
     * @param itemNo : 상품 번호 (PK)
     * @return Item : 상품 상세 정보
     */
    Item findItemByUser(int itemNo);

    /**
     * 상품 전체 조회(페이징)
     * - 탈퇴했거나 잠긴 회원 상품 제외
     * @param keyword : 검색어
     * @param pageable : 페이지 정보
     * @return
     */
    Page<Item> findPageItems(String keyword, Pageable pageable);

}
