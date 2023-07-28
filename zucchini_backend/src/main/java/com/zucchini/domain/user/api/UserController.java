package com.zucchini.domain.user.api;

import com.zucchini.domain.item.dto.response.FindItemListResponse;
import com.zucchini.domain.user.dto.request.*;
import com.zucchini.domain.user.dto.response.FindUserResponse;
import com.zucchini.domain.user.dto.response.UserDealHistoryResponse;
import com.zucchini.global.exception.UserException;
import com.zucchini.domain.user.service.UserService;
import com.zucchini.global.domain.TokenDto;
import com.zucchini.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {

    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping
    public ResponseEntity<Void> signUp(@Valid @RequestBody AddUserRequest user) {
        userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /**
     * 아이디 중복 검사
     */
    @GetMapping("/idCheck/{id}")
    public ResponseEntity<Boolean> idCheck(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.idCheck(id));
    }

    /**
     * 이메일 인증
     */
    @PostMapping("/email")
    public ResponseEntity<Void> authEmail(@Valid @RequestBody EmailRequest request) {
        userService.authEmail(request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/authCheck")
    public ResponseEntity<Boolean> authCheck(@RequestBody EmailCheckRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.authCheck(request));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.login(loginRequest));
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestHeader("RefreshToken") String refreshToken) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.reissue(refreshToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String accessToken) {
        String id = jwtTokenUtil.getUsername(resolveToken(accessToken));
        userService.logout(resolveToken(accessToken), id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    private String resolveToken(String accessToken) {
        return accessToken.substring(7);
    }

    /**
     * 회원 정보 조회
     */
    @GetMapping("/{id}")
    public ResponseEntity<FindUserResponse> findUser(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findUser(id));
    }

    /**
     * 회원 정보 리스트
     * - ADMIN만 가능
     */
    @GetMapping
    public ResponseEntity<List<FindUserResponse>> findUser() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findUserList());
    }



    /**
     * 회원 탈퇴
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@RequestHeader("Authorization") String accessToken, @PathVariable String id) {
        userService.removeUser(resolveToken(accessToken), id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteUser(@RequestHeader("Authorization") String accessToken) {
        userService.removeUser(resolveToken(accessToken), null);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    /**
     * 회원 정보 수정
     */
    @PutMapping("/{id}")
    public ResponseEntity<Void> modifyUser(@PathVariable String id, @Valid @RequestBody ModifyUserRequest modifyUserRequest){
        userService.modifyUser(id, modifyUserRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    /**
     * 비밀번호 변경
     */
    @PostMapping("/password")
    public ResponseEntity<Void> modifyPassword(@Valid @RequestBody ModifyPasswordRequest modifyPasswordRequest){
        log.info(String.valueOf(modifyPasswordRequest));
        userService.modifyPassword(modifyPasswordRequest.getPassword());

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    /**
     * 회원의 아이템 찜
     */
    @PostMapping("{id}/item/like/{itemNo}")
    public ResponseEntity<Void> addLikeItem(@PathVariable String id, @PathVariable int itemNo) {
        userService.addUserLikeItem(id, itemNo);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    /**
     * 회원이 찜한 아이템 목록 조회
     */
    @GetMapping("/{id}/item/like")
    public ResponseEntity<List<FindItemListResponse>> findLikeItemList(@PathVariable String id, @RequestParam String keyword) {
        List<FindItemListResponse> userLikeItemList = userService.findUserLikeItemList(id, keyword);
        return ResponseEntity.status(HttpStatus.OK).body(userLikeItemList);
    }

    /**
     * 회원의 아이템 찜 취소
     */
    @DeleteMapping("{id}/item/like/{itemNo}")
    public ResponseEntity<Void> removeLikeItem(@PathVariable String id, @PathVariable int itemNo) {
        userService.removeUserLikeItem(id, itemNo);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    /**
     * 거래 내역 조회 (판매)
     */
    @GetMapping("/deal/sell")
    public ResponseEntity<List<UserDealHistoryResponse>> findSellDealHistory() {
        List<UserDealHistoryResponse> sellDealHistory = userService.findUserDealHistoryList(false);
        return ResponseEntity.status(HttpStatus.OK).body(sellDealHistory);
    }

    /**
     * 거래 내역 조회 (구매)
     */
    @GetMapping("/deal/buy")
    public ResponseEntity<List<UserDealHistoryResponse>> findBuyDealHistory() {
        List<UserDealHistoryResponse> buyDealHistory = userService.findUserDealHistoryList(true);
        return ResponseEntity.status(HttpStatus.OK).body(buyDealHistory);
    }

}
