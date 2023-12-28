package com.Abdelrahman.AssignmentSubmissionApp.service;

import com.Abdelrahman.AssignmentSubmissionApp.entity.Assignment;
import com.Abdelrahman.AssignmentSubmissionApp.entity.User;
import com.Abdelrahman.AssignmentSubmissionApp.enums.AssignmentEnum;
import com.Abdelrahman.AssignmentSubmissionApp.enums.AssignmentStatusEnum;
import com.Abdelrahman.AssignmentSubmissionApp.repo.AssignmentRepo;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AssignmentService {

    private AssignmentRepo assignmentRepo;



    public AssignmentService(AssignmentRepo assignmentRepo) {
        this.assignmentRepo = assignmentRepo;
    }

    public Assignment save(User user) {
        Assignment assignment = new Assignment();
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
        assignment.setUser(user);
        return assignmentRepo.save(assignment);
    }


    public Set<Assignment> findByUser(User user) {
        boolean hasCodeReviewerRole = user.getAuthorities().stream()
                .filter(auth -> "ROLE_CODE_REVIEWER".equals(auth.getAuthority())).count() > 0;
        if (hasCodeReviewerRole) {
            // load assignments if you're a code reviewer role
            return assignmentRepo.findByCodeReviewer(user);
        } else {
            // load assignments if you're a student role

            Set<Assignment> assignments = assignmentRepo.findByUser(user);

            Set<Assignment> toDelete = assignments.stream()
                    .filter(assignment -> assignment.getNumber() == 0)
                    .collect(Collectors.toSet());

            assignments.removeAll(toDelete);

            // Delete the assignments with number 0 from the database
            toDelete.forEach(assignment -> assignmentRepo.delete(assignment));

            return assignments;

        }
    }

    public Optional<Assignment> findById(int id) {
        return assignmentRepo.findById(id);
    }

    public Assignment save(Assignment assignment) {
         Assignment assignment1 = assignmentRepo.save(assignment);
         return assignment1;

    }
}
