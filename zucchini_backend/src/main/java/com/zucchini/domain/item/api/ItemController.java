package com.zucchini.domain.item.api;

import com.zucchini.domain.item.dto.response.FindItemListResponse;
import com.zucchini.domain.item.dto.response.FindItemResponse;
import com.zucchini.domain.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/item")
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

}
