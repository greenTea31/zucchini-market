package com.zucchini.domain.user.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class UserItemLikeId implements Serializable {

    @Column(name = "user_no")
    private Integer userNo;
    @Column(name = "item_no")
    private Integer itemNo;

}
