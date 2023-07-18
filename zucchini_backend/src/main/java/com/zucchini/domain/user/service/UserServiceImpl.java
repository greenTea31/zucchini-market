package com.zucchini.domain.user.service;

import com.zucchini.domain.user.domain.User;
import com.zucchini.domain.user.dto.request.AddUserRequest;
import com.zucchini.domain.user.dto.request.LoginRequest;
import com.zucchini.domain.user.dto.response.FindUserResponse;
import com.zucchini.domain.user.repository.UserRepository;
import com.zucchini.global.config.jwt.JwtExpirationEnums;
import com.zucchini.global.domain.LogoutAccessTokenRedisRepository;
import com.zucchini.global.domain.RefreshToken;
import com.zucchini.global.domain.RefreshTokenRedisRepository;
import com.zucchini.global.domain.TokenDto;
import com.zucchini.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @Override
    public FindUserResponse findUser(String userId) {
        return null;
    }

    @Override
    public void addUser(AddUserRequest user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user.toEntity());
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
    public void logout() {

    }

}
