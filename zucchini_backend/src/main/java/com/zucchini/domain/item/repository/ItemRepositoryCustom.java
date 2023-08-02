package com.zucchini.domain.item.repository;

import com.zucchini.domain.item.domain.Item;

import java.util.List;

public interface ItemRepositoryCustom {

    /**
     * 상품 전체 조회 (검색 기능 포함)
     * - 탈퇴했거나 잠긴 회원 상품 제외
     * @param keyword : 검색어
     * @return List<Item> : 상품 리스트
     */
    List<Item> findItemAllByUser(String keyword);

    /**
     * 상품 상세 조회
     * - 탈퇴했거나 잠긴 회원 상품 제외
     * @param itemNo : 상품 번호 (PK)
     * @return Item : 상품 상세 정보
     */
    Item findItemByUser(int itemNo);

}
