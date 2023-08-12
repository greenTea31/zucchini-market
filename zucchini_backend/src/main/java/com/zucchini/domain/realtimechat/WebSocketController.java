package com.zucchini.domain.realtimechat;

import com.zucchini.domain.room.dto.AddMessageRequest;
import com.zucchini.domain.room.dto.MessageResponse;
import com.zucchini.domain.room.service.RoomService;
import com.zucchini.domain.user.domain.User;
import com.zucchini.domain.user.repository.UserRepository;
import com.zucchini.global.config.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Date;
import java.util.NoSuchElementException;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequiredArgsConstructor
@Slf4j
public class WebSocketController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final UserRepository userRepository;
    private final RoomService roomService;
    private final ConcurrentHashMap<Integer, Integer> roomUserCount = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Integer> sessionRoomMapping = new ConcurrentHashMap<>();

//    @EventListener(SessionConnectEvent.class)
//    public void onConnect(SessionConnectEvent event){
//        String sessionId = event.getMessage().getHeaders().get("simpSessionId").toString();
//        String userId = event.getMessage().getHeaders().get("nativeHeaders").toString().split("User=\\[")[1].split("]")[0];
//
//        sessions.put(sessionId, Integer.valueOf(userId));
//    }

    /**
     * 유저가 채팅방에 들어오면 채팅방 인원수를 증가시키고, 세션 id를 저장함.
     * @param event : 세션 연결 정보
     */
    @EventListener
    public void handleSessionConnect(SessionConnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        log.info("sessionId: {}", sessionId);
        String temp = accessor.getNativeHeader("headerNo").get(0); // roomNo 헤더에서 값을 얻음
        int roomNo = Integer.parseInt(temp);
        sessionRoomMapping.put(sessionId, roomNo);
        roomUserCount.put(roomNo, roomUserCount.getOrDefault(roomNo, 0) + 1);
        log.info("연결 : roomUserCount: {}", roomUserCount.get(roomNo));
        if (roomUserCount.get(roomNo) == 2) {
            simpMessagingTemplate.convertAndSend("/sub/chat/readStatus/" + roomNo, true);
        }
    }

    /**
     * 유저가 채팅방에서 나가면 채팅방 인원수를 감소시키고, 세션 id를 삭제함.
     * @param event : 세션 종료 정보
     */
    @EventListener
    public void handleSessionDisconnect(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        int roomNo = sessionRoomMapping.get(sessionId);
        roomUserCount.put(roomNo, roomUserCount.getOrDefault(roomNo, 0) - 1);
        sessionRoomMapping.remove(sessionId);
        log.info("sessionId: {}", sessionId);
        log.info("연결 해제 : roomUserCount: {}", roomUserCount.get(roomNo));
    }

    /**
     * 실시간 메시징 처리, 메세지를 받아서 참가자들에게 보내줌
     * 메세지 들어오면 정말 해당 방에 권한이 있는지까지 체크해야 하는데 일단은 보류, 권한 없으면 방에 못들어갔을테니
     * isRead값 어떻게 처리할지도 고려해야 함, 나갔다 들어오면 갱신이 되긴 하는데 켜져있을때 갱신이 현재 안됨
     * 아니 생각해보니 sendMessage에서 db에 저장하면 되는거 아닌가? 뭐하러 post 요청을 한번 더보내지?
     * @param chatMessage : 방 번호와 메시지 내용이 들어있는 요청 객체
     * @param accessor : WebSocket의 세션 정보를 담고 있는 객체? 어따쓰는지 모르겠음
     */
    @MessageMapping("/chat")
    public void sendMessage(AddMessageRequest chatMessage, SimpMessageHeaderAccessor accessor) {
        // request가 들어오면 적절한 repsonse 형태로 변경하고 사용자들에게 반환함
        User user = userRepository.findById(chatMessage.getSenderNo()).orElseThrow(() -> new NoSuchElementException("해당 사용자가 없습니다."));
        System.out.println(chatMessage.getContent() + "\n");
        log.info("sender : " + chatMessage.getSenderNo() + ", content : " + chatMessage.getContent());

        // 채팅방에 안들어가도 기본값이 1임 이유는 모르겠음
        boolean readCheck = roomUserCount.get(chatMessage.getRoomNo()) == 2;
        roomService.addMessage(chatMessage.getRoomNo(), chatMessage, readCheck);

        MessageResponse messageResponse = MessageResponse.builder()
                .roomNo(chatMessage.getRoomNo())
                .sender(user.getNickname())
                .senderNo(chatMessage.getSenderNo())
                .content(chatMessage.getContent())
                .isRead(readCheck)
                .createdAt(new Date())
                .build();


        simpMessagingTemplate.convertAndSend("/sub/chat/" + chatMessage.getRoomNo(), messageResponse);
    }

    /**
     * 현재 로그인한 사용자의 id를 반환하는 메소드
     * @return String : 현재 로그인한 사용자의 id
     */
    private String getCurrentId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails nowLogInDetail = (CustomUserDetails) auth.getPrincipal();
        return nowLogInDetail.getId();
    }

}
