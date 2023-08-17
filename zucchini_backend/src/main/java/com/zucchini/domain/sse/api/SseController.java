package com.zucchini.domain.sse.api;

import com.zucchini.domain.sse.dto.BuyAlertDto;
import com.zucchini.domain.sse.emitter.SseEmitters;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/sse")
public class SseController {

    private final SseEmitters sseEmitters;

    @GetMapping(value = ("/{conferenceNo}"), produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connect(@PathVariable("conferenceNo") int conferenceNo) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("authentication : " + authentication);
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        log.info("principal.getUsername() : " + principal.getUsername());

        SseEmitter emitter = new SseEmitter();
        sseEmitters.add(emitter, conferenceNo);
        log.info("connect 요청이 들어옴");
        try {
            emitter.send(SseEmitter.event()
                    .name("connect")
                    .data("connected!"));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(emitter);
    }

    @PostMapping("/count/{conferenceNo}")
    public ResponseEntity<String> count(@RequestBody BuyAlertDto buyAlertDto, @PathVariable int conferenceNo) {
        log.info(buyAlertDto.getUserName());
        sseEmitters.count(buyAlertDto.getUserName(), buyAlertDto.getBuy(), conferenceNo);
        return ResponseEntity.ok().build();
    }

}
