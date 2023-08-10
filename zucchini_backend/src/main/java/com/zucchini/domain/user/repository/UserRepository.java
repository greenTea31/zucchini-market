package com.zucchini.domain.user.repository;

import com.zucchini.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer>, UserRepositoryCustom {

    /**
     * 회원 조회
     * @param id : 아이디
     * @return Optional<User> : 회원
     */
    Optional<User> findById(String id);

    /**
     * 관리자가 아니고 탈퇴된 회원이 아닌 회원을 모두 조회
     * @return List<User> : 회원 목록
     */
    List<User> findAllByIsDeletedFalseAndAuthorityFalse();

    /**
     * 닉네임으로 유저 조회
     * @param nickname
     * @return
     */
    Optional<User> findByNickname(String nickname);

}
