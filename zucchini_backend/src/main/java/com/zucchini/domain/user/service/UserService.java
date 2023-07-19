package com.zucchini.domain.user.service;

import com.zucchini.domain.user.dto.request.AddUserRequest;
import com.zucchini.domain.user.dto.request.LoginRequest;
import com.zucchini.domain.user.dto.response.FindUserResponse;
import com.zucchini.global.domain.TokenDto;

public interface UserService {

    FindUserResponse findUser(String userId);
    void addUser(AddUserRequest user);
    void modifyUser(int userNo);
    void removeUser(int userNo);
    TokenDto login(LoginRequest loginRequest);
    void logout(String accessToken, String id);

}
