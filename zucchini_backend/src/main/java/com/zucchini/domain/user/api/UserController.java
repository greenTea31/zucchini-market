package com.zucchini.domain.user.api;

import com.zucchini.domain.user.dto.request.*;
import com.zucchini.domain.user.dto.response.FindUserResponse;
import com.zucchini.domain.user.exception.UserException;
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
     * 마이페이지
     */
    @GetMapping("/{id}")
    public ResponseEntity<FindUserResponse> findUser(@PathVariable String id) {
        return ResponseEntity.ok(userService.findUser(id));
    }

    // 회원 탈퇴 요청을 받는 메소드
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@RequestHeader("Authorization") String accessToken, @PathVariable String id) {
        userService.removeUser(accessToken, id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteUser(@RequestHeader("Authorization") String accessToken) {
        userService.removeUser(accessToken, null);
        return ResponseEntity.ok().build();
    }

    /**
     * 회원 정보 수정
     */
    @PutMapping("/{no}")
    public ResponseEntity<Integer> modifyUser(@PathVariable int no, @Valid @RequestBody ModifyUserRequest modifyUserRequest, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST);
        }
        try{
            userService.modifyUser(no, modifyUserRequest);
        } catch (IllegalArgumentException e){
            // 회원이 없는 경우
            return new ResponseEntity<>(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND);
        } catch (UserException e){
            // 로그인한 아이디와 수정하려는 아이디가 다른 경우
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED);
        }
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

}
