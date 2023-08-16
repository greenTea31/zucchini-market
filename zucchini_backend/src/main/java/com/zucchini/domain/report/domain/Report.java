package com.zucchini.domain.report.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer no;

    @Column(name = "reporter")
    private String reporter;

    // lazy
    @Column(name = "reported")
    private String reported;

    @Column(name = "reason", columnDefinition = "TEXT")
    private String reason;

    @Column(name = "report_date")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date reportDate;

    @Column(name = "item_no")
    private Integer itemNo;

    @Column(name = "room_no")
    private Integer roomNo;

    @Builder
    public Report(String reporter, String reported, String reason, Integer itemNo, Integer roomNo) {
        this.reporter = reporter;
        this.reported = reported;
        this.reason = reason;
        this.itemNo = itemNo;
        this.roomNo = roomNo;
    }

    /**
     * 비즈니스 메소드
     */

    // 신고자를 변경하는 메소드
    public void setReporter(String reporter) {
        this.reporter = reporter;
    }

}