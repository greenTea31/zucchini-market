package com.zucchini.domain.category.domain;

import com.zucchini.domain.item.domain.Item;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemCategory {

    @EmbeddedId
    private ItemCategoryId id;
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("itemNo")
    private Item item;
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("categoryNo")
    private Category category;

}
