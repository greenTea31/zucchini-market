package com.zucchini.domain.grade.api;

import com.zucchini.domain.grade.dto.request.GiveGradeRequest;
import com.zucchini.domain.grade.service.GradeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
     * 상품의 구매자 또는 판매자가 상대방 별점 평가
     * @param giveGradeRequest : 별점 평가 요청 DTO
     * @return
     * 201 : 별점 등록 성공
     * 400 : 별점 평가 양식 잘못된 경우
     * 401 : 로그인 안함
     * 403 : 별점 평가 권한 없음
     * 404 : 상품이 존재하지 않음
     * 500 : 서버 내 에러
     */
    @PostMapping
    public ResponseEntity<Void> giveGrade(@Valid @RequestBody GiveGradeRequest giveGradeRequest){
        gradeService.giveGrade(giveGradeRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
