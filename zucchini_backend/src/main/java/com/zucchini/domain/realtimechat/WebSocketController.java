package com.zucchini.domain.realtimechat;

import com.zucchini.domain.room.dto.AddMessageRequest;
import com.zucchini.domain.room.dto.MessageResponse;
import com.zucchini.global.config.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    /**
     * 실시간 메시징 처리, 메세지를 받아서 참가자들에게 보내줌
     * 메세지 들어오면 정말 해당 방에 권한이 있는지까지 체크해야 하는데 일단은 보류, 권한 없으면 방에 못들어갔을테니
     * isRead값 어떻게 처리할지도 고려해야 함, 나갔다 들어오면 갱신이 되긴 하는데 켜져있을때 갱신이 현재 안됨
     * @param chatMessage : 방 번호와 메시지 내용이 들어있는 요청 객체
     * @param accessor : WebSocket의 세션 정보를 담고 있는 객체? 어따쓰는지 모르겠음
     */
    @MessageMapping("/chat")
    public void sendMessage(AddMessageRequest chatMessage, SimpMessageHeaderAccessor accessor) {
        // request가 들어오면 적절한 repsonse 형태로 변경하고 사용자들에게 반환함
//        String sender = getCurrentId();

        // 랜덤으로 0이나 1 값 생성
        int random = (int) (Math.random() * 2);
        String sender = "SSAFY";
        if (random == 0) {
            sender = "SSSAFY";
        }
        System.out.println("메세지 전달은 받았음\n");
        System.out.println(chatMessage.getContent() + "\n");

        MessageResponse messageResponse = MessageResponse.builder()
                .roomNo(chatMessage.getRoomNo())
                .sender(sender)
                .content(chatMessage.getContent())
                .isRead(true)
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
