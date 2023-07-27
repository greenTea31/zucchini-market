package com.zucchini.domain.item.repository;

import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.user.domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer>, ItemRepositoryCustom {
    @EntityGraph(value = "Item.withImages", type = EntityGraph.EntityGraphType.LOAD)
    List<Item> findAllByBuyer(User user);

    @EntityGraph(value = "Item.withImages", type = EntityGraph.EntityGraphType.LOAD)
    List<Item> findAllBySeller(User user);

}
