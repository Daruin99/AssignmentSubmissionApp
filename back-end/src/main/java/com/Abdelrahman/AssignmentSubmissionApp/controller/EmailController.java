package com.Abdelrahman.AssignmentSubmissionApp.controller;

import com.Abdelrahman.AssignmentSubmissionApp.entity.Assignment;
import com.Abdelrahman.AssignmentSubmissionApp.entity.User;
import com.Abdelrahman.AssignmentSubmissionApp.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.ConnectException;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    private NotificationService notificationService;

    public EmailController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PutMapping("/student/notification")
    public ResponseEntity<?> sendNotificationToStudent(@AuthenticationPrincipal User user, @RequestBody Assignment assignment) {

        try {
            User student = assignment.getUser();
            User codeReviewer = user;

            String messageBody = notificationService.setBodyToStudent(codeReviewer, assignment);

            notificationService.sendSimpleMessage(student.getUsername(), "Status update", messageBody);
            return ResponseEntity.ok("Email sent successfully!");
        } catch (Exception error) {
            return  ResponseEntity.ok("Email failed to send");
        }

    }

    @PutMapping("/reviewer/notification")
    public ResponseEntity<?> sendNotificationToReviewer(@AuthenticationPrincipal User user, @RequestBody Assignment assignment) {

        User student = user;
        User codeReviewer = assignment.getCodeReviewer();

        String messageBody = notificationService.setBodyToReviewer(student, assignment);

        notificationService.sendSimpleMessage(codeReviewer.getUsername(), "Status update", messageBody);
        return ResponseEntity.ok("Email sent successfully!");
    }
}
