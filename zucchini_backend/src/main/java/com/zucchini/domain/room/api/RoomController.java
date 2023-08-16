package com.zucchini.domain.room.api;

import com.zucchini.domain.room.dto.*;
import com.zucchini.domain.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/room")
public class RoomController {

    private final RoomService roomService;

    /**
     * 방 생성하는 API
     *
     * @param addRoomRequest : 생성할 방 정보를 담은 요청 객체
     * @return ResponseEntity<Integer> : 생성된 방의 번호와 201 Created 상태코드를 반환함
     *
     * 201 : POST 요청 성공, 리소스 생성 성공
     * 403 : 로그인 없이 요청 시도
     * 404 : 존재하지 않는 아이템에 대한 요청 시도
     */
    @PostMapping
    public ResponseEntity<Integer> addRoom(@Valid @RequestBody AddRoomRequest addRoomRequest) {
        int roomNo = roomService.addRoom(addRoomRequest.getItemNo());
        return ResponseEntity.status(HttpStatus.CREATED).body(roomNo);
    }

    /**
     * 유저의 특정 아이템에 대한 모든 방을 조회하는 API (현재 프론트에서 사용하지 않음)
     *
     * @param itemNo : 아이템 번호
     * @return ResponseEntity<List<RoomResponse>> : 아이템에 대한 모든 방 정보를 담은 RoomResponse 리스트와 200 OK 상태코드를 반환
     *
     * 프론트 미사용이므로 에러코드는 잠시 생략
     */
    @GetMapping("/{itemNo}")
    public ResponseEntity<List<RoomResponse>> getRoomList(@PathVariable int itemNo) {
        List<RoomResponse> rooms = roomService.findRoomList(itemNo);
        return ResponseEntity.ok(rooms);
    }

    /**
     * 방 나가기 API
     *
     * @param roomNo : 방 번호
     * @return ResponseEntity<Void> : 200 OK 상태코드를 반환
     *
     * 200 : DELETE 요청 성공, 유저가 방을 성공적으로 나감
     * 403 : 로그인 없이 요청 시도
     * 404 : 존재하지 않는 방을 나가려고 시도함
     */
    @DeleteMapping("/{roomNo}")
    public ResponseEntity<Void> quitRoom(@PathVariable int roomNo) {
        roomService.quitRoom(roomNo);
        return ResponseEntity.ok().build();
    }

    /**
     * 모든 채팅방 조회 API
     *
     * @return ResponseEntity<List<RoomResponse>> : 모든 방 정보를 담은 RoomResponse 리스트와 200 OK 상태코드를 반환
     *
     * 200 : GET 요청 성공, 로그인한 유저의 모든 방 정보를 성공적으로 불러옴
     * 403 : 로그인 없이 요청 시도
     */
    @GetMapping
    public ResponseEntity<List<RoomResponse>> getRoomList() {
        List<RoomResponse> rooms = roomService.findAllRoomList();
        // 얻어온 모든 방 로그로 조회 system.out.println 말고 로그로
        for (RoomResponse room : rooms) {
            System.out.println(room.getNo());
        }
        return ResponseEntity.ok(rooms);
    }

    /**
     * 특정 방의 모든 채팅 리스트 조회 API
     *
     * @param roomNo : 방 번호
     * @return ResponseEntity<List<MessageResponse>> : 모든 채팅 메시지 정보를 담은 MessageResponse 리스트와 200 OK 상태코드를 반환
     *
     * 200 : GET 요청 성공, 특정 방의 모든 채팅 메시지 정보를 성공적으로 불러옴
     * 403 : 내가 참석하지 않은 방의 채팅 리스트 조회 시도
     * 404 : 존재하지 않는 방에 대한 채팅 리스트 조회 시도
     */
    @GetMapping("/{roomNo}/message")
    public ResponseEntity<List<MessageResponse>> getMessageList(@PathVariable int roomNo) {
        List<MessageResponse> messages = roomService.findMessageList(roomNo);
        return ResponseEntity.ok(messages);
    }

    /**
     * 특정 방에 메시지를 추가하는 API
     *
     * @param roomNo           : 방 번호
     * @param addMessageRequest : 추가할 메시지 정보를 담은 요청 객체
     * @return ResponseEntity<Integer> : 201 Created 상태코드를 반환
     */
//    @PostMapping("/{roomNo}/message")
//    public ResponseEntity<Integer> addMessage(@PathVariable int roomNo, @Valid @RequestBody AddMessageRequest addMessageRequest) {
//        roomService.addMessage(roomNo, addMessageRequest);
//        return ResponseEntity.status(HttpStatus.CREATED).build();
//    }

    /**
     * 특정 방과 관련된 상품 정보 가져오기
     * @param roomNo
     * @return RoomItemResponse : 채팅창에 필요한 상품 정보
     */
    @GetMapping("/item/{roomNo}")
    public ResponseEntity<RoomItemResponse> getRoomItem(@PathVariable int roomNo) {
        return ResponseEntity.ok(roomService.getRoomItem(roomNo));
    }

    /**
     * 특정 방의 채팅 상대방 정보 가져오기
     * @param roomNo : 방 번호
     * @return RoomUserResponse : 채팅 상대방의 정보
     */
    @GetMapping("/user/{roomNo}")
    public ResponseEntity<RoomUserResponse> getRoomUser(@PathVariable int roomNo) {
        return ResponseEntity.ok(roomService.findRoomUser(roomNo));
    }

    // 상대방 닉네임, 내 닉네임, itemNo 보고 confernece 있으면 true, 아니면 false 리턴해주는 api

}
