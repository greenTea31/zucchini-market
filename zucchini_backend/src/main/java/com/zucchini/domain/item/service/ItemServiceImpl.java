package com.zucchini.domain.item.service;

import com.zucchini.domain.category.domain.ItemCategory;
import com.zucchini.domain.category.domain.ItemCategoryId;
import com.zucchini.domain.category.repository.ItemCategoryRepository;
import com.zucchini.domain.image.domain.Image;
import com.zucchini.domain.image.repository.ImageRepository;
import com.zucchini.domain.image.service.ImageService;
import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.domain.ItemDate;
import com.zucchini.domain.item.dto.request.AddItemRequest;
import com.zucchini.domain.item.dto.request.ModifyItemRequest;
import com.zucchini.domain.item.dto.response.DateResponse;
import com.zucchini.domain.item.dto.response.FindItemListResponse;
import com.zucchini.domain.item.dto.response.FindItemResponse;
import com.zucchini.domain.item.repository.ItemDateRepository;
import com.zucchini.domain.item.repository.ItemRepository;
import com.zucchini.domain.reservation.repository.ReservationRepository;
import com.zucchini.domain.room.service.RoomService;
import com.zucchini.domain.user.domain.User;
import com.zucchini.domain.user.repository.UserItemLikeRepository;
import com.zucchini.domain.user.repository.UserRepository;
import com.zucchini.global.common.PageResponse;
import com.zucchini.global.exception.UserException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
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

    /**
     * 상품 전체 조회 (페이징)
     * @param category : 카테고리
     * @param keyword : 검색어
     * @param pageable : 페이지 정보
     * @return PageResponse<FindItemListResponse>
     */
    @Override
    @Transactional(readOnly = true)
    public PageResponse<FindItemListResponse> findItemList(String category, String keyword, Pageable pageable) {
        Page<Item> pageItemList = null;
        if(category.equals("")){
            // 카테고리가 비어있는 경우
            pageItemList = itemRepository.findPageItems(keyword, pageable);
        }else{
            // 카테고리가 비어있지 않은 경우
            pageItemList = itemCategoryRepository.findPageItemsByCategory(category, keyword, pageable);
        }
        return new PageResponse<>(pageItemList.getContent().stream().map(
                item -> FindItemListResponse.builder()
                        .no(item.getNo())
                        .title(item.getTitle())
                        .createdAt(item.getCreatedAt())
                        .content(item.getContent())
                        .price(item.getPrice())
                        .status(item.getStatus())
                        .image(getItemImage(item.getNo()))
                        .likeCount(userItemLikeRepository.countById_ItemNo(item.getNo()))
                        .categoryList(getCategory(item.getCategoryList()))
                        .view(item.getView())
                        .build()
        ).collect(Collectors.toList()), pageItemList.getTotalPages());
    }

    /**
     * 상품 대표 이미지 한개 가져오기 (첫번째 이미지)
     * @param itemNo : 아이템 번호 (PK)
     * @return imageList.get(0) : 이미지 링크
     */
    private String getItemImage(int itemNo) {
        List<String> imageList = imageService.findImageLinkList(itemNo);
        // 이미지가 없는 경우 null 반환
        if (imageList.isEmpty())
            return null;
        // 첫 번째 사진 반환
        return imageList.get(0);
    }

    /**
     * 상품 이미지 리스트 가져오기
     * @param itemNo : 아이템 번호 (PK)
     * @return imageList : 이미지 리스트
     */
    private List<String> getItemImageList(int itemNo) {
        List<String> imageList = imageService.findImageLinkList(itemNo);
        // 이미지가 없는 경우 null 반환
        if (imageList.isEmpty())
            return null;
        return imageList;
    }

    /**
     * 카테고리 가져오기
     * @param itemCategoryList : 상품이 속한 카테고리 리스트 (카테고리 Entity)
     * @return categoryList : 상품이 속한 카테고리 리스트(카테고리 String만 포함)
     */
    private List<String> getCategory(List<ItemCategory> itemCategoryList) {
        List<String> categoryList = new ArrayList<>();
        for (ItemCategory itemCategory : itemCategoryList) {
            // 카테고리 String만 가져오기
            categoryList.add(itemCategory.getCategory().getCategory());
        }
        return categoryList;
    }

    /**
     * 상품 상세 조회
     * @param itemNo : 아이템 번호 (PK)
     * @return FindItemResponse : 상품 정보
     */
    @Override
    @Transactional(readOnly = true)
    public FindItemResponse findItem(int itemNo) {
        // 상품 조회
        Item item = itemRepository.findItemByUser(itemNo);

        // 상품이 없을 경우
        if (item == null) {
            throw new NoSuchElementException("상품이 존재하지 않습니다.");
        }

        // 상품 찜 갯수
        int likeCount = userItemLikeRepository.countById_ItemNo(itemNo);

        // 상품 이미지 리스트 링크만 가져오기
        List<String> imageList = getItemImageList(itemNo);

        // 상품 카테고리 리스트 String만 가져오기
        List<String> categoryList = getCategory(item.getCategoryList());

        // 상품 화상 가능 날짜 (날짜, 상태) 가져오기
        List<DateResponse> dateList = item.getDateList().stream().map(
                itemDate -> DateResponse.builder()
                        .date(itemDate.getDate())
                        .status(itemDate.getStatus())
                        .build()
        ).collect(Collectors.toList());

        // 판매자 정보 (닉네임, 별점) 가져오기
        FindItemResponse.Seller seller = new FindItemResponse.Seller(item.getSeller().getNickname()
                , item.getSeller().getGrade());

        // 조회수 증가
        item.viewUp();


        // 현재 로그인한 유저가 이 게시글에 좋아요를 누른 상태인지 확인
        String currentPrincipalId = getCurrentId();
        boolean isLike = false;

        if (!currentPrincipalId.equals("anonymousUser")) {
            User user = userRepository.findById(currentPrincipalId).orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다."));
            isLike = userItemLikeRepository.existsByUserAndItem(user, item);
        }

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
                .isLike(isLike)
                .build();

    }

    /**
     * 상품 등록
     * @param item : 입력된 상품 정보
     * @return itemNo : 생성된 상품 번호(PK)
     */
    @Override
    public int addItem(AddItemRequest item) {
        // 현재 로그인한 회원의 아이디
        String currentPrincipalId = getCurrentId();
        User user = userRepository.findById(currentPrincipalId).get();

        // 화상 가능한 날짜 리스트
        List<Date> inputDateList = item.getDateList();
        if (inputDateList != null) {
            Collections.sort(inputDateList);
        }

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

        // 상품 등록
        Item itemEntity = itemRepository.save(buildItem);
        // 등록된 상품 번호 (PK)
        int itemNo = itemEntity.getNo();

        // 이미지, 화상 가능 날짜, 카테고리 등록
        addImage(itemNo, item.getImageList());
        addDate(itemNo, item.getDateList());
        addCategory(itemNo, item.getCategoryList());

        return itemNo;
    }

    /**
     * 이미지 등록
     * @param itemNo : 상품 번호 (PK)
     * @param getImageList : 등록할 이미지 리스트
     */
    private void addImage(int itemNo, List<String> getImageList) {
        List<Image> imageList = new ArrayList<>();

        // 등록할 이미지가 없는 경우
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

    /**
     * 화상 통화 가능한 날짜 등록
     * @param itemNo : 상품 번호 (PK)
     * @param getDateList : 등록할 날짜 리스트
     */
    private void addDate(int itemNo, List<Date> getDateList) {
        List<ItemDate> dateList = new ArrayList<>();

        // 등록할 날짜가 없는 경우
        if (getDateList == null){
            return;
        }

        for (Date date : getDateList) {
            ItemDate buildDate = ItemDate.builder()
                    .itemNo(itemNo)
                    .date(date)
                    .build();
            dateList.add(buildDate);
        }
        itemDateRepository.saveAll(dateList);
    }

    /**
     * 상품 카테고리 등록
     * @param itemNo : 상품 번호 (PK)
     * @param getCategoryList : 등록할 카테고리 리스트
     */
    private void addCategory(int itemNo, List<Integer> getCategoryList) {
        List<ItemCategory> itemCategoryList = new ArrayList<>();

        // 카테고리가 없는 경우
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

    /**
     * 상품 수정
     * @param itemNo : 상품 번호 (PK)
     * @param item : 수정된 상품 정보
     */
    @Override
    public void modifyItem(int itemNo, ModifyItemRequest item) {
        // itemNo로 아이템 조회
        if (!itemRepository.findById(itemNo).isPresent()) {
            throw new NoSuchElementException("존재하지 않는 상품입니다.");
        }
        Item findItem = itemRepository.findById(itemNo).get();

        // 현재 사용자와 아이템 판매자가 동일한지 확인
        if (!findItem.getSeller().getId().equals(getCurrentId())){
            throw new UserException("잘못된 접근입니다. 다른 판매자의 상품을 수정할 수 없습니다.");
        }

        // date 수정
        removeDate(itemNo);
        addDate(itemNo, item.getDateList());

        findItem.modifyItem(item);
    }

    /**
     * 화상 통화 가능한 날짜 삭제
     * @param itemNo : 상품 번호 (PK)
     */
    private void removeDate(int itemNo) {
        itemDateRepository.deleteByItemNo(itemNo);
    }


    /**
     * 상품 삭제
     * @param itemNo : 상품 번호 (PK)
     */
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

    /**
     * 현재 로그인한 회원의 아이디 가져오기
     * @return principal.getUsername() : 회원 아이디
     */
    private String getCurrentId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 로그인 하지 않은 유저면 String "anonymousUser" 반환
        if (authentication.getPrincipal().equals("anonymousUser")) {
            return "anonymousUser";
        }

        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return principal.getUsername();
    }

    /**
     * 예약, 상품 상태 (판매중 -> 예약중) 변경 (0 -> 1)
     * @param itemNo : 상품 번호 (PK)
     * @param buyer : 구매자 아이디
     */
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
        item.setBuyer(userRepository.findByNickname(buyer).orElseThrow(() -> new NoSuchElementException("존재하지 않는 구매자입니다.")));
    }

    /**
     * 구매 확정, 상품 상태 (예약중 -> 판매완료) 변경 (1 -> 2)
     * @param itemNo : 상품 번호 (PK)
     */
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

    /**
     * 예약 취소, 상품 상태 (예약중 -> 판매중) 변경 (1 -> 0)
     * @param itemNo : 상품 번호 (PK)
     */
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

    /**
     * 상품의 화상 가능 날짜 상태 (가능 -> 예약) 변경 (0 -> 1)
     * @param itemNo : 상품 번호 (PK)
     * @param selectDate : 선택한 날짜
     */
    @Override
    public void modifyDateReservation(int itemNo, Date selectDate) {
        ItemDate itemDate = itemDateRepository.searchItemDateByItemNoAndDate(itemNo, selectDate);
        itemDate.setStatus(1);
    }

    /**
     * 구매자/판매자의 다른 판매 중인 상품 중 중복날짜 상태 (가능 -> 불가능) 변경 (0 -> 2)
     * @param sellerNo : 판매자 번호 (PK)
     * @param selectDate : 선택한 날짜
     */
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
