package com.zucchini.domain.conference.domain;

import com.zucchini.domain.item.domain.Item;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "conference")
public class Conference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer no;

    @Column(name = "is_active", nullable = false)
    private boolean active;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_no", nullable = false)
    private Item item;

    @Column(name = "confirmed_date", nullable = false)
    private Date confirmedDate;

    @Builder
    public Conference(Item item, Date date) {
        this.active = false;
        this.item = item;
        this.confirmedDate = date;
    }

    /**
     * 비즈니스 메서드
     */

    // 컨퍼런스 세션 활성화 되면 true
    public void setActive(){
        this.active = true;
    }

}
