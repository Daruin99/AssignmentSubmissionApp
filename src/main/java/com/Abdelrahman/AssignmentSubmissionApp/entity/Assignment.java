package com.Abdelrahman.AssignmentSubmissionApp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "assignment")
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;



    @Column(name = "status")
    private String status;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(name = "branch")
    private String branch;

    @Column(name = "code_review_url")
    private String codeReviewUrl;


    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    public Assignment(String status, String githubUrl, String branch, String codeReviewUrl) {
        this.status = status;
        this.githubUrl = githubUrl;
        this.branch = branch;
        this.codeReviewUrl = codeReviewUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getCodeReviewUrl() {
        return codeReviewUrl;
    }

    public void setCodeReviewUrl(String codeReviewUrl) {
        this.codeReviewUrl = codeReviewUrl;
    }

    public User getAssignedTo() {
        return user;
    }

    public void setAssignedTo(User user) {
        this.user = user;
    }
}
