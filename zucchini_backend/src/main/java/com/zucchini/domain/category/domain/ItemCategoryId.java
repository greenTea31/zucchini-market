package com.zucchini.domain.category.domain;

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
public class ItemCategoryId implements Serializable {

    @Column(name = "item_no")
    private int itemNo;
    @Column(name = "category_no")
    private int categoryNo;

}
