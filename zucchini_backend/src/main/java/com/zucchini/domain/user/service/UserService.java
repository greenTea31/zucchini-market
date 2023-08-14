package com.zucchini.domain.user.service;

import com.zucchini.domain.item.dto.response.FindItemListResponse;
import com.zucchini.domain.user.dto.request.*;
import com.zucchini.domain.user.dto.response.FindUserResponse;
import com.zucchini.global.common.PageResponse;
import com.zucchini.global.domain.TokenDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    /**
     * 회원 전체 목록 조회
     * @return List<FindUserResponse> : 상품 조회 DTO 리스트
     */
    List<FindUserResponse> findUserList();

    /**
     * 회원 조회(상대방)
     * @param id : 아이디
     * @return FindUserResponse : 회원 조회 응답 DTO
     */
    FindUserResponse findUser(String id);

    /**
     * 회원 조회(본인)
     * @return FindUserResponse : 회원 조회 응답 DTO
     */
    FindUserResponse findUser();

    /**
     * 회원 가입
     * @param user : 회원가입 요청 DTO
     */
    void addUser(AddUserRequest user);

    /**
     * 아이디 중복 검사
     * @param id : 아이디
     * @return boolean : 중복 여부
     */
    boolean idCheck(String id);

    /**
     * 이메일 인증
     * @param request : 이메일 인증 요청 DTO
     */
    void authEmail(EmailRequest request);

    /**
     * 이메일 인증 검사
     * @param request : 이메일 인증 검사 DTO
     * @return
     */
    boolean authCheck(EmailCheckRequest request);

    /**
     * 회원 정보 수정
     * @param modifyUserRequest : 회원 정보 수정 요청 DTO
     */
    void modifyUser(ModifyUserRequest modifyUserRequest);

    /**
     * 회원 비밀번호 변경
     * @param password : 새 비밀번호
     */
    void modifyPassword(String password);

    /**
     * 회원 탈퇴
     * @param token : Access 토큰
     * @param id : 아이디
     */
    void removeUser(String token, String id);

    /**
     * 로그인
     * @param loginRequest : 로그인 요청 DTO
     * @return TokenDto : Access 토큰, Refresh 토큰을 저장하는 DTO
     */
    TokenDto login(LoginRequest loginRequest);

    /**
     * 로그아웃
     * @param accessToken : JWT 토큰
     * @param id : 아이디
     */
    void logout(String accessToken, String id);

    /**
     * Access 토큰 재발행
     * @param refreshToken : JWT 토큰
     * @return TokenDto : Access 토큰, Refresh 토큰을 저장하는 DTO
     */
    TokenDto reissue(String refreshToken);

    /**
     * 상품 찜 등록
     * @param itemNo : 상품 번호
     */
    void addUserLikeItem(int itemNo);

    /**
     * 찜 목록 조회
     * @param keyword : 검색어
     * @return List<FindItemListResponse> : 상품 목록 조회 DTO 리스트
     */
    List<FindItemListResponse> findUserLikeItemList(String keyword);

    /**
     * 찜 목록 조회(페이징)
     * @param keyword : 검색어
     * @param pageable : 페이지 정보
     * @return PageResponse<FindItemListResponse> : 상품 목록 조회 DTO 리스트
     */
    PageResponse<FindItemListResponse> findUserLikeItemList(String keyword, Pageable pageable, int category);

    /**
     * 상품 찜 취소
     * @param itemNo : 상품 번호
     */
    void removeUserLikeItem(int itemNo);

    /**
     * 거래 내역 조회
     * @param keyword : 검색어
     * @param flag : 상품 분류(구매, 판매)
     * @return List<UserDealHistoryResponse> : 거래 내역 조회 DTO 리스트
     */
    PageResponse<FindItemListResponse> findUserDealHistoryList(String keyword, boolean flag, Pageable pageable, String name, int category);

    /**
     * 닉네임 중복 검사
     * @param nickname
     * @return
     */
    Boolean nicknameCheck(String nickname);

}
