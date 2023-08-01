package com.zucchini.domain.conference.repository;

import com.zucchini.domain.conference.domain.Conference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConferenceRepository extends JpaRepository<Conference, Integer> {

}
