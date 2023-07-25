package com.zucchini.domain.item.domain;

import com.zucchini.domain.category.domain.ItemCategory;
import com.zucchini.domain.grade.domain.Grade;
import com.zucchini.domain.user.domain.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int no;

    @Column(name = "title", length = 200, nullable = false)
    private String title;

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "updated_at", nullable = false)
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @Column(name = "content", columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "status", nullable = false)
    private int status;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "seller", insertable = false, updatable = false)
    private User seller;
    @Column(name = "seller")
    private int sellerNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer", nullable = false)
    private User buyer;

    @OneToMany(mappedBy = "item")
    private List<Grade> gradeList = new ArrayList<>();

    @OneToMany(mappedBy = "item")
    private List<com.zucchini.domain.item.domain.Date> dateList = new ArrayList<>();

    @OneToMany(mappedBy = "item")
    private List<ItemCategory> categoryList = new ArrayList<>();

    @Builder
    public Item(String title, String content, int price, int sellerNo){
        this.title = title;
        this.content = content;
        this.price = price;
        this.sellerNo = sellerNo;
    }

    // 비즈니스 메서드
    public void addGrade(Grade grade) {
        this.gradeList.add(grade);
    }

    public void setBuyer(User buyer) {
        this.buyer = buyer;
    }

}
