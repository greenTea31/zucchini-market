package com.zucchini.zucchini_back.domain.user.repository;

import com.zucchini.zucchini_back.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findById(String id);

}
