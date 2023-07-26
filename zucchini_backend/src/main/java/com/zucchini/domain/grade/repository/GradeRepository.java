package com.zucchini.domain.grade.repository;

import com.zucchini.domain.grade.domain.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeRepository extends JpaRepository<Grade, Integer> {


}
