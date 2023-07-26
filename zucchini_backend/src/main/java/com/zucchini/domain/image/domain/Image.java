package com.zucchini.domain.image.domain;

import com.zucchini.domain.item.domain.Item;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer no;
    @ManyToOne(targetEntity = Item.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "item_no", insertable = false, updatable = false)
    private Item item;
    @Column(name = "item_no")
    private Integer itemNo;
    @Column(name = "link", length = 2048)
    private String link;

    @Builder
    public Image(Integer itemNo, String link) {
        this.itemNo = itemNo;
        this.link = link;
    }

}
