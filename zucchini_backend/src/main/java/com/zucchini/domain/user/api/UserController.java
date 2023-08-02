package com.zucchini.domain.user.api;

import com.zucchini.domain.item.dto.response.FindItemListResponse;
import com.zucchini.domain.user.dto.request.*;
import com.zucchini.domain.user.dto.response.FindUserResponse;
import com.zucchini.domain.user.dto.response.UserDealHistoryResponse;
import com.zucchini.domain.user.service.UserService;
import com.zucchini.global.domain.TokenDto;
import com.zucchini.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    /**
     * 회원가입
     * @param user : 회원
     * @return
     * 201 : 회원 가입 성공
     * 400 : 회원 가입 양식 잘못된 경우
     * 403 : 이메일 인증 미완
     * 500 : 서버 내 에러
     */
    @PostMapping
    public ResponseEntity<Void> signUp(@Valid @RequestBody AddUserRequest user) {
        userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /**
     * 아이디 중복 검사
     * @param id : 아이디
     * @return Boolean : 중복 여부
     * 200 : 중복 검사 성공
     * 500 : 서버 내 에러
     */
    @GetMapping("/idCheck/{id}")
    public ResponseEntity<Boolean> idCheck(@PathVariable String id) {
        return ResponseEntity.ok(userService.idCheck(id));
    }

    /**
     * 이메일 인증
     * @param request : 이메일 인증 요청 DTO
     * @return
     * 200 : 인증 메일 전송 성공
     * 400 : 이메일 인증 요청 양식 잘못됨
     * 500 : 서버 내 에러
     */
    @PostMapping("/email")
    public ResponseEntity<Void> authEmail(@Valid @RequestBody EmailRequest request) {
        userService.authEmail(request);
        return ResponseEntity.ok().build();
    }

    /**
     * 이메일 인증 검사
     * @param request : 이메일 인증 검사 요청 DTO
     * @return Boolean : 인증 성공 여부
     * 200 : 인증 검사 성공
     * 400 : 인증 검사 요청 양식 잘못됨
     * 500 : 서버 내 에러
     */
    @PostMapping("/authCheck")
    public ResponseEntity<Boolean> authCheck(@Valid @RequestBody EmailCheckRequest request) {
        return ResponseEntity.ok(userService.authCheck(request));
    }

    /**
     * 로그인
     * @param loginRequest : 로그인 요청 DTO
     * @return TokenDto : Access 토큰, Refresh 토큰 저장 DTO
     * 200 : 로그인 성공
     * 400 : 로그인 양식 잘못됨 or 로그인 실패
     * 404 : 로그인 시도 시 입력한 아이디의 회원이 존재하지 않음
     * 500 : 서버 내 에러
     */
    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.login(loginRequest));
    }

    /**
     * 토큰 재발급
     * @param refreshToken : Refresh 토큰
     * @return TokenDto : Access 토큰, Refresh 토큰 저장 DTO
     * 200 : 토큰 재발급 성공
     * 500 : 서버 내 에러
     */
    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestHeader("RefreshToken") String refreshToken) {
        return ResponseEntity.ok(userService.reissue(refreshToken));
    }

    /**
     * 로그아웃
     * @param accessToken : Access 토큰
     * @return
     * 200 : 로그아웃 성공
     * 500 : 서버 내 에러
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String accessToken) {
        String id = jwtTokenUtil.getUsername(resolveToken(accessToken));
        userService.logout(resolveToken(accessToken), id);
        return ResponseEntity.ok().build();
    }

    /**
     * 문자열에서 토큰 추출
     * @param accessToken
     * @return String : Bearer를 분리한 토큰 값
     */
    private String resolveToken(String accessToken) {
        return accessToken.substring(7);
    }

    /**
     * 회원 정보 조회
     * @param id - 아이디
     * @return FindUserResponse - 조회한 회원 정보를 저장한 응답 DTO
     * 200 : 회원 조회 성공
     * 404 : 회원이 존재하지 않음
     * 500 : 서버 내 에러
     */
    @GetMapping("/{id}")
    public ResponseEntity<FindUserResponse> findUser(@PathVariable String id) {
        return ResponseEntity.ok(userService.findUser(id));
    }

    /**
     * 전체 회원 목록 조회
     * @return List<FindUserResponse> - 조회한 회원 DTO 리스트
     * 200 : 전체 회원 조회 성공
     * 500 : 서버 내 에러
     */
    @GetMapping
    public ResponseEntity<List<FindUserResponse>> findUser() {
        return ResponseEntity.ok(userService.findUserList());
    }

    /**
     * 회원 강제 탈퇴(관리자)
     * @param accessToken : Access 토큰
     * @param id : 아이디
     * @return
     * 200 : 회원 탈퇴 성공
     * 404 : 회원이 존재하지 않음
     * 500 : 서버 내 에러
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@RequestHeader("Authorization") String accessToken, @PathVariable String id) {
        userService.removeUser(resolveToken(accessToken), id);
        return ResponseEntity.ok().build();
    }

    /**
     * 회원 탈퇴(본인)
     * @param accessToken : Access 토큰
     * @return
     * 200 : 회원 탈퇴 성공
     * 500 : 서버 내 에러
     */
    @DeleteMapping
    public ResponseEntity<Void> deleteUser(@RequestHeader("Authorization") String accessToken) {
        userService.removeUser(resolveToken(accessToken), null);
        return ResponseEntity.ok().build();
    }

    /**
     * 회원 정보 수정
     * @param id : 아이디
     * @param modifyUserRequest : 회원 정보 수정 요청 DTO
     * @return
     * 200 : 회원 정보 수정 성공
     * 400 : 회원 정보 수정 양식 잘못됨
     * 500 : 서버 내 에러
     */
    @PutMapping("/{id}")
    public ResponseEntity<Void> modifyUser(@PathVariable String id, @Valid @RequestBody ModifyUserRequest modifyUserRequest){
        userService.modifyUser(id, modifyUserRequest);
        return ResponseEntity.ok().build();
    }

    /**
     * 회원 비밀번호 변경
     * @param modifyPasswordRequest : 비밀번호 변경 요청 DTO
     * @return
     * 200 : 회원 비밀번호 변경 성공
     * 400 : 회원 비밀번호 변경 양식 잘못됨
     * 500 : 서버 내 에러
     */
    @PostMapping("/password")
    public ResponseEntity<Void> modifyPassword(@Valid @RequestBody ModifyPasswordRequest modifyPasswordRequest){
        log.info(String.valueOf(modifyPasswordRequest));
        userService.modifyPassword(modifyPasswordRequest.getPassword());

        return ResponseEntity.ok().build();
    }

    /**
     * 상품 찜 등록
     * @param itemNo : 상품 번호
     * @return
     * 200 : 찜 등록 성공
     * 404 : 회원이 존재하지 않음
     * 500 : 서버 내 에러
     */
    @PostMapping("/item/like/{itemNo}")
    public ResponseEntity<Void> addLikeItem(@PathVariable int itemNo) {
        userService.addUserLikeItem(itemNo);
        return ResponseEntity.ok().build();
    }

    /**
     * 상품 찜 목록 조회
     * @param keyword : 검색어
     * @return List<FindItemListResponse> : 상품 찜 목록 조회 응답 DTO 리스트
     * 200 : 찜 목록 조회 성공
     * 500 : 서버 내 에러
     */
    @GetMapping("/item/like")
    public ResponseEntity<List<FindItemListResponse>> findLikeItemList(@RequestParam String keyword) {
        List<FindItemListResponse> userLikeItemList = userService.findUserLikeItemList(keyword);
        return ResponseEntity.ok(userLikeItemList);
    }

    /**
     * 상품 찜 취소
     * @param itemNo : 상품 번호
     * @return
     * 200 : 찜 취소 성공
     * 500 : 서버 내 에러
     */
    @DeleteMapping("/item/like/{itemNo}")
    public ResponseEntity<Void> removeLikeItem(@PathVariable int itemNo) {
        userService.removeUserLikeItem(itemNo);
        return ResponseEntity.ok().build();
    }

    /**
     * 판매 내역 조회
     * @param keyword : 검색어
     * @return List<UserDealHistoryResponse> : 거래 내역 응답 DTO 리스트
     * 200 : 판매 내역 조회 성공
     * 404 : 회원 존재하지 않음
     * 500 : 서버 내 에러
     */
    @GetMapping("/deal/sell")
    public ResponseEntity<List<UserDealHistoryResponse>> findSellDealHistory(@RequestParam String keyword) {
        List<UserDealHistoryResponse> sellDealHistory = userService.findUserDealHistoryList(keyword, false);
        return ResponseEntity.ok(sellDealHistory);
    }

    /**
     * 구매 내역 조회
     * @param keyword : 검색어
     * @return List<UserDealHistoryResponse> : 거래 내역 응답 DTO 리스트
     * 200 : 구매 내역 조회 성공
     * 404 : 회원 존재하지 않음
     * 500 : 서버 내 에러
     */
    @GetMapping("/deal/buy")
    public ResponseEntity<List<UserDealHistoryResponse>> findBuyDealHistory(@RequestParam String keyword) {
        List<UserDealHistoryResponse> buyDealHistory = userService.findUserDealHistoryList(keyword, true);
        return ResponseEntity.ok(buyDealHistory);
    }

}
