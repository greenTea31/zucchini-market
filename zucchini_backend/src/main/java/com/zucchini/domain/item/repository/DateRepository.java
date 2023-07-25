package com.zucchini.domain.item.repository;

import com.zucchini.domain.item.domain.Date;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DateRepository extends JpaRepository<Date, Integer> {

}
