package com.zucchini.domain.item.repository;

import com.zucchini.domain.item.domain.ItemDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface ItemDateRepository extends JpaRepository<ItemDate, Integer> {

    /**
     * 상품에 속한 화상 가능 날짜 삭제
     * @param itemNo : 상품 번호 (PK)
     */
    void deleteByItemNo(int itemNo);

    /**
     * 상품의 화상 가능 날짜 중 특정 날짜 조회
     * @param itemNo : 상품 번호 (PK)
     * @param selectDate : 특정 날짜
     */
    ItemDate searchItemDateByItemNoAndDate(int itemNo, Date selectDate);

    /**
     * 회원이 판매하고 있는 상품 중 특정 날짜 조회
     * @param userNo : 회원 번호 (PK)
     * @param selectDate : 특정 날짜
     */
    @Query("SELECT d FROM ItemDate d " +
            "JOIN fetch d.item i " +
            "WHERE i.seller.no = :userNo and d.date = :selectDate")
    List<ItemDate> searchItemDatesByUser(int userNo, Date selectDate);

}
