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
    public ResponseEntity<Integer> signUp(@Valid @RequestBody AddUserRequest user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<Integer>(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST);
        }

        try {
            userService.addUser(user);
        } catch (UserException e) {
            return new ResponseEntity<Integer>(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Integer>(HttpStatus.CREATED.value(), HttpStatus.CREATED);
    }

    /**
     * 아이디 중복 검사
     */
    @GetMapping("/idCheck/{id}")
    public ResponseEntity<Boolean> idCheck(@PathVariable String id) {
        return ResponseEntity.ok(userService.idCheck(id));
    }

    /**
     * 이메일 인증
     */
    @PostMapping("/email")
    public ResponseEntity<Void> authEmail(@Valid @RequestBody EmailRequest request) {
        userService.authEmail(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/authCheck")
    public ResponseEntity<Boolean> authCheck(@RequestBody EmailCheckRequest request) {
        return ResponseEntity.ok(userService.authCheck(request));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.login(loginRequest));
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestHeader("RefreshToken") String refreshToken) {
        return ResponseEntity.ok(userService.reissue(refreshToken));
    }

    @PostMapping("/logout")
    public void logout(@RequestHeader("Authorization") String accessToken) {
        String id = jwtTokenUtil.getUsername(resolveToken(accessToken));
        userService.logout(resolveToken(accessToken), id);
    }

    private String resolveToken(String accessToken) {
        return accessToken.substring(7);
    }

    /**
     * 회원 정보 조회
     */
    @GetMapping("/{id}")
    public ResponseEntity<FindUserResponse> findUser(@PathVariable String id) {
        return ResponseEntity.ok(userService.findUser(id));
    }

    /**
     * 회원 정보 리스트
     * - ADMIN만 가능
     */
    @GetMapping
    public ResponseEntity<List<FindUserResponse>> findUser() {
        return ResponseEntity.ok(userService.findUserList());
    }



    /**
     * 회원 탈퇴
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@RequestHeader("Authorization") String accessToken, @PathVariable String id) {
        userService.removeUser(resolveToken(accessToken), id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteUser(@RequestHeader("Authorization") String accessToken) {
        userService.removeUser(resolveToken(accessToken), null);
        return ResponseEntity.ok().build();
    }

    /**
     * 회원 정보 수정
     */
//    @PutMapping("/{id}")
//    public ResponseEntity<Integer> modifyUser(@PathVariable String id, @Valid @RequestBody ModifyUserRequest modifyUserRequest, BindingResult bindingResult){
//        if (bindingResult.hasErrors()) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST);
//        }
//        try{
//            userService.modifyUser(id, modifyUserRequest);
//        } catch (IllegalArgumentException e){
//            // 회원이 없는 경우
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND);
//        } catch (UserException e){
//            // 로그인한 아이디와 수정하려는 아이디가 다른 경우
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED);
//        }
//        return new ResponseEntity<>(HttpStatus.OK.value(), HttpStatus.OK);
//    }
    @PutMapping("/{id}")
    public ResponseEntity<Integer> modifyUser(@PathVariable String id, @Valid @RequestBody ModifyUserRequest modifyUserRequest){
        userService.modifyUser(id, modifyUserRequest);
        return new ResponseEntity<>(HttpStatus.OK.value(), HttpStatus.OK);
    }

    /**
     * 비밀번호 변경
     */
    @PostMapping("/password")
    public ResponseEntity<String> modifyPassword(@Valid @RequestBody ModifyPasswordRequest modifyPasswordRequest, BindingResult bindingResult){
        log.info(String.valueOf(modifyPasswordRequest));
        if (bindingResult.hasErrors()) {
            for(FieldError error : bindingResult.getFieldErrors()){
                log.info(error.getDefaultMessage());
            }

            return new ResponseEntity<>("비밀번호 양식이 잘못되었습니다.", HttpStatus.BAD_REQUEST);
        }
        userService.modifyPassword(modifyPasswordRequest.getPassword());

        return ResponseEntity.ok("비밀번호 변경 완료");
    }

    /**
     * 회원의 아이템 찜
     */
    @PostMapping("{id}/item/like/{itemNo}")
    public ResponseEntity<Integer> addLikeItem(@PathVariable String id, @PathVariable int itemNo) {
        try{
            userService.addUserLikeItem(id, itemNo);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK.value(), HttpStatus.OK);
    }

    /**
     * 회원이 찜한 아이템 목록 조회
     */
    @GetMapping("/{id}/item/like")
    public ResponseEntity<List<FindItemListResponse>> findLikeItemList(@PathVariable String id, @RequestParam String keyword) {
        List<FindItemListResponse> userLikeItemList = userService.findUserLikeItemList(id, keyword);
        return new ResponseEntity<>(userLikeItemList, HttpStatus.OK);
    }

    /**
     * 회원의 아이템 찜 취소
     */
    @DeleteMapping("{id}/item/like/{itemNo}")
    public ResponseEntity<Integer> removeLikeItem(@PathVariable String id, @PathVariable int itemNo) {
        try{
            userService.removeUserLikeItem(id, itemNo);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK.value(), HttpStatus.OK);
    }

    /**
     * 거래 내역 조회 (판매)
     */
    @GetMapping("/deal/sell")
    public ResponseEntity<List<UserDealHistoryResponse>> findSellDealHistory() {
        try {
            List<UserDealHistoryResponse> sellDealHistory = userService.findUserDealHistoryList(false);
            return new ResponseEntity<>(sellDealHistory, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 거래 내역 조회 (구매)
     */
    @GetMapping("/deal/buy")
    public ResponseEntity<List<UserDealHistoryResponse>> findBuyDealHistory() {
        try {
            List<UserDealHistoryResponse> buyDealHistory = userService.findUserDealHistoryList(true);
            return new ResponseEntity<>(buyDealHistory, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
