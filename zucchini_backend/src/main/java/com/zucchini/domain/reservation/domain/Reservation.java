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
    private Integer no;

    @ManyToOne
    @JoinColumn(name = "user_no", nullable = false)
    private User user;

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

    /**
     * 비즈니스 메서드
     */

    // 회원의 활성화된 세션 참석 시 true
    public void attend(){
        this.isAttended = true;
    }

    // 회원의 활성화된 세션 나가기 시 false
    public void leave(){
        this.isAttended = false;
    }

}
