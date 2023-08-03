//package com.zucchini.global.config;
//
//import org.springframework.core.Ordered;
//import org.springframework.core.annotation.Order;
//import org.springframework.messaging.Message;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.simp.stomp.StompCommand;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.support.ChannelInterceptor;
//import org.springframework.messaging.support.MessageHeaderAccessor;
//
//import static org.springframework.security.config.Elements.JWT;
//
//@Order(Ordered.HIGHEST_PRECEDENCE + 99)
//public class FilterChannelInterceptor implements ChannelInterceptor {
//    @Override
//    public Message<?> preSend(Message<?> message, MessageChannel channel) {
//        StompHeaderAccessor headerAccessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
//
//        assert headerAccessor != null;
//        if (headerAccessor.getCommand() == StompCommand.CONNECT) { // 연결 시에한 header 확인
//            String token = String.valueOf(headerAccessor.getNativeHeader("Authorization").get(0));
//            token = token.replace("Bearer ", "");
//
//        }
//
//        JWT.require
//        return message;
//    }
//
//}
