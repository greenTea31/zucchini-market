package com.zucchini.domain.reservation.domain;

import com.zucchini.domain.conference.domain.Conference;
import com.zucchini.domain.user.domain.User;
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
@Table(name = "reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int no;

    @ManyToOne
    @JoinColumn(name = "user_no", nullable = false)
    private User user;

//    @ManyToOne
//    @JoinColumn(name = "conference_no", nullable = false)
//    private Conference conference;

    @ManyToOne(targetEntity = Conference.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "conference_no", insertable = false, updatable = false)
    private Conference conference;

    @Column(name = "conference_no")
    private int conferenceNo;

    @Column(name = "is_seller")
    private boolean isSeller;

    @Column(name = "is_attended")
    private boolean isAttended;

    @Builder
    public Reservation(User user, int conferenceNo, boolean isSeller) {
        this.user = user;
        this.conferenceNo = conferenceNo;
        this.isSeller = isSeller;
        this.isAttended = false;
    }

}
