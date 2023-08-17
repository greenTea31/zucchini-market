package com.zucchini.domain.conference.repository;

import com.zucchini.domain.conference.domain.Conference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ConferenceRepository extends JpaRepository<Conference, Integer> {

    /**
     * 컨퍼런스 조회 시 페치 조인으로 상품도 같이 불러오는 쿼리
     * @param no
     * @return
     */
    @Query(value = "SELECT c FROM Conference c JOIN FETCH c.item WHERE c.no = :no")
    Optional<Conference> findByIdWithFetchJoin(int no);

}
