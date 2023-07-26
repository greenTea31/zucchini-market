package com.zucchini.domain.category.domain;

import com.zucchini.domain.item.domain.Item;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class ItemCategory {

    @EmbeddedId
    private ItemCategoryId id;

    @ManyToOne(targetEntity = Item.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "item_no", insertable = false, updatable = false)
    private Item item;

    @ManyToOne(targetEntity = Category.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "category_no", insertable = false, updatable = false)
    private Category category;

    @Builder
    public ItemCategory(ItemCategoryId id) {
        this.id = id;
    }

}
