package com.Abdelrahman.AssignmentSubmissionApp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.*;

@Entity
@Table(name = "users")
public class User implements UserDetails {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Column(name = "user_name")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "cohort_start_date")
    private LocalDate cohortStartDate;



    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
    private Set<Authorities> authorities = new HashSet<>();

    public User() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }



    public LocalDate getCohortStartDate() {
        return cohortStartDate;
    }

    public void setCohortStartDate(LocalDate cohortStartDate) {
        this.cohortStartDate = cohortStartDate;
    }

    public void setAuthorities(Set<Authorities> authorities) {
        this.authorities = authorities;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        authorities.add(new Authorities("ROLE_STUDENT"));
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
