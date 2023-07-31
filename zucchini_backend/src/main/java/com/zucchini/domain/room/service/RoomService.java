package com.zucchini.domain.room.service;

import com.zucchini.domain.room.dto.AddMessageRequest;
import com.zucchini.domain.room.dto.MessageResponse;
import com.zucchini.domain.room.dto.RoomResponse;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface RoomService {
    /**
     * 아이템 번호와 구매자 사용자 아이디를 받아 새로운 방을 생성합니다.
     *
     * @param itemNo 아이템 번호
     * @return Http Status, 생성된 방의 번호(생성 성공시)
     */
    int addRoom(int itemNo);

    /**
     * 주어진 아이템 번호와 구매자 사용자 아이디에 해당하는 방을 찾습니다.
     *
     * @param itemNo 아이템 번호
     * @return 해당 방의 정보
     */
//    Room findRoom(int itemNo);

    /**
     * 접속한 유저의 모든 방을 조회합니다.
     */
    List<RoomResponse> findAllRoomList();

    /**
     * 주어진 방 번호에 해당하는 방을 삭제합니다.
     * @param roomNo 방 번호
     */
    void removeRoom(int roomNo);

    /**
     * 주어진 사용자와 관련된 모든 방을 조회합니다.
     *
     * @return 사용자와 관련된 방의 목록
     */
    List<RoomResponse> findRoomList(int itemNo);

    /**
     *
     * @param roomNo
     * 특정 방에서 유저를 퇴장시킵니다.
     */
    void quitRoom(int roomNo);

    /**
     * 특정 방에 유저를 입장 시키고, 모든 메세지를 불러옵니다.
     * @param roomNo
     */
    List<MessageResponse> findMessageList(int roomNo);

    /**
     * 특정 방에 메세지를 추가합니다.
     * @param addMessageRequest(방 번호, 보낸 사람, 내용)
     */
    void addMessage(int roomNo, AddMessageRequest addMessageRequest);

    void changeRoomItemNo(int itemNo);

}