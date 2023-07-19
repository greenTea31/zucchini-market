package com.zucchini.domain.user.service;

import com.zucchini.domain.user.domain.User;
import com.zucchini.domain.user.dto.request.AddUserRequest;
import com.zucchini.domain.user.dto.request.EmailCheckRequest;
import com.zucchini.domain.user.dto.request.EmailRequest;
import com.zucchini.domain.user.dto.request.LoginRequest;
import com.zucchini.domain.user.dto.response.FindUserResponse;
import com.zucchini.domain.user.exception.UserException;
import com.zucchini.domain.user.repository.UserRepository;
import com.zucchini.global.config.cache.CacheKey;
import com.zucchini.global.config.jwt.JwtExpirationEnums;
import com.zucchini.global.domain.*;
import com.zucchini.global.util.JwtTokenUtil;
import com.zucchini.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.NoSuchElementException;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository;
    private final JwtTokenUtil jwtTokenUtil;

    private final JavaMailSender javaMailSender;
    private final RedisUtil redisUtil;

    @Override
    public FindUserResponse findUser(String userId) {
        return null;
    }

    @Override
    public void addUser(AddUserRequest user) {
        if (userRepository.findById(user.getId()).isPresent())
            throw new UserException("이미 등록된 아이디 입니다.");

        if (!authCheck(new EmailCheckRequest(user.getEmail(), user.getAuthKey())))
            throw new UserException("이메일 인증을 다시 해주세요.");

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user.toEntity());
    }

    @Override
    public boolean idCheck(String id) {
        if (userRepository.findById(id).isPresent())
            return false;
        return true;
    }

    @Override
    public void authEmail(EmailRequest request) {
        // 임의의 authKey 생성
        Random random = new Random();
        String authKey = String.valueOf(random.nextInt(888888) + 111111);

        // 이메일 발송
        sendAuthEmail(request.getEmail(), authKey);
    }

    private void sendAuthEmail(String email, String authKey) {
        String subject = "애호박마켓 회원가입 인증번호";
        String text = "회원 가입을 위한 인증번호는 " + authKey + "입니다. <br/>";

        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(text, true); // HTML이라는 의미로 true.
            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            e.printStackTrace();
        }

        // 유효 시간(5분)동안 {email, authKey} 저장
        redisUtil.setDataExpire(email, authKey, 60 * 5L);
    }

    @Override
    public boolean authCheck(EmailCheckRequest request) {
        if (redisUtil.getData(request.getEmail()).equals(request.getAuthKey()))
            return true;
        return false;
    }

    @Override
    public void modifyUser(int userNo) {

    }

    @Override
    public void removeUser(int userNo) {

    }

    @Override
    public TokenDto login(LoginRequest loginRequest) {
        User user = userRepository.findById(loginRequest.getId()).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        checkPassword(loginRequest.getPassword(), user.getPassword());

        String id = user.getId();
        String accessToken = jwtTokenUtil.generateAccessToken(id);
        RefreshToken refreshToken = saveRefreshToken(id);
        return TokenDto.of(accessToken, refreshToken.getRefreshToken());
    }

    private RefreshToken saveRefreshToken(String id) {
        return refreshTokenRedisRepository.save(RefreshToken.createRefreshToken(id,
                jwtTokenUtil.generateRefreshToken(id), JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME.getValue()));
    }

    private void checkPassword(String rawPassword, String findMemberPassword) {
        if (!passwordEncoder.matches(rawPassword, findMemberPassword)) {
            throw new IllegalArgumentException("비밀번호가 맞지 않습니다.");
        }
    }

    @Override
    @CacheEvict(value = CacheKey.USER, key = "#id")
    public void logout(String accessToken, String id) {
        long remainMilliSeconds = jwtTokenUtil.getRemainMilliSeconds((accessToken));
        refreshTokenRedisRepository.deleteById(id);
        logoutAccessTokenRedisRepository.save(LogoutAccessToken.of(accessToken, id, remainMilliSeconds));
    }

}
