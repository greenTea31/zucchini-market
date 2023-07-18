package com.zucchini.zucchini_back.domain.user.service;

import com.zucchini.zucchini_back.domain.user.dto.request.AddUserRequest;
import com.zucchini.zucchini_back.domain.user.dto.request.LoginRequest;
import com.zucchini.zucchini_back.domain.user.dto.response.FindUserResponse;
import com.zucchini.zucchini_back.domain.user.repository.UserRepository;
import com.zucchini.zucchini_back.global.domain.LogoutAccessTokenRedisRepository;
import com.zucchini.zucchini_back.global.domain.RefreshTokenRedisRepository;
import com.zucchini.zucchini_back.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public void login(LoginRequest loginRequest) {

    }

    @Override
    public void logout() {

    }
}
