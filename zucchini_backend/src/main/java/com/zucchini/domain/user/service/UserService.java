package com.zucchini.domain.user.service;

import com.zucchini.domain.user.dto.request.*;
import com.zucchini.domain.user.dto.response.FindUserResponse;
import com.zucchini.global.domain.TokenDto;

public interface UserService {

    FindUserResponse findUser(String id);
    void addUser(AddUserRequest user);
    boolean idCheck(String id);
    void authEmail(EmailRequest request);
    boolean authCheck(EmailCheckRequest request);
    void modifyUser(int no, ModifyUserRequest modifyUserRequest);
    void modifyPassword(String password);
    void removeUser(String token, String id);
    TokenDto login(LoginRequest loginRequest);
    void logout(String accessToken, String id);
    TokenDto reissue(String refreshToken);

}
