package com.zucchini.domain.item.service;

import com.zucchini.domain.item.dto.request.ItemRequest;
import com.zucchini.domain.item.dto.response.FindItemListResponse;
import com.zucchini.domain.item.dto.response.FindItemResponse;

import java.util.List;

public interface ItemService {

    List<FindItemListResponse> findItemList();
    FindItemResponse findItem(int itemNo);
    void addItem(ItemRequest item);
    void modifyItem(int itemNo, ItemRequest item);
    void removeItem(int itemNo);
    void modifyStatusDeal(int itemNo, String buyer);
    void modifyStatusConfirmation(int itemNo);
    void modifyStatusCancel(int itemNo);

}
