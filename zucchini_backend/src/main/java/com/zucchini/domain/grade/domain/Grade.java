package com.zucchini.domain.grade.domain;

import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.user.domain.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer no;

    @ManyToOne(targetEntity = Item.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "item_no", insertable = false, updatable = false)
    private Item item;

    @Column(name = "item_no")
    private Integer itemNo;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "grader", referencedColumnName = "id", insertable = false, updatable = false)
    private User grader;

    @Column(name = "grader")
    private String graderId;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "grade_recipient", referencedColumnName = "id", insertable = false, updatable = false)
    private User gradeRecipient;

    @Column(name = "grade_recipient")
    private String gradeRecipientId;

    @Builder
    public Grade(Integer itemNo,String graderId, String gradeRecipientId) {
        this.itemNo = itemNo;
        this.graderId = graderId;
        this.gradeRecipientId = gradeRecipientId;
    }

}
