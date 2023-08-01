package com.zucchini.domain.item.repository;

import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.user.domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer>, ItemRepositoryCustom {
    @EntityGraph(value = "Item.withImages", type = EntityGraph.EntityGraphType.LOAD)
    @Query(value = "select i from Item i " +
            "where i.buyer = :user and i.title like concat('%', :keyword, '%') ")
    List<Item> findAllByBuyer(User user, String keyword);

    @EntityGraph(value = "Item.withImages", type = EntityGraph.EntityGraphType.LOAD)
    @Query(value = "select i from Item i " +
            "where i.seller = :user and i.title like concat('%', :keyword, '%') ")
    List<Item> findAllBySeller(User user, String keyword);

    @Query(value = "select i from Item i " +
            "join fetch i.buyer " +
            "join fetch i.seller")
    Item findItemWithFetchJoinById(int itemNo);

}
