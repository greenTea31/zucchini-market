package com.zucchini.domain.item.service;

import com.zucchini.domain.category.domain.ItemCategory;
import com.zucchini.domain.category.domain.ItemCategoryId;
import com.zucchini.domain.category.repository.ItemCategoryRepository;
import com.zucchini.domain.image.domain.Image;
import com.zucchini.domain.image.repository.ImageRepository;
import com.zucchini.domain.image.service.ImageService;
import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.domain.ItemDate;
import com.zucchini.domain.item.dto.request.ItemRequest;
import com.zucchini.domain.item.dto.response.DateResponse;
import com.zucchini.domain.item.dto.response.FindItemListResponse;
import com.zucchini.domain.item.dto.response.FindItemResponse;
import com.zucchini.domain.item.exception.ItemException;
import com.zucchini.domain.item.repository.ItemDateRepository;
import com.zucchini.domain.item.repository.ItemRepository;
import com.zucchini.domain.reservation.repository.ReservationRepository;
import com.zucchini.domain.room.service.RoomService;
import com.zucchini.domain.user.domain.User;
import com.zucchini.domain.user.repository.UserItemLikeRepository;
import com.zucchini.domain.user.repository.UserRepository;
import com.zucchini.global.exception.UserException;
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
import java.util.NoSuchElementException;
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
    private final ImageRepository imageRepository;
    private final UserItemLikeRepository userItemLikeRepository;
    private final ReservationRepository reservationRepository;
    private final RoomService roomService;
    private final ImageService imageService;

    @Override
    public List<FindItemListResponse> findItemList(String keyword) {
        List<Item> itemList = itemRepository.findItemAllByUser(keyword);

        return itemList.stream().map(
                item -> FindItemListResponse.builder()
                        .no(item.getNo())
                        .title(item.getTitle())
                        .updatedAt(item.getUpdatedAt())
                        .content(item.getContent())
                        .price(item.getPrice())
                        .status(item.getStatus())
                        .image(getItemImage(item.getNo()))
                        .likeCount(userItemLikeRepository.countById_ItemNo(item.getNo()))
                        .categoryList(getCategory(item.getCategoryList()))
                        .view(item.getView())
                        .build()
        ).collect(Collectors.toList());
    }

    private String getItemImage(int itemNo) {
        List<String> imageList = imageService.findImageLinkList(itemNo);
        if (imageList.isEmpty())
            return null;
        return imageList.get(0);
    }

    private List<String> getItemImageList(int itemNo) {
        List<String> imageList = imageService.findImageLinkList(itemNo);
        if (imageList.isEmpty())
            return null;
        return imageList;
    }

    private List<String> getCategory(List<ItemCategory> itemCategoryList) {
        List<String> categoryList = new ArrayList<>();
        for (ItemCategory itemCategory : itemCategoryList) {
            categoryList.add(itemCategory.getCategory().getCategory());
        }
        return categoryList;
    }

    @Override
    public FindItemResponse findItem(int itemNo) {
        Item item = itemRepository.findItemByUser(itemNo);

        if (item == null) {
            throw new NoSuchElementException("상품이 존재하지 않습니다.");
        }

        int likeCount = userItemLikeRepository.countById_ItemNo(itemNo);

        List<String> imageList = getItemImageList(itemNo);


        List<String> categoryList = getCategory(item.getCategoryList());

        List<DateResponse> dateList = new ArrayList<>();

        dateList = item.getDateList().stream().map(
                itemDate -> DateResponse.builder()
                        .date(itemDate.getDate())
                        .status(itemDate.getStatus())
                        .build()
        ).collect(Collectors.toList());

        FindItemResponse.Seller seller = new FindItemResponse.Seller(item.getSeller().getNickname()
                , item.getSeller().getGrade());
        log.info(seller.toString());

        item.viewUp();

        return FindItemResponse.builder()
                .no(item.getNo())
                .title(item.getTitle())
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .content(item.getContent())
                .price(item.getPrice())
                .status(item.getStatus())
                .imageList(imageList)
                .likeCount(likeCount)
                .seller(seller)
                .dateList(dateList)
                .categoryList(categoryList)
                .view(item.getView())
                .build();

    }

    @Override
    public int addItem(ItemRequest item) {
        String currentPrincipalId = getCurrentId();
        User user = userRepository.findById(currentPrincipalId).get();
        List<Date> inputDateList = item.getDateList();

        // inputDateList와 reservatedList의 요소중 하나라도 겹치는게 있으면 예외를 발생시킴
        List<Date> overlapDateList = reservationRepository.findOverlapDatesByUserAndDates(user, inputDateList);

        if (!overlapDateList.isEmpty()) {
            throw new IllegalArgumentException("이미 예약된 날짜가 포함되어 있습니다.");
        }

        Item buildItem = Item.builder()
                .title(item.getTitle())
                .content(item.getContent())
                .price(item.getPrice())
                .seller(userRepository.findById(currentPrincipalId).get())
                .build();

        Item itemEntity = itemRepository.save(buildItem);
        int itemNo = itemEntity.getNo();

        addImage(itemNo, item.getImageList());
        addDate(itemNo, item.getDateList());
        addCategory(itemNo, item.getCategoryList());

        return itemNo;
    }

    private void addImage(int itemNo, List<String> getImageList) {
        List<Image> imageList = new ArrayList<>();

        if (getImageList == null) {
            return;
        }

        for (String image : getImageList) {
            Image buildImage = Image.builder()
                    .itemNo(itemNo)
                    .link(image)
                    .build();
            imageList.add(buildImage);
        }
        imageRepository.saveAll(imageList);
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

        if (getCategoryList == null) {
            return;
        }

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
            throw new NoSuchElementException("존재하지 않는 상품입니다.");
        }
        Item findItem = itemRepository.findById(itemNo).get();

        // 현재 사용자와 아이템 판매자가 동일한지 확인
        if (!findItem.getSeller().getId().equals(getCurrentId())){
            throw new UserException("잘못된 접근입니다. 다른 판매자의 상품을 수정할 수 없습니다.");
        }

        // image 수정
        imageService.modifyImage(itemNo, item.getImageList());

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
            throw new NoSuchElementException("존재하지 않는 상품입니다.");
        }
        Item findItem = itemRepository.findById(itemNo).get();

        // 현재 사용자와 아이템 판매자가 동일한지 확인
        if (!findItem.getSeller().getId().equals(getCurrentId())) {
            throw new UserException("잘못된 접근입니다. 다른 판매자의 상품을 삭제할 수 없습니다.");
        }

        // "거래중"일 경우 삭제 불가능
        if (findItem.getStatus() == 1) {
            throw new IllegalArgumentException("거래 중인 상품은 삭제 불가능합니다.");
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

    @Override
    public void modifyStatusDeal(int itemNo, String buyer) {
        Item item = itemRepository.findById(itemNo).orElseThrow(() -> new NoSuchElementException("존재하지 않는 상품입니다."));

        if (!getCurrentId().equals(item.getSeller().getId())) {
            throw new UserException("다른 판매자의 상품을 예약 처리 할 수 없습니다.");
        }

        if (item.getStatus() != 0) {
            throw new IllegalArgumentException("이미 거래 중이거나 완료된 상품입니다.");
        }

        item.setStatus(1);
        item.setBuyer(userRepository.findById(buyer).orElseThrow(() -> new ItemException("존재하지 않는 구매자입니다.")));
    }

    @Override
    public void modifyStatusConfirmation(int itemNo) {
        Item item = itemRepository.findById(itemNo).orElseThrow(() -> new NoSuchElementException("존재하지 않는 상품입니다."));

        if (!getCurrentId().equals(item.getBuyer().getId())) {
            throw new UserException("본인이 구매한 상품만 구매확정 처리 할 수 있습니다.");
        }

        if (item.getStatus() != 1) {
            throw new IllegalArgumentException("거래 중인 상품이 아닙니다.");
        }

        item.setStatus(2);
        // 구매자 판매자 거래 횟수 증가
        User buyer = item.getBuyer();
        User seller = item.getBuyer();

        buyer.setDealCount();
        seller.setDealCount();
    }

    @Override
    public void modifyStatusCancel(int itemNo) {
        Item item = itemRepository.findById(itemNo).orElseThrow(() -> new NoSuchElementException("존재하지 않는 상품입니다."));

        if (!getCurrentId().equals(item.getSeller().getId())) {
            throw new UserException("다른 판매자의 상품을 거래 취소 할 수 없습니다.");
        }

        if (item.getStatus() != 1) {
            throw new IllegalArgumentException("거래 중인 상품이 아닙니다.");
        }

        item.setStatus(0);
        item.setBuyer(null);
    }

    @Override
    public void modifyDateReservation(int itemNo, Date selectDate) {
        ItemDate itemDate = itemDateRepository.searchItemDateByItemNoAndDate(itemNo, selectDate);
        itemDate.setStatus(1);
    }

    @Override
    public void modifyDateStatus(int sellerNo, Date selectDate) {
        // 구매자 판매 날짜 상태 변경
        int buyerNo = userRepository.findById(getCurrentId()).get().getNo();
        List<ItemDate> buyerItemDateList = itemDateRepository.searchItemDatesByUser(buyerNo, selectDate);
        for (ItemDate itemDate : buyerItemDateList) {
            itemDate.setStatus(2);
        }

        // 판매자 판매 날짜 상태 변경
        List<ItemDate> sellerItemDateList = itemDateRepository.searchItemDatesByUser(sellerNo, selectDate);
        for (ItemDate itemDate : sellerItemDateList) {
            itemDate.setStatus(2);
        }

    }

}
