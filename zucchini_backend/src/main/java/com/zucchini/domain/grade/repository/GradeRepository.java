package com.zucchini.domain.grade.repository;

import com.zucchini.domain.grade.domain.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface GradeRepository extends JpaRepository<Grade, Integer> {

    @Modifying
    @Query(value = "DELETE FROM Grade g WHERE g.graderId = :userId or g.gradeRecipientId = :userId")
    void deleteAllByUser(String userId);

}
