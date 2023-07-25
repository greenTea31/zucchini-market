package com.zucchini.domain.item.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Date {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int no;

    @ManyToOne(targetEntity = Item.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "item_no", insertable = false, updatable = false)
    private Item item;
    @Column(name = "item_no")
    private Integer itemNo;

    private java.util.Date date;

    @Builder
    public Date(int itemNo, java.util.Date date) {
        this.itemNo = itemNo;
        this.date = date;
    }

}
