package com.zucchini.domain.user.service;

import com.zucchini.domain.user.dto.request.AddUserRequest;
import com.zucchini.domain.user.dto.request.EmailCheckRequest;
import com.zucchini.domain.user.dto.request.EmailRequest;
import com.zucchini.domain.user.dto.request.LoginRequest;
import com.zucchini.domain.user.dto.response.FindUserResponse;
import com.zucchini.global.domain.TokenDto;

public interface UserService {

    FindUserResponse findUser(String userId);
    void addUser(AddUserRequest user);
    boolean idCheck(String id);
    void authEmail(EmailRequest request);
    boolean authCheck(EmailCheckRequest request);
    void modifyUser(int userNo);
    void removeUser(int userNo);
    TokenDto login(LoginRequest loginRequest);
    void logout(String accessToken, String id);
    TokenDto reissue(String refreshToken);

}
