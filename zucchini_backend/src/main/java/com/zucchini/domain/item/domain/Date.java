package com.zucchini.domain.item.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Date {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int no;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_no")
    private Item item;

    private java.util.Date date;

}
