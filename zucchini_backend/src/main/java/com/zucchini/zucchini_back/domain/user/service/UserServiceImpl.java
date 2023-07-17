package com.zucchini.zucchini_back.domain.user.service;

import com.zucchini.zucchini_back.domain.user.dto.request.AddUserRequest;
import com.zucchini.zucchini_back.domain.user.dto.request.LoginRequest;
import com.zucchini.zucchini_back.domain.user.dto.response.FindUserResponse;

public class UserServiceImpl implements UserService {
    @Override
    public FindUserResponse findUser(String userId) {
        return null;
    }

    @Override
    public void addUser(AddUserRequest user) {

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
