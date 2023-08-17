package com.zucchini.domain.item.api;

import com.zucchini.domain.category.dto.response.FindCategoryResponse;
import com.zucchini.domain.category.service.CategoryService;
import com.zucchini.domain.item.dto.request.AddItemRequest;
import com.zucchini.domain.item.dto.request.ModifyItemRequest;
import com.zucchini.domain.item.dto.response.FindItemListResponse;
import com.zucchini.domain.item.dto.response.FindItemResponse;
import com.zucchini.domain.item.service.ItemService;
import com.zucchini.global.common.PageResponse;
import com.zucchini.global.common.PageSizeEnums;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/item")
public class ItemController {

    private final ItemService itemService;
    private final CategoryService categoryService;

    @GetMapping("/category")
    public ResponseEntity<List<FindCategoryResponse>> findCategoryList(){
        return ResponseEntity.ok(categoryService.findCategoryList());
    }

    /**
     * 상품 전체 조회 (페이징)
     * @param category
     * @param keyword
     * @param page
     * @return
     * 200 : 조회 성공
     * 500 : 서버 에러
     */
    @GetMapping
    public ResponseEntity<PageResponse<FindItemListResponse>> findItem(@RequestParam String category, @RequestParam String keyword, @RequestParam int page) {
        // page - 1 하는 이유 -> querydsl에서 페이지는 0부터 시작함
        Pageable pageable = PageRequest.of(page-1, PageSizeEnums.ITEM_PAGE_SIZE.getValue());
        return ResponseEntity.ok(itemService.findItemList(category, keyword, pageable));
    }

    /**
     * 상품 상세 조회
     * @param itemNo : 아이템 번호 (PK)
     * @return FindItemResponse : 상품 정보
     * 200 :조회 성공
     * 404 : 대상 없음
     * 500 : 서버 에러
     */
    @GetMapping("/{itemNo}")
    public ResponseEntity<FindItemResponse> findItem(@PathVariable int itemNo) {
        return ResponseEntity.ok(itemService.findItem(itemNo));
    }

    /**
     * 상품 등록
     * @param item : 입력된 상품 정보
     * @return itemNo : 생성된 상품 번호(PK)
     * 201 : 등록 성공
     * 400 : 잘못된 요청 (필수 값이 채워지지 않거나 이상한 값 입력, 날짜 중복)
     * 403 : 권한 없음 (로그인 하지 않음)
     * 500 : 서버 에러
     */
    @PostMapping
    public ResponseEntity<Integer> addItem(@Valid @ModelAttribute AddItemRequest item) {
        int itemNo = itemService.addItem(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(itemNo);
    }

    /**
     * 상품 수정
     * @param itemNo : 상품 번호 (PK)
     * @param item : 수정된 상품 정보
     * @return
     * 200 : 수정 성공
     * 400 : 잘못된 요청
     * 403 : 권한 없음 (로그인 하지 않음, 본인의 상품이 아님)
     * 404 : 대상 없음
     * 500 : 서버 에러
     */
    @PutMapping("/{itemNo}")
    public ResponseEntity<Void> modifyItem(@PathVariable int itemNo, @Valid @RequestBody ModifyItemRequest item) {
        itemService.modifyItem(itemNo, item);
        return ResponseEntity.ok().build();
    }

    /**
     * 상품 삭제
     * @param itemNo : 상품 번호 (PK)
     * @return
     * 200 : 삭제 성공
     * 400 : 거래중인 상품 삭제 불가능
     * 403 : 권한 없음 (로그인하지 않음, 본인의 상품이 아님)
     * 404 : 대상 없음
     * 500 : 서버 에러
     */
    @DeleteMapping("/{itemNo}")
    public ResponseEntity<Void> removeItem(@PathVariable int itemNo) {
        itemService.removeItem(itemNo);
        return ResponseEntity.ok().build();
    }

    /**
     * 예약, 상품 상태 (판매중 -> 예약중) 변경 (0 -> 1)
     * @param itemNo : 상품 번호 (PK)
     * @param buyer : 구매자 아이디
     * @return
     * 200 : 상태 변경 성공
     * 400 : 이미 거래중이거나 완료된 상품
     * 403 : 권한 없음 (로그인하지 않음, 본인의 상품이 아님)
     * 404 : 대상 없음
     * 500 : 서버 에러
     */
    @PutMapping("/{itemNo}/deal")
    public ResponseEntity<Void> dealItem(@PathVariable int itemNo, @RequestParam String buyer) {
        itemService.modifyStatusDeal(itemNo, buyer);
        return ResponseEntity.ok().build();
    }

    /**
     * 구매 확정, 상품 상태 (예약중 -> 판매완료) 변경 (1 -> 2)
     * @param itemNo : 상품 번호 (PK)
     * @return
     * 200 : 상태 변경 성공
     * 400 : 거래중인 상품 아님
     * 403 : 권한 없음 (로그인하지 않음, 본인의 상품이 아님)
     * 404 : 대상 없음
     * 500 : 서버 에러
     */
    @PutMapping("/{itemNo}/confirmation")
    public ResponseEntity<Void> confirmationItem(@PathVariable int itemNo) {
        itemService.modifyStatusConfirmation(itemNo);
        return ResponseEntity.ok().build();
    }

    /**
     * 예약 취소, 상품 상태 (예약중 -> 판매중) 변경 (1 -> 0)
     * @param itemNo : 상품 번호 (PK)
     * @return
     * 200 : 상태 변경 성공
     * 400 : 거래중인 상품 아님
     * 403 : 권한 없음 (로그인하지 않음, 본인의 상품이 아님)
     * 404 : 대상 없음
     * 500 : 서버 에러
     */
    @PutMapping("/{itemNo}/cancel")
    public ResponseEntity<Void> cancelItem(@PathVariable int itemNo) {
        itemService.modifyStatusCancel(itemNo);
        return ResponseEntity.ok().build();
    }

}
