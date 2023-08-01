package com.zucchini.domain.item.api;

import com.zucchini.domain.item.dto.request.ItemRequest;
import com.zucchini.domain.item.dto.response.FindItemListResponse;
import com.zucchini.domain.item.dto.response.FindItemResponse;
import com.zucchini.domain.item.service.ItemService;
import lombok.RequiredArgsConstructor;
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

    @GetMapping
    public ResponseEntity<List<FindItemListResponse>> findItem(@RequestParam String keyword) {
        return ResponseEntity.ok(itemService.findItemList(keyword));
    }

    @GetMapping("/{itemNo}")
    public ResponseEntity<FindItemResponse> findItem(@PathVariable int itemNo) {
        return ResponseEntity.ok(itemService.findItem(itemNo));
    }

    @PostMapping("/add")
    public ResponseEntity<Integer> addItem(@Valid @RequestBody ItemRequest item) {
        int itemNo = itemService.addItem(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(itemNo);
    }

    @PutMapping("/{itemNo}")
    public ResponseEntity<Void> modifyItem(@PathVariable int itemNo, @Valid @RequestBody ItemRequest item) {
        itemService.modifyItem(itemNo, item);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{itemNo}")
    public ResponseEntity<Void> removeItem(@PathVariable int itemNo) {
        itemService.removeItem(itemNo);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{itemNo}/deal")
    public ResponseEntity<Void> dealItem(@PathVariable int itemNo, @RequestParam String buyer) {
        itemService.modifyStatusDeal(itemNo, buyer);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{itemNo}/confirmation")
    public ResponseEntity<Void> confirmationItem(@PathVariable int itemNo) {
        itemService.modifyStatusConfirmation(itemNo);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{itemNo}/cancel")
    public ResponseEntity<Void> cancelItem(@PathVariable int itemNo) {
        itemService.modifyStatusCancel(itemNo);
        return ResponseEntity.ok().build();
    }

}
