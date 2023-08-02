package com.zucchini.domain.item.repository;

import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.user.domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer>, ItemRepositoryCustom {

    /**
     * 구매 목록 조회 (검색 기능 포함)
     * @param user : 회원
     * @param keyword : 검색어
     * @return List<Item> : 구매 목록 리스트
     */
    @EntityGraph(value = "Item.withImages", type = EntityGraph.EntityGraphType.LOAD)
    @Query(value = "select i from Item i " +
            "where i.buyer = :user and i.title like concat('%', :keyword, '%') ")
    List<Item> findAllByBuyer(User user, String keyword);

    /**
     * 판매 목록 조회 (검색 기능 포함)
     * @param user : 회원
     * @param keyword : 검색어
     * @return List<Item> : 판매 목록 리스트
     */
    @EntityGraph(value = "Item.withImages", type = EntityGraph.EntityGraphType.LOAD)
    @Query(value = "select i from Item i " +
            "where i.seller = :user and i.title like concat('%', :keyword, '%') ")
    List<Item> findAllBySeller(User user, String keyword);

    /**
     * 상품 판매자/구매자 정보 조회
     * @param itemNo : 상품 번호 (PK)
     */
    @Query(value = "select i from Item i " +
            "join fetch i.buyer " +
            "join fetch i.seller " +
            "where i.no = :itemNo")
    Item findItemWithFetchJoinById(int itemNo);

}
