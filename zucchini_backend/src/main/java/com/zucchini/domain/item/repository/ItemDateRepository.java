package com.zucchini.domain.item.repository;

import com.zucchini.domain.item.domain.ItemDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ItemDateRepository extends JpaRepository<ItemDate, Integer> {

    void deleteByItemNo(int itemNo);

}
