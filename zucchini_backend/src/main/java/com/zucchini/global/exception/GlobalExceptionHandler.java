package com.zucchini.global.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.nio.file.AccessDeniedException;
import java.util.NoSuchElementException;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     *  javax.validation.Valid or @Validated 으로 binding error 발생시 발생한다.
     *  HttpMessageConverter 에서 등록한 HttpMessageConverter binding 못할경우 발생
     *  주로 @RequestBody, @RequestPart 어노테이션에서 발생
     */
    @ExceptionHandler(IllegalArgumentException.class)
    protected ResponseEntity<Integer> handleIllegalArgumentException(IllegalArgumentException e) {
        log.error("handleIllegalArgumentException", e);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST);
    }

    /**
     * Authentication 객체가 필요한 권한을 보유하지 않은 경우 발생합
     */
    @ExceptionHandler(AccessDeniedException.class)
    protected ResponseEntity<Integer> handleAccessDeniedException(AccessDeniedException e) {
        log.error("handleAccessDeniedException", e);
        return new ResponseEntity<>(HttpStatus.FORBIDDEN.value(), HttpStatus.FORBIDDEN);
    }

    /**
     * 대상이 없는 경우 발생함.
     */
    @ExceptionHandler(NoSuchElementException.class)
    protected ResponseEntity<Integer> handleNoSuchElementException(NoSuchElementException e) {
        log.error("handleNoSuchElementException", e);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND);
    }

    /**
     * 로그인 안한 경우, 자기 자신이 아닌 경우 등 유저와 관련된 에러 처리
     */
    @ExceptionHandler(UserException.class)
    protected ResponseEntity<Integer> handleUserException(UserException e) {
        log.error("handleUserException", e);
        return new ResponseEntity<>(HttpStatus.FORBIDDEN.value(), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<Integer> handleException(Exception e) {
        log.error("handleException", e);
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}