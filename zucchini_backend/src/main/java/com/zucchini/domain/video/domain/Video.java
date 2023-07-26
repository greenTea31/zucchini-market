package com.zucchini.domain.video.domain;

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
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int no;

    @ManyToOne(targetEntity = Item.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "item_no", insertable = false, updatable = false)
    private Item item;

    @Column(name = "item_no")
    private Integer itemNo;

    @Column(name = "link", length = 2048)
    private String link;

    @Column(name = "start_time", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date startTime;

    @Column(name = "end_time", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date endTime;

    @Column(name = "delete_time", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date deleteTime;

    @Builder
    public Video(Integer itemNo, String link, Date startTime, Date endTime, Date deleteTime) {
        this.itemNo = itemNo;
        this.link = link;
        this.startTime = startTime;
        this.endTime = endTime;
        this.deleteTime = deleteTime;
    }

    // 비즈니스 메서드
    public void extendDeleteTime(){
        long oneDayInMillis = 24 * 60 * 60 * 1000 * 7; // 7일의 밀리초 값
        this.deleteTime = new Date(this.deleteTime.getTime() + oneDayInMillis);
    }

}
