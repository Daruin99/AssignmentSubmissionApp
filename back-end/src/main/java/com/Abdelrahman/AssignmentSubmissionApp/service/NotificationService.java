package com.Abdelrahman.AssignmentSubmissionApp.service;

import com.Abdelrahman.AssignmentSubmissionApp.entity.Assignment;
import com.Abdelrahman.AssignmentSubmissionApp.entity.User;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private final JavaMailSender emailSender;

    public NotificationService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    public void sendSimpleMessage(String to, String subject, String text) {
        {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("codingbootcampdemo@gmail.com");
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            emailSender.send(message);
        }
    }

    public String setBodyToStudent(User codeReviewer, Assignment assignment) {
        int number = assignment.getNumber();
        String assignmentName = assignment.getName();
        String reviewerName = codeReviewer.getName();
        String reviewerEmail = codeReviewer.getUsername();
        String action = "";

        if (assignment.getStatus().equals("In Review")) {
            action = "in review";
        } else if (assignment.getStatus().equals("Needs Update")) {
            action = "rejected";
        } else if (assignment.getStatus().equals("Completed")) {
            action = "completed successfully (review link : "  + assignment.getCodeReviewUrl() + ")";
        }

        String body = String.format("Assignment %d (%s) is %s by code reviewer %s (%s).", number, assignmentName, action, reviewerName, reviewerEmail);

        return body;
    }

    public String setBodyToReviewer(User student, Assignment assignment) {
        int number = assignment.getNumber();
        String assignmentName = assignment.getName();
        String studentName = student.getName();
        String studentEmail = student.getUsername();

        String body = String.format("Assignment %d (%s) is Re-submitted by student %s (%s).", number, assignmentName, studentName, studentEmail);

        return body;
    }
}
