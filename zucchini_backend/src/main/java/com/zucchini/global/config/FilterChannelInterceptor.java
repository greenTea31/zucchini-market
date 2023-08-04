//package com.zucchini.global.config;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.core.Ordered;
//import org.springframework.core.annotation.Order;
//import org.springframework.messaging.Message;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.simp.stomp.StompCommand;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.support.ChannelInterceptor;
//import org.springframework.messaging.support.MessageHeaderAccessor;
//import org.springframework.stereotype.Component;
//
//import java.nio.charset.StandardCharsets;
//import java.security.Key;
//
//
//@Component
//@Order(Ordered.HIGHEST_PRECEDENCE + 99)
//public class FilterChannelInterceptor implements ChannelInterceptor {
//    @Value("${jwt.secret}")
//    private String secret;
//
//    private Key getSigningKey(String secretKey) {
//        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
//        return Keys.hmacShaKeyFor(keyBytes);
//    }
//    @Override
//    public Message<?> preSend(Message<?> message, MessageChannel channel) {
//        StompHeaderAccessor headerAccessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
//
//        assert headerAccessor != null;
//        if (headerAccessor.getCommand() == StompCommand.CONNECT) { // 연결 시에한 header 확인
//            String token = String.valueOf(headerAccessor.getNativeHeader("Authorization").get(0));
//            token = token.replace("Bearer ", "");
//
//            try {
////                Claims claims = Jwts.parser()
////                        .setSigningKey(secret.getBytes(StandardCharsets.UTF_8))
////                        .parseClaimsJws(token)
////                        .getBody();
//
//                Claims claims = Jwts.parserBuilder()
//                        .setSigningKey(getSigningKey(secret))
//                        .build()
//                        .parseClaimsJws(token)
//                        .getBody();
//
//                Integer userId = claims.get("id", Integer.class);
//
//                headerAccessor.addNativeHeader("User", String.valueOf(userId));
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
//        return message;
//    }
//}
