package com.zucchini.domain.room.service;

import com.zucchini.domain.image.service.ImageService;
import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.domain.ItemDate;
import com.zucchini.domain.item.dto.response.DateResponse;
import com.zucchini.domain.item.dto.response.FindItemResponse;
import com.zucchini.domain.item.repository.ItemRepository;
import com.zucchini.domain.report.repository.ReportRepository;
import com.zucchini.domain.room.domain.Message;
import com.zucchini.domain.room.domain.Room;
import com.zucchini.domain.room.domain.RoomUser;
import com.zucchini.domain.room.dto.*;
import com.zucchini.domain.room.repository.MessageRepository;
import com.zucchini.domain.room.repository.RoomRepository;
import com.zucchini.domain.room.repository.RoomUserRepository;
import com.zucchini.domain.user.domain.User;
import com.zucchini.global.exception.UserException;
import com.zucchini.domain.user.repository.UserRepository;
import com.zucchini.global.config.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RoomServiceImpl implements RoomService{

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    private final RoomUserRepository roomUserRepository;
    private final MessageRepository messageRepository;
    private final ReportRepository reportRepository;
    private final ImageService imageService;

    /**
     * 현재 로그인한 유저의 ID를 반환하는 메소드
     * @return String : 현재 로그인한 유저의 ID
     */
    private String getCurrentId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails nowLogInDetail = (CustomUserDetails) auth.getPrincipal();
        return nowLogInDetail.getId();
    }

    /**
     * 특정 아이템을 거래하기 위한 채팅방을 추가하는 메소드
     * @param itemNo 아이템 번호
     * @return int : 생성된 방 번호
     */
    @Override
    public int addRoom(int itemNo)  {
        String currentPrincipalId = getCurrentId();

        User loginUser = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("잘못된 접근입니다."));
        Item item = itemRepository.findById(itemNo).orElseThrow(() -> new NoSuchElementException("해당 아이템이 없습니다."));
        User seller = item.getSeller();

        Room findRoom = roomRepository.findByItemAndUser(itemNo, loginUser);
        if (findRoom != null) {
            return findRoom.getNo();
        }

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

    /**
     * 특정 아이템과 관련된 모든 채팅방의 아이템 번호를 초기화하는 메소드.
     *
     * @param itemNo 아이템 번호
     */
    @Override
    public void changeRoomItemNo(int itemNo) {
        Item item = itemRepository.findById(itemNo).orElseThrow(() -> new IllegalArgumentException("해당 아이템이 없습니다."));
        List<Room> rooms = roomRepository.findAllByItem(item);

        for (Room room : rooms) {
            room.setItem(null);
        }
    }

    /**
     * 특정 아이템과 관련된 채팅방 목록을 조회하는 메소드입니다. (프론트에서 현재 미사용)
     *
     * @param itemNo 아이템 번호
     * @return 아이템과 관련된 채팅방 목록
     */
    @Override
    public List<RoomResponse> findRoomList(int itemNo) {
        // 로그인한 유저의 특정 아이템에 관한 모든 방을 조회
        String currentPrincipalId = getCurrentId();
        int currentPrincipalNo = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("잘못된 접근입니다.")).getNo();

        List<Room> rooms = roomUserRepository.findRoomsByItemNoAndUser(itemNo, currentPrincipalNo);
        List<RoomResponse> roomResponseList = toResponseList(rooms, currentPrincipalNo);
        return roomResponseList;
    }

    /**
     * 채팅방에 참가한 상대방의 정보 가져오기
     * @param roomNo : 채팅방 번호
     * @return RoomUserResponse : 채팅방에 참가한 상대방의 정보
     */
    public RoomUserResponse findRoomUser(int roomNo) {
        String currentPrincipalId = getCurrentId();
        int currentPrincialNo = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("잘못된 접근입니다.")).getNo();
        log.info("currentPrincipalNo : {}", currentPrincialNo);

        // 방 번호를 입력받아 그 방에 속한 유저들중 자신이 아닌 사람을 반환합니다.
        User user = roomUserRepository.findOpponentByRoomAndUser(roomNo, currentPrincialNo);

        RoomUserResponse roomUserResponse = RoomUserResponse.builder()
                .opponentNickname(user.getNickname())
                .opponentGrade(user.getGrade())
                .build();

        log.info("roomUserResponse : {}", roomUserResponse);

        return roomUserResponse;
    }

    /**
     * room을 입력받아 현재 로그인한 유저의 거래 상대자가 누군지 파악합니다.
     * @param room
     * @return User : 현재 로그인한 유저의 거래 상대자
     */
    private User getOpponent(Room room) {
        // 아이템에서 seller, buyer 확인하고 내 번호랑 다른 유저의 닉네임 반환
        // 아 채팅만 하고있는데 getOpponent를 어떻게 알아....
        String currentPrincipalId = getCurrentId();
        int currentPrincialNo = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("잘못된 접근입니다.")).getNo();
        log.info("currentPrincipalNo : {}", currentPrincialNo);

        // 방 번호를 입력받아 그 방에 속한 유저들중 자신이 아닌 사람을 반환합니다.
        User user = roomUserRepository.findOpponentByRoomAndUser(room.getNo(), currentPrincialNo);
        log.info("user : {}", user);
        return user;
    }

    /**
     * Room Entity List를 Room 반환 객체의 List로 변환하는 메소드입니다.
     * @param rooms : Room Entity List
     * @param currentPrincipalNo : 현재 로그인한 유저의 번호
     * @return List<RoomResponse> : 채팅방 목록을 보여주는 리스트
     */
    private List<RoomResponse> toResponseList(List<Room> rooms, int currentPrincipalNo) {
        List<RoomResponse> roomResponseList = new ArrayList<>();

        for (Room room : rooms) {
            RoomResponse roomResponse = RoomResponse.builder().build();

            // 그 방에서 작성된 마지막 메세지를 반환함
            Message message = messageRepository.findTopByRoomOrderByCreatedAtDesc(room);

            // 그 방에서 작성된 메세지가 없으면 방 목록에 보여주지 않음
            if (message == null) continue;
            Item item = room.getItem();

            User opponent = getOpponent(room);
            String opponentNickName = opponent.getNickname();

            String itemImageLink = null; // 기본값을 null로 설정
            if (item != null && item.getImageList() != null && !item.getImageList().isEmpty()) {
                itemImageLink = item.getImageList().get(0).getLink();
            }

            // 내용과 작성시간은 roomResponse에 그대로 넣음
            roomResponse.setNo(room.getNo());
            roomResponse.setOpponentNickname(opponent.getNickname() != null ? opponent.getNickname() : "나간 상대방입니다.");
            roomResponse.setOpponentGrade(opponent.getGrade());
            roomResponse.setItemImage(itemImageLink);
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

    /**
     * 로그인한 유저의 모든 채팅방을 조회하는 메소드입니다.
     *
     * @return 로그인한 유저의 모든 채팅방 목록
     */
    @Override
    public List<RoomResponse> findAllRoomList() {
        // 로그인한 유저의 모든 채팅방을 조회함
        String currentPrincipalId = getCurrentId();
        int currentPrincipalNo = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("잘못된 접근입니다.")).getNo();
        List<Room> rooms = roomUserRepository.findAllRoomsByUser(currentPrincipalNo);
        List<RoomResponse> roomResponseList = toResponseList(rooms, currentPrincipalNo);
        Collections.sort(roomResponseList, (o1, o2) -> o2.getLastMessageCreatedAt().compareTo(o1.getLastMessageCreatedAt()));
        return roomResponseList;
    }

    /**
     * 특정 채팅방을 삭제하는 메소드입니다 (현재 미사용)
     *
     * @param roomNo 삭제할 채팅방 번호
     */
    @Override
    public void removeRoom(int roomNo) {
        roomRepository.deleteById(roomNo);
    }

    /**
     * 특정 채팅방을 나가는 메소드입니다.
     *
     * @param roomNo 채팅방 번호
     */
    @Override
    public void quitRoom(int roomNo) {
        String currentPrincipalId = getCurrentId();

        User user = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("잘못된 접근 입니다."));
        Room room = roomRepository.findById(roomNo).orElseThrow(() -> new NoSuchElementException("방을 나갈 수 없습니다."));

        roomUserRepository.deleteByRoomAndUser(room, user);

        // 다 나갔으면 방 삭제, 이 방을 신고한 사람이 있으면 삭제하지 않음
        if (roomUserRepository.countByRoom(room) == 0 && !reportRepository.existsByRoomNo(roomNo)) {
            roomRepository.deleteById(roomNo);
        }
    }

    /**
     * 특정 채팅방에 입장하여 해당 방의 모든 메시지를 조회하는 메소드입니다.
     *
     * @param roomNo 채팅방 번호
     * @return 해당 채팅방의 모든 메시지 목록
     */
    @Override
    @Transactional(readOnly = true)
    public List<MessageResponse> findMessageList(int roomNo) {
        String currentPrincipalId = getCurrentId();

        // RoomUser 살펴보면서 접속한 유저가 roomNo에 접속한 유저인지 확인, 확인하면 그 방의 메세지를 반환해주고 아니면 권한 없다는 예외를 발생시킴.
        Room room = roomRepository.findById(roomNo).orElseThrow(() -> new NoSuchElementException("해당 방이 없습니다."));
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
     * 특정 채팅방에 메시지를 추가하는 메소드입니다.
     *
     * @param roomNo            채팅방 번호
     * @param addMessageRequest 메시지 정보 (채팅방 번호, 보낸 사람, 내용)
     */
    @Override
    public void addMessage(int roomNo, AddMessageRequest addMessageRequest, boolean isJoined) {
        // 로그인한 유저 정보 얻어옴

        // 로그인한 유저가 그 방에 참가해 있는지 RoomUser Table 조회하면서 확인함
        // 참가해있지 않으면 예외 발생시킴
        Room room = roomRepository.findById(roomNo).orElseThrow(() -> new NoSuchElementException("해당 방이 없습니다."));
        User user = userRepository.findById(addMessageRequest.getSenderNo()).orElseThrow(() -> new UserException("잘못된 접근입니다."));

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

        if (isJoined) {
            message.read();
        }

        messageRepository.save(message);
    }

    /**
     * 특정 방과 관련된 상품 정보 가져오기
     * @param roomNo
     * @return RoomItemResponse : 채팅창에 필요한 상품 정보
     */
    @Override
    @Transactional(readOnly = true)
    public RoomItemResponse getRoomItem(int roomNo) {
        Item item = roomRepository.findItemByRoom(roomNo);

        RoomItemResponse.Seller seller = new RoomItemResponse.Seller(item.getSeller().getNickname()
                , item.getSeller().getGrade());

        RoomItemResponse roomItemResponse = RoomItemResponse.builder()
                .no(item.getNo())
                .title(item.getTitle())
                .price(item.getPrice())
                .image(getItemImage(item.getNo()))
                .seller(seller)
                .dateList(getItemDate(item.getDateList()))
                .build();

        return roomItemResponse;
    }

    /**
     * 상품 대표 이미지 한개 가져오기 (첫번째 이미지)
     * @param itemNo : 아이템 번호 (PK)
     * @return imageList.get(0) : 이미지 링크
     */
    @Transactional(readOnly = true)
    private String getItemImage(int itemNo) {
        List<String> imageList = imageService.findImageLinkList(itemNo);
        // 이미지가 없는 경우 null 반환
        if (imageList.isEmpty())
            return null;
        // 첫 번째 사진 반환
        return imageList.get(0);
    }

    private List<DateResponse> getItemDate(List<ItemDate> itemDateList) {
        List<DateResponse> dateList = itemDateList.stream().map(
                itemDate -> DateResponse.builder()
                        .date(itemDate.getDate())
                        .status(itemDate.getStatus())
                        .build()
        ).collect(Collectors.toList());
        return dateList;
    }

}
