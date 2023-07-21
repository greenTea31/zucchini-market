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
    private int no;

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
    private int itemNo;

    @Column(name = "room_no")
    private int roomNo;

    @Builder
    public Report(String reporter, String reported, String reason, int itemNo, int roomNo) {
        this.reporter = reporter;
        this.reported = reported;
        this.reason = reason;
        this.itemNo = itemNo;
        this.roomNo = roomNo;
    }

    public void setReporter(String reporter) {
        this.reporter = reporter;
    }

}