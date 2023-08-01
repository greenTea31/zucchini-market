package com.zucchini.domain.category.repository;

import com.zucchini.domain.category.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {



}
