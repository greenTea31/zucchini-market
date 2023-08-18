package com.zucchini.domain.grade.service;

import com.zucchini.domain.grade.domain.Grade;
import com.zucchini.domain.grade.dto.request.GiveGradeRequest;
import com.zucchini.domain.grade.repository.GradeRepository;
import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.repository.ItemRepository;
import com.zucchini.domain.user.domain.User;
import com.zucchini.domain.user.repository.UserRepository;
import com.zucchini.global.exception.UserException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class GradeServiceImpl implements GradeService{

    private final ItemRepository itemRepository;
    private final GradeRepository gradeRepository;
    private final UserRepository userRepository;

    /**
     * 별점 평가
     * @param giveGradeRequest : 별점 평가 요청 DTO
     */
    @Override
    public void giveGrade(GiveGradeRequest giveGradeRequest) {
        // 어떤 상품에 대하여 점수 매기기가 진행되는지 확인
        Item item = itemRepository.findItemWithFetchJoinById(giveGradeRequest.getItemNo());
        // 상품이 존재하지 않는 경우
        if(item == null) throw new NoSuchElementException("상품이 존재하지 않습니다.");
        // 판매자와 구매자에 해당하는 아이디가 아니면 잘못된 접근
        String graderId = getCurrentId();
        String graderRecipientNickname = giveGradeRequest.getGradeRecipient();
        if(!item.getBuyer().getId().equals(graderId) && !item.getSeller().getId().equals(graderId))
            throw new UserException("해당 상품의 구매자 또는 판매자가 아닌 회원은 별점을 매길 수 없습니다.");
        if(!item.getBuyer().getNickname().equals(graderRecipientNickname) &&
                !item.getSeller().getNickname().equals(graderRecipientNickname))
            throw new UserException("해당 상품의 구매자 또는 판매자가 아닌 회원에게 별점을 매길 수 없습니다.");
        // 판매자에 해당하는지 구매자에 해당하는지에 따라 회원의 아이디 가져오기
        User graderRecipient = (item.getBuyer().getNickname().equals(graderRecipientNickname)) ? item.getBuyer() : item.getSeller();
        // 이미 점수를 매긴 상태면 잘못된 접근
        for (Grade grade : item.getGradeList()) {
            // 해당 아이템에 grade는 총 2개 존재 -> from 구매자 to 사용자 or from 사용자 to 구매자
            // grade의 graderId와 같으면 이미 해당 상품에 대하여 별점을 매긴 상태를 의미함
            // 예외 처리
            if(grade.getGraderId().equals(graderId)) throw new IllegalArgumentException("이미 별점을 매긴 사용자입니다.");
        }
        // 별점 매기는 요청을 한 회원과 매겨지는 회원이 상품 판매자와 구매자와 일치하는지 확인
        // Grade 엔티티 생성 및 연관 관계 설정
        Grade grade = Grade.builder()
                .itemNo(item.getNo())
                .graderId(graderId)
                .gradeRecipientId(graderRecipient.getId())
                .build();
        // Grade 엔티티 저장 (INSERT)
        gradeRepository.save(grade);
        // 별점 갱신
        calculateGrade(graderRecipient, giveGradeRequest.getGrade());
    }

    /**
     * 해당하는 별점 기록 삭제
     */
    @Override
    public void removeGrade(String userId) {
        gradeRepository.deleteAllByUser(userId);
    }

    /**
     * 새로 추가된 별점과 기존 사용자의 별점 합 평균 계산
     * @param user : 별점 받은 회원
     * @param grade : 별점
     */
    private void calculateGrade(User user, float grade) {
        float newGrade = (float)(0.99 * user.getGrade() + grade) / 2;
        user.setGrade(newGrade);
    }

    /**
     * 스프링 시큐리티 인증을 통과하여 저장된 회원의 인증 객체에서 아이디 추출
     * @return String : 아이디
     */
    private String getCurrentId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return principal.getUsername();
    }

}
