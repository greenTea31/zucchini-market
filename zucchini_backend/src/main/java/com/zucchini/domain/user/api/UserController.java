package com.zucchini.domain.user.api;

import com.zucchini.domain.user.service.UserService;
import com.zucchini.domain.user.dto.request.AddUserRequest;
import com.zucchini.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping
    public String signUp(@RequestBody AddUserRequest user) {
        userService.addUser(user);
        return "회원가입 완료";
    }

}
