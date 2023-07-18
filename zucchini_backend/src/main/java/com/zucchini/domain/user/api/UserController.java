package com.zucchini.domain.user.api;

import com.zucchini.domain.user.dto.request.LoginRequest;
import com.zucchini.domain.user.exception.UserException;
import com.zucchini.domain.user.service.UserService;
import com.zucchini.domain.user.dto.request.AddUserRequest;
import com.zucchini.global.domain.TokenDto;
import com.zucchini.global.util.JwtTokenUtil;
import jdk.jfr.internal.Repository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.login(loginRequest));
    }

}
