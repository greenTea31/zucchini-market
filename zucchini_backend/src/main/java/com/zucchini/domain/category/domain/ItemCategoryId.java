package com.zucchini.domain.category.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class ItemCategoryId implements Serializable {

    @JoinColumn(name = "item_no")
    private String itemNo;
    @Column(name = "category_no")
    private String categoryNo;

}
