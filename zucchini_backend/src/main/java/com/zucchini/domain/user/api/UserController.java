package com.zucchini.domain.user.api;

import com.zucchini.domain.user.dto.request.EmailCheckRequest;
import com.zucchini.domain.user.dto.request.EmailRequest;
import com.zucchini.domain.user.dto.request.LoginRequest;
import com.zucchini.domain.user.exception.UserException;
import com.zucchini.domain.user.service.UserService;
import com.zucchini.domain.user.dto.request.AddUserRequest;
import com.zucchini.global.domain.TokenDto;
import com.zucchini.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
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

    @PostMapping("/logout")
    public void logout(@RequestHeader("Authorization") String accessToken) {
        String id = jwtTokenUtil.getUsername(resolveToken(accessToken));
        userService.logout(resolveToken(accessToken), id);
    }

    private String resolveToken(String accessToken) {
        return accessToken.substring(7);
    }

}
