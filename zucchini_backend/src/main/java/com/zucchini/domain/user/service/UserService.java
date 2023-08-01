package com.zucchini.domain.user.service;

import com.zucchini.domain.item.dto.response.FindItemListResponse;
import com.zucchini.domain.user.dto.request.*;
import com.zucchini.domain.user.dto.response.FindUserResponse;
import com.zucchini.domain.user.dto.response.UserDealHistoryResponse;
import com.zucchini.global.domain.TokenDto;

import java.util.List;

public interface UserService {

    List<FindUserResponse> findUserList();
    FindUserResponse findUser(String id);
    void addUser(AddUserRequest user);
    boolean idCheck(String id);
    void authEmail(EmailRequest request);
    boolean authCheck(EmailCheckRequest request);
    void modifyUser(String id, ModifyUserRequest modifyUserRequest);
    void modifyPassword(String password);
    void removeUser(String token, String id);
    TokenDto login(LoginRequest loginRequest);
    void logout(String accessToken, String id);
    TokenDto reissue(String refreshToken);
    void addUserLikeItem(int itemNo);
    List<FindItemListResponse> findUserLikeItemList(String keyword);
    void removeUserLikeItem(int itemNo);

    List<UserDealHistoryResponse> findUserDealHistoryList(String keyword, boolean flag);

}
