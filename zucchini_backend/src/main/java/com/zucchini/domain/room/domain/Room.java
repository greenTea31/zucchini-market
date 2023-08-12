package com.zucchini.domain.room.domain;

import com.zucchini.domain.item.domain.Item;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer no;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_no")
    private Item item;

    @Builder
    public Room(Item item) {
        this.item = item;
    }

    /**
     * 비즈니스 메소드
     */

    // 현재 방이 어떤 Item을 거래하는 채팅방인지를 설정함
    public void setItem(Item item) {
        this.item = item;
    }

}
