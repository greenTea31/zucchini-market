package com.zucchini.domain.room.api;

import com.zucchini.domain.room.dto.AddMessageRequest;
import com.zucchini.domain.room.dto.AddRoomRequest;
import com.zucchini.domain.room.dto.MessageResponse;
import com.zucchini.domain.room.dto.RoomResponse;
import com.zucchini.domain.room.service.RoomService;
import com.zucchini.domain.user.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/room")
public class RoomController {

    private final RoomService roomService;

    // 방 생성, item_no를 입력받는다
    @PostMapping
    public ResponseEntity<Integer> addRoom(@RequestBody AddRoomRequest addRoomRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST);
        }

        try {
            int roomNo = roomService.addRoom(addRoomRequest.getItemNo());
            return ResponseEntity.status(HttpStatus.CREATED).body(roomNo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(-1);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 유저의 특정 아이템에 대한 모든 방을 불러옴
    @GetMapping("/{itemNo}")
    public ResponseEntity<List<RoomResponse>> getRoomList(@PathVariable int itemNo) {
        try {
            List<RoomResponse> rooms = roomService.findRoomList(itemNo);
            return ResponseEntity.ok(rooms);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 방을 나감
    @DeleteMapping("/{roomNo}")
    public ResponseEntity<Void> quitRoom(@PathVariable int roomNo) {
        try {
            roomService.quitRoom(roomNo);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 채팅하고 있는 모든 방 리스트를 불러옴
    @GetMapping
    public ResponseEntity<List<RoomResponse>> getRoomList() {
        try {
            List<RoomResponse> rooms = roomService.findAllRoomList();
            return ResponseEntity.ok(rooms);
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 특정 방의 모든 채팅 리스트를 불러옴
    @GetMapping("/{roomNo}/message")
    public ResponseEntity<List<MessageResponse>> getMessageList(@PathVariable int roomNo) {
        try {
            List<MessageResponse> messages = roomService.findMessageList(roomNo);
            return ResponseEntity.ok(messages);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 특정 방에 메세지를 추가함
    @PostMapping("/{roomNo}/message")
    public ResponseEntity<Integer> addMessage(@PathVariable int roomNo, @RequestBody AddMessageRequest addMessageRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST);
        }

        try {
            roomService.addMessage(roomNo, addMessageRequest);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
