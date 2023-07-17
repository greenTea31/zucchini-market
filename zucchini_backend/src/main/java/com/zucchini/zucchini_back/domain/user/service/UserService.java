package com.zucchini.zucchini_back.domain.user.service;

import com.zucchini.zucchini_back.domain.user.dto.request.AddUserRequest;
import com.zucchini.zucchini_back.domain.user.dto.request.LoginRequest;
import com.zucchini.zucchini_back.domain.user.dto.response.FindUserResponse;

import java.util.List;

public interface UserService {

    FindUserResponse findUser(String userId);
    void addUser(AddUserRequest user);
    void modifyUser(int userNo);
    void removeUser(int userNo);
    void login(LoginRequest loginRequest);
    void logout();

}
