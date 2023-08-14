package com.zucchini.domain.user.domain;

import com.zucchini.domain.user.dto.request.ModifyUserRequest;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import java.io.Serializable;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer no;

    @Column(name = "id", unique = true, length = 20)
    private String id;

    @Column(name = "password")
    private String password;

    @Column(name = "nickname", length = 20)
    private String nickname;

    @Column(name = "name", length = 20)
    private String name;

    @Column(name = "phone", length = 15)
    @Pattern(regexp="^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$", message="Invalid phone number")
    private String phone;

    @Column(name = "gender")
    private Boolean gender;

    @Column(name = "email")
    @Email
    @Length(max = 255)
    private String email;

    @Column(name = "report_count", columnDefinition = "integer default 0")
    private Integer reportCount;

    @Column(name = "deal_count", columnDefinition = "integer default 0")
    private Integer dealCount;

    @Column(name = "grade", columnDefinition = "float default 3")
    @DecimalMin(value = "0.0", inclusive = true)
    @DecimalMax(value = "5.0", inclusive = true)
    private Float grade;

    @Column(name = "authority", columnDefinition = "boolean default 0")
    private Boolean authority;

    @Column(name = "is_locked", columnDefinition = "boolean default 0")
    private Boolean isLocked;

    @Column(name = "is_deleted", columnDefinition = "boolean default 0")
    private Boolean isDeleted;

    @Builder
    public User(String id, String password, String nickname, String name, String phone, boolean gender, String email) {
        this.id = id;
        this.password = password;
        this.nickname = nickname;
        this.name = name;
        this.phone = phone;
        this.gender = gender;
        this.email = email;
    }

    /**
     * 비즈니스 메서드
     */

    // 회원 탈퇴 시 중요한 개인정보 삭제
    public void userDelete() {
        this.id = null;
        this.nickname = null;
        this.name = null;
        this.gender = null;
        this.isDeleted = true;
    }

    // 회원 정보 수정
    public void modifyUser(ModifyUserRequest modifyUserRequest) {
        this.nickname = modifyUserRequest.getNickname();
        this.phone = modifyUserRequest.getPhone();
        this.gender = modifyUserRequest.getGender();
    }

    // 회원 비밀번호 변경
    public void modifyPassword(String password) {
        this.password = password;
    }

    // 회원 신고 횟수 증가
    public void increaseReportCount() {
        this.reportCount++;

        if (this.reportCount >= 3) {
            this.isLocked = true;
        }
    }

    // 별점 설정
    public void setGrade(float grade){
        this.grade = grade;
    }

    // 거래 횟수 증가
    public void setDealCount(){
        this.dealCount++;
    }
}