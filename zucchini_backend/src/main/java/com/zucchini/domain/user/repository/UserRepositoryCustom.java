package com.zucchini.domain.user.repository;

public interface UserRepositoryCustom {

    /**
     * 회원이 거래한 상품 개수 조회
     * @param id : 아이디
     * @return long : 상품 개수
     */
    long countItemsByStatusAndUserNo(String id);

}
