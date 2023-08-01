package com.zucchini.domain.item.repository;

import com.zucchini.domain.item.domain.ItemDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface ItemDateRepository extends JpaRepository<ItemDate, Integer> {

    void deleteByItemNo(int itemNo);

    ItemDate searchItemDateByItemNoAndDate(int itemNo, Date selectDate);

    @Query("SELECT d FROM ItemDate d " +
            "JOIN fetch d.item i " +
            "WHERE i.seller.no = :userNo and d.date = :selectDate")
    List<ItemDate> searchItemDatesByUser(int userNo, Date selectDate);

}
