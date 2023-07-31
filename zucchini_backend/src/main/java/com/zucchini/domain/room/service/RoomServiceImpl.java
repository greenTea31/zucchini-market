package com.zucchini.domain.room.service;

import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.repository.ItemRepository;
import com.zucchini.domain.report.repository.ReportRepository;
import com.zucchini.domain.room.domain.Message;
import com.zucchini.domain.room.domain.Room;
import com.zucchini.domain.room.domain.RoomUser;
import com.zucchini.domain.room.dto.AddMessageRequest;
import com.zucchini.domain.room.dto.MessageResponse;
import com.zucchini.domain.room.dto.RoomResponse;
import com.zucchini.domain.room.repository.MessageRepository;
import com.zucchini.domain.room.repository.RoomRepository;
import com.zucchini.domain.room.repository.RoomUserRepository;
import com.zucchini.domain.user.domain.User;
import com.zucchini.global.exception.UserException;
import com.zucchini.domain.user.repository.UserRepository;
import com.zucchini.global.config.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomServiceImpl implements RoomService{

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    private final RoomUserRepository roomUserRepository;
    private final MessageRepository messageRepository;
    private final ReportRepository reportRepository;

    private String getCurrentId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails nowLogInDetail = (CustomUserDetails) auth.getPrincipal();
        return nowLogInDetail.getId();
    }

    @Override
    public int addRoom(int itemNo)  {
        String currentPrincipalId = getCurrentId();

        User loginUser = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("잘못된 접근입니다."));
        Item item = itemRepository.findById(itemNo).orElseThrow(() -> new NoSuchElementException("해당 아이템이 없습니다."));
        User seller = item.getSeller();

        // Room 생성
        Room room = Room.builder().item(item).build();

        // RoomUser 생성
        RoomUser roomUser = RoomUser.builder().user(loginUser).room(room).build();
        RoomUser roomUser2 = RoomUser.builder().user(seller).room(room).build();

        // 생성한 것들 저장
        roomRepository.save(room);
        roomUserRepository.save(roomUser);
        roomUserRepository.save(roomUser2);

        // 생긴 방 번호 반환
        return room.getNo();
    }

    // itemNo로 모든 룸을 갖고오고 룸의 item no를 null값으로 수정하는 method 구현
    // report itemno로 다 갖고와서 report의 itemno를 null값으로 바꾸고 room_no는 변경 x
    @Override
    public void changeRoomItemNo(int itemNo) {
        Item item = itemRepository.findById(itemNo).orElseThrow(() -> new IllegalArgumentException("해당 아이템이 없습니다."));
        List<Room> rooms = roomRepository.findAllByItem(item);

        for (Room room : rooms) {
            room.setItem(null);
        }
    }

    @Override
    public List<RoomResponse> findRoomList(int itemNo) {
        // 로그인한 유저의 특정 아이템에 관한 모든 방을 조회
        String currentPrincipalId = getCurrentId();
        int currentPrincipalNo = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("잘못된 접근입니다.")).getNo();

        List<Room> rooms = roomUserRepository.findRoomsByItemNoAndUser(itemNo, currentPrincipalNo);
        List<RoomResponse> roomResponseList = toResponseList(rooms, currentPrincipalNo);
        return roomResponseList;
    }

    private User getOpponent(Item item) {
        // 아이템에서 seller, buyer 확인하고 내 번호랑 다른 유저의 닉네임 반환
        String currentPrincipalId = getCurrentId();
        int currentPrincialNo = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("잘못된 접근입니다.")).getNo();

        if (item.getSeller().getNo() == currentPrincialNo) {
            return item.getBuyer();
        } else {
            return item.getSeller();
        }
    }

    private List<RoomResponse> toResponseList(List<Room> rooms, int currentPrincipalNo) {
        List<RoomResponse> roomResponseList = new ArrayList<>();

        for (Room room : rooms) {
            RoomResponse roomResponse = RoomResponse.builder().build();

            // 그 방에서 작성된 마지막 메세지를 반환함
            Message message = messageRepository.findTopByRoomOrderByCreatedAtDesc(room);
            Item item = room.getItem();

            User opponent = getOpponent(item);

            // 내용과 작성시간은 roomResponse에 그대로 넣음
            roomResponse.setNo(room.getNo());
            roomResponse.setOpponentNickname(opponent.getNickname());
            roomResponse.setOpponentGrade(opponent.getGrade());
            roomResponse.setItemImage(item.getImageList().get(0).getLink());
            roomResponse.setLastMessage(message.getContent());
            roomResponse.setLastMessageCreatedAt(message.getCreatedAt());

             if (room.getItem() != null) {
                 roomResponse.setIsDeleted(true);
             }

            // 마지막 메세지의 보낸 사람이 조회자 본인이면 그 방의 안 읽은 메세지 수는 무조건 0개
            // 아니면 그 방의 메세지중 is_read가 false인 값을 리턴함

            if (message.getSender().getNo() == currentPrincipalNo) {
                roomResponse.setUnreadCount(0);
            } else {
                roomResponse.setUnreadCount(messageRepository.countByRoomAndIsRead(room, false));
            }

            roomResponseList.add(roomResponse);
        }

        return roomResponseList;
    }

    @Override
    public List<RoomResponse> findAllRoomList() {
        // 로그인한 유저의 모든 채팅방을 조회함
        String currentPrincipalId = getCurrentId();
        int currentPrincipalNo = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("잘못된 접근입니다.")).getNo();

        List<Room> rooms = roomUserRepository.findAllRoomsByUser(currentPrincipalNo);
        List<RoomResponse> roomResponseList = toResponseList(rooms, currentPrincipalNo);
        return roomResponseList;
    }

    @Override
    public void removeRoom(int roomNo) {
        roomRepository.deleteById(roomNo);
    }

    @Override
    public void quitRoom(int roomNo) {
        String currentPrincipalId = getCurrentId();

        User user = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("잘못된 접근 입니다."));
        Room room = roomRepository.findById(roomNo).orElseThrow(() -> new IllegalArgumentException("방을 나갈 수 없습니다."));

        roomUserRepository.deleteByRoomAndUser(room, user);

        // 다 나갔으면 방 삭제, 이 방을 신고한 사람이 있으면 삭제하지 않음
        if (roomUserRepository.countByRoom(room) == 0 && !reportRepository.existsByRoomNo(roomNo)) {
            roomRepository.deleteById(roomNo);
        }
    }

    /**
     * 특정 방에 유저를 입장 시키고, 모든 메세지를 불러옵니다.
     * @param roomNo
     */
    @Override
    public List<MessageResponse> findMessageList(int roomNo) {
        String currentPrincipalId = getCurrentId();

        // RoomUser 살펴보면서 접속한 유저가 roomNo에 접속한 유저인지 확인, 확인하면 그 방의 메세지를 반환해주고 아니면 권한 없다는 예외를 발생시킴.
        Room room = roomRepository.findById(roomNo).orElseThrow(() -> new IllegalArgumentException("해당 방이 없습니다."));
        User user = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("잘못된 접근입니다."));
        boolean joined = roomUserRepository.existsByRoomAndUser(room, user);

        if (!joined) {
            throw new UserException("권한이 없습니다.");
        }

        // 내가 들어가면 상대방이 작성한 모든 메세지 읽음 처리
        List<Message> messages = messageRepository.findAllByRoomAndSenderNotAndIsRead(room, user, false);

        for (Message message : messages) {
            message.read();
        }

        List<Message> messageList = messageRepository.findAllByRoom(room);
        List<MessageResponse> messageResponseList = MessageResponse.listOf(messageList);
        return messageResponseList;
    }

    /**
     * 특정 방에 메세지를 추가합니다.
     * @param addMessageRequest(방 번호, 보낸 사람, 내용)
     */
    @Override
    public void addMessage(int roomNo, AddMessageRequest addMessageRequest) {
        // 로그인한 유저 정보 얻어옴
        String currentPrincipalId = getCurrentId();

        // 로그인한 유저가 그 방에 참가해 있는지 RoomUser Table 조회하면서 확인함
        // 참가해있지 않으면 예외 발생시킴
        Room room = roomRepository.findById(roomNo).orElseThrow(() -> new NoSuchElementException("해당 방이 없습니다."));
        User user = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("잘못된 접근입니다."));
        boolean joined = roomUserRepository.existsByRoomAndUser(room, user);

        if (!joined) {
            throw new UserException("권한이 없습니다.");
        }

        // 참가해있으면 Message Table에 추가함
        Message message = Message.builder()
                .room(room)
                .sender(user)
                .content(addMessageRequest.getContent())
                .build();

        messageRepository.save(message);
    }

}
