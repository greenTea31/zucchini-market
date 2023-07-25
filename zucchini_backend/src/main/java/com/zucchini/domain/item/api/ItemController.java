package com.zucchini.domain.item.api;

import com.zucchini.domain.item.dto.request.ItemRequest;
import com.zucchini.domain.item.dto.response.FindItemListResponse;
import com.zucchini.domain.item.dto.response.FindItemResponse;
import com.zucchini.domain.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/item")
@Slf4j
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    public ResponseEntity<List<FindItemListResponse>> findItem() {
        return ResponseEntity.ok(itemService.findItemList());
    }

    @GetMapping("/{itemNo}")
    public ResponseEntity<FindItemResponse> findItem(@PathVariable int itemNo) {
        return ResponseEntity.ok(itemService.findItem(itemNo));
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addItem(@RequestBody ItemRequest item) {
        itemService.addItem(item);
        return null;
    }

    @DeleteMapping("/{itemNo}")
    public ResponseEntity<Void> removeItem(@PathVariable int itemNo) {
        itemService.removeItem(itemNo);
        return null;
    }

}
