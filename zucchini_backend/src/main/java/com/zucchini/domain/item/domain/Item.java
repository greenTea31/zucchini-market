package com.zucchini.domain.item.domain;

import com.zucchini.domain.category.domain.ItemCategory;
import com.zucchini.domain.grade.domain.Grade;
import com.zucchini.domain.image.domain.Image;
import com.zucchini.domain.item.dto.request.ModifyItemRequest;
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
@NamedEntityGraph(name = "Item.withImages", attributeNodes = @NamedAttributeNode("imageList"))
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer no;

    @Column(name = "title", length = 200, nullable = false)
    private String title;

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "updated_at", nullable = false, updatable = false)
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @Column(name = "content", columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "status", nullable = false)
    private int status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller")
    private User seller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer")
    private User buyer;

    @OneToMany(mappedBy = "item")
    private List<Grade> gradeList = new ArrayList<>();

    @OneToMany(mappedBy = "item")
    private List<ItemDate> dateList = new ArrayList<>();

    @OneToMany(mappedBy = "item")
    private List<ItemCategory> categoryList = new ArrayList<>();

    @OneToMany(mappedBy = "item")
    private List<Image> imageList = new ArrayList<>();

    private int view;
    
    @Builder
    public Item(String title, String content, int price, User seller){
        this.title = title;
        this.content = content;
        this.price = price;
        this.seller = seller;
    }

    /**
     * 비즈니스 메서드
     */
    
    // 구매자 변경
    public void setBuyer(User buyer) {
        this.buyer = buyer;
    }
    
    // 아이템 정보 수정
    public void modifyItem(ModifyItemRequest item) {
        this.title = item.getTitle();
        this.content = item.getContent();
        this.price = item.getPrice();
    }

    // 상품 상세 수정
    public void setStatus(int status) {
        this.status = status;
    }

    // 조회수 올리기
    public void viewUp() {
        this.view++;
    }

}
