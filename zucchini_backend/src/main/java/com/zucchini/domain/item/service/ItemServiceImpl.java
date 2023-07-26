package com.zucchini.domain.item.service;

import com.zucchini.domain.category.domain.ItemCategory;
import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.dto.request.ItemRequest;
import com.zucchini.domain.item.dto.response.FindItemListResponse;
import com.zucchini.domain.item.dto.response.FindItemResponse;
import com.zucchini.domain.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    @Override
    public List<FindItemListResponse> findItemList() {

        int likeCount = 0;  // user_item_like 생성 후 작성

        // image, category 리스트로 수정 후 작성
        String image = null;
        String category = null;

        List<Item> itemList = itemRepository.findItemAllByUser();

        return itemList.stream().map(
                item -> FindItemListResponse.builder()
                        .no(item.getNo())
                        .title(item.getTitle())
                        .updatedAt(item.getUpdatedAt())
                        .content(item.getContent())
                        .price(item.getPrice())
                        .status(item.getStatus())
                        .image(image)
                        .likeCount(likeCount)
                        .category(category)
                        .build()
        ).collect(Collectors.toList());

    }

    @Override
    public FindItemResponse findItem(int itemNo) {
        int likeCount = 0;  // user_item_like 생성 후 작성

        // image 리스트로 수정 후 작성
        String image = null;

        Item item = itemRepository.findItemByUser(itemNo);

        List<String> categoryList = new ArrayList<>();
        for (ItemCategory itemCategory : item.getCategoryList()) {
            categoryList.add(itemCategory.getCategory().getCategory());
        }

        List<Date> dateList = new ArrayList<>();
        for (com.zucchini.domain.item.domain.Date date : item.getDateList()) {
            dateList.add(date.getDate());
        }

        FindItemResponse.Seller seller = new FindItemResponse.Seller(item.getSeller().getNickname()
                , item.getSeller().getGrade());
        log.info(seller.toString());

        return FindItemResponse.builder()
                        .no(item.getNo())
                        .title(item.getTitle())
                        .createdAt(item.getCreatedAt())
                        .updatedAt(item.getUpdatedAt())
                        .content(item.getContent())
                        .price(item.getPrice())
                        .status(item.getStatus())
                        .image(image)
                        .likeCount(likeCount)
                        .seller(seller)
                        .dateList(dateList)
                        .categoryList(categoryList)
                        .build();
    }

    @Override
    public void addItem(ItemRequest item) {

    }

    @Override
    public void modifyItem(int itemNo, ItemRequest item) {

    }

    @Override
    public void removeItem(int itemNo) {

    }

}
