package com.zucchini.domain.item.service;

import com.zucchini.domain.item.dto.request.ItemRequest;
import com.zucchini.domain.item.dto.response.FindItemListResponse;
import com.zucchini.domain.item.dto.response.FindItemResponse;

import java.util.Date;
import java.util.List;

public interface ItemService {

    List<FindItemListResponse> findItemList(String keyword);
    FindItemResponse findItem(int itemNo);
    int addItem(ItemRequest item);
    void modifyItem(int itemNo, ItemRequest item);
    void removeItem(int itemNo);
    void modifyStatusDeal(int itemNo, String buyer);
    void modifyStatusConfirmation(int itemNo);
    void modifyStatusCancel(int itemNo);
    void modifyDateReservation(int itemNo, Date selectDate);
    void modifyDateStatus(int sellerNo, Date selectDate);

}
