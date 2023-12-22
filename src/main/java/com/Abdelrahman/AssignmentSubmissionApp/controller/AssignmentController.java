package com.Abdelrahman.AssignmentSubmissionApp.controller;


import com.Abdelrahman.AssignmentSubmissionApp.dto.AssignmentDto;
import com.Abdelrahman.AssignmentSubmissionApp.entity.Assignment;
import com.Abdelrahman.AssignmentSubmissionApp.entity.User;
import com.Abdelrahman.AssignmentSubmissionApp.service.AssignmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Optional;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    private AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @PostMapping("")
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user) {
        System.out.println(user);
        Assignment assignment = assignmentService.save(user);
        return ResponseEntity.ok(assignment);
    }
    @GetMapping("")
    public ResponseEntity<?> getAssignmnets(@AuthenticationPrincipal User user) {
          return ResponseEntity.ok(assignmentService.findByUser(user));
    }
    @GetMapping("{assignmentId}")
    public ResponseEntity<?> getAssignmnet(@PathVariable int assignmentId,@AuthenticationPrincipal User user) {

        Optional<Assignment> assignmentOpt = assignmentService.findById(assignmentId);

        AssignmentDto assignmentDto = new AssignmentDto(assignmentOpt.orElse(new Assignment()));
        return ResponseEntity.ok(assignmentDto);
    }

    @PutMapping("{assignmentId}")
    public ResponseEntity<?> updateAssignmnet(@PathVariable int assignmentId,  @RequestBody Assignment assignment , @AuthenticationPrincipal User user) {

       return ResponseEntity.ok(assignmentService.save(assignment));
    }
}
