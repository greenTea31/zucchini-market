package com.zucchini.domain.user.domain;

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

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer no;

    @Column(name = "id", nullable = false, unique = true, length = 20)
    private String id;

    @Column(name = "password", nullable = false)
//    @Length(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @Column(name = "nickname", nullable = false, length = 20)
    private String nickname;

    @Column(name = "name", nullable = false, length = 20)
    private String name;

    @Column(name = "phone", nullable = false, length = 15)
    @Pattern(regexp="^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$", message="Invalid phone number")
    private String phone;

    @Column(name = "gender")
    private Boolean gender;

    @Column(name = "email", nullable = false)
    @Email
    @Length(max = 255)
    private String email;

    @Column(name = "report_count", nullable = false, columnDefinition = "integer default 0")
    private Integer report_count;

    @Column(name = "grade", nullable = false, columnDefinition = "double default 3")
    @DecimalMin(value = "0.0", inclusive = true)
    @DecimalMax(value = "5.0", inclusive = true)
    private Double grade;

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

}