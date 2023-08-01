package com.zucchini.domain.item.repository;

import com.zucchini.domain.item.domain.Item;

import java.util.List;

public interface ItemRepositoryCustom {

    List<Item> findItemAllByUser(String keyword);

    Item findItemByUser(int itemNo);

}
