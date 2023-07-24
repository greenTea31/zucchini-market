package com.zucchini.domain.room.service;

import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.repository.ItemRepository;
import com.zucchini.domain.room.domain.Room;
import com.zucchini.domain.room.domain.RoomUser;
import com.zucchini.domain.room.dto.RoomResponse;
import com.zucchini.domain.room.repository.RoomRepository;
import com.zucchini.domain.room.repository.RoomUserRepository;
import com.zucchini.domain.user.domain.User;
import com.zucchini.domain.user.exception.UserException;
import com.zucchini.domain.user.repository.UserRepository;
import com.zucchini.global.config.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomServiceImpl implements RoomService{

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    private final RoomUserRepository roomUserRepository;

    @Override
    public int addRoom(int itemNo) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null) {
            throw new UserException("방 생성은 로그인 이후에 가능합니다.");
        }

        CustomUserDetails nowLogInDetail = (CustomUserDetails) auth.getPrincipal();
        String currentPrincipalId = nowLogInDetail.getId();

        User loginUser = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("방 생성은 로그인 이후에 가능합니다."));
        Item item = itemRepository.findById(itemNo).orElseThrow(() -> new IllegalArgumentException("해당 아이템이 없습니다."));
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

    @Override
    public List<RoomResponse> findRoomList(int itemNo) {
        // 로그인한 유저의 특정 아이템에 관한 모든 방을 조회
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null) {
            throw new UserException("채팅 조회는 로그인 이후에 가능합니다.");
        }

        CustomUserDetails nowLogInDetail = (CustomUserDetails) auth.getPrincipal();
        String currentPrincipalId = nowLogInDetail.getId();
        int currentPrincipalNo = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("채팅 조회는 로그인 이후에 가능합니다.")).getNo();

        List<Room> rooms = roomUserRepository.findRoomsByItemNoAndUser(itemNo, currentPrincipalNo);
        List<RoomResponse> roomResponses = RoomResponse.listOf(rooms);
        return roomResponses;
    }

    @Override
    public List<RoomResponse> findAllRoomList() {
        // 로그인한 유저의 특정 아이템에 관한 모든 방을 조회
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null) {
            throw new UserException("채팅 조회는 로그인 이후에 가능합니다.");
        }

        CustomUserDetails nowLogInDetail = (CustomUserDetails) auth.getPrincipal();
        String currentPrincipalId = nowLogInDetail.getId();
        int currentPrincipalNo = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("채팅 조회는 로그인 이후에 가능합니다.")).getNo();

        List<Room> rooms = roomUserRepository.findAllRoomsByUser(currentPrincipalNo);
        List<RoomResponse> roomResponses = RoomResponse.listOf(rooms);
        return roomResponses;
    }

    @Override
    public void removeRoom(int roomNo) {
        roomRepository.deleteById(roomNo);
    }

    @Override
    public void quitRoom(int roomNo) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null) {
            throw new UserException("채팅 나가기는 로그인 이후에 가능합니다.");
        }

        CustomUserDetails nowLogInDetail = (CustomUserDetails) auth.getPrincipal();
        String currentPrincipalId = nowLogInDetail.getId();

        User user = userRepository.findById(currentPrincipalId).orElseThrow(() -> new UserException("채팅 나가기는 로그인 이후에 가능합니다."));
        Room room = roomRepository.findById(roomNo).orElseThrow(() -> new IllegalArgumentException("방을 나갈 수 없습니다."));

        roomUserRepository.deleteByRoomAndUser(room, user);

        // 다 나갔으면 방 삭제
        if (roomUserRepository.countByRoom(room) == 0) {
            roomRepository.deleteById(roomNo);
        }
    }

}
