package com.zucchini.domain.item.service;

import com.zucchini.domain.category.domain.ItemCategory;
import com.zucchini.domain.category.domain.ItemCategoryId;
import com.zucchini.domain.category.repository.ItemCategoryRepository;
import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.domain.ItemDate;
import com.zucchini.domain.item.dto.request.ItemRequest;
import com.zucchini.domain.item.dto.response.FindItemListResponse;
import com.zucchini.domain.item.dto.response.FindItemResponse;
import com.zucchini.domain.item.exception.ItemException;
import com.zucchini.domain.item.repository.ItemDateRepository;
import com.zucchini.domain.item.repository.ItemRepository;
import com.zucchini.domain.room.service.RoomService;
import com.zucchini.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
    private final ItemDateRepository itemDateRepository;
    private final UserRepository userRepository;
    private final ItemCategoryRepository itemCategoryRepository;
    private final RoomService roomService;

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
        for (ItemDate itemDate : item.getDateList()) {
            dateList.add(itemDate.getDate());
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

        Item buildItem = Item.builder()
                .title(item.getTitle())
                .content(item.getContent())
                .price(item.getPrice())
                .seller(userRepository.findById(getCurrentId()).get())
                .build();

        Item itemEntity = itemRepository.save(buildItem);
        int itemNo = itemEntity.getNo();

        addDate(itemNo, item.getDateList());
        addCategory(itemNo, item.getCategoryList());
    }

    private void addDate(int itemNo, List<Date> getDateList) {
        List<ItemDate> dateList = new ArrayList<>();
        for (Date date : getDateList) {
            ItemDate buildDate = ItemDate.builder()
                    .itemNo(itemNo)
                    .date(date)
                    .build();
            dateList.add(buildDate);
        }
        itemDateRepository.saveAll(dateList);
    }

    private void addCategory(int itemNo, List<Integer> getCategoryList) {
        List<ItemCategory> itemCategoryList = new ArrayList<>();
        for (int categoryNo : getCategoryList) {
            ItemCategoryId itemCategoryId = new ItemCategoryId();
            itemCategoryId.setItemNo(itemNo);
            itemCategoryId.setCategoryNo(categoryNo);

            ItemCategory itemCategory = ItemCategory.builder()
                    .id(itemCategoryId)
                    .build();

            itemCategoryList.add(itemCategory);
        }
        itemCategoryRepository.saveAll(itemCategoryList);
    }

    @Override
    public void modifyItem(int itemNo, ItemRequest item) {
        // itemNo로 아이템 조회
        if (!itemRepository.findById(itemNo).isPresent()) {
            throw new ItemException("존재하지 않는 상품입니다.");
        }
        Item findItem = itemRepository.findById(itemNo).get();

        // 현재 사용자와 아이템 판매자가 동일한지 확인
        if (!findItem.getSeller().getId().equals(getCurrentId())){
            throw new ItemException("잘못된 접근입니다. 다른 판매자의 상품을 수정할 수 없습니다.");
        }

        // date 수정
        removeDate(itemNo);
        addDate(itemNo, item.getDateList());

        // category 수정
        removeCategory(itemNo);
        addCategory(itemNo, item.getCategoryList());

        findItem.modifyItem(item);
    }

    private void removeDate(int itemNo) {
        itemDateRepository.deleteByItemNo(itemNo);
    }

    private void removeCategory(int itemNo) {
        itemCategoryRepository.deleteByItemNo(itemNo);
    }

    @Override
    public void removeItem(int itemNo) {
        // itemNo로 아이템 조회
        if (!itemRepository.findById(itemNo).isPresent()) {
            throw new ItemException("존재하지 않는 상품입니다.");
        }
        Item findItem = itemRepository.findById(itemNo).get();

        // 현재 사용자와 아이템 판매자가 동일한지 확인
        if (!findItem.getSeller().getId().equals(getCurrentId())){
            throw new ItemException("잘못된 접근입니다. 다른 판매자의 상품을 삭제할 수 없습니다.");
        }

        // "거래중"일 경우 삭제 불가능
        if (findItem.getStatus() == 1) {
            throw new ItemException("거래 중인 상품은 삭제 불가능합니다.");
        }

        // 삭제할 item과 관련된 room의 itemNo를 null로 변경
        roomService.changeRoomItemNo(itemNo);

        itemRepository.deleteById(itemNo);
    }

    private String getCurrentId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return principal.getUsername();
    }

}
