package com.zucchini.domain.grade.api;

import com.zucchini.domain.grade.dto.request.GiveGradeRequest;
import com.zucchini.domain.grade.service.GradeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/grade")
@Slf4j
public class GradeController {

    private final GradeService gradeService;

    /**
     * 구매자 또는 판매자가 판매자 또는 구매자에게 점수 매기기
     */
    @PostMapping
    public ResponseEntity<Integer> giveGrade(@Valid @RequestBody GiveGradeRequest giveGradeRequest, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST);
        }
        try {
            gradeService.giveGrade(giveGradeRequest);
        } catch (IllegalArgumentException e) {
            log.error("점수 매기기 : " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(HttpStatus.OK.value());
    }

}
