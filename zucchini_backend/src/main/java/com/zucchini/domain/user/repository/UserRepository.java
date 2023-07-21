package com.zucchini.domain.user.repository;

import com.zucchini.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer>, UserRepositoryCustom {

    Optional<User> findById(String id);

    List<User> findAllByIsDeletedFalseAndAuthorityFalse();

}
