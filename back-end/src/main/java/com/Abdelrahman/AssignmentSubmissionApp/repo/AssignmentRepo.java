package com.Abdelrahman.AssignmentSubmissionApp.repo;

import com.Abdelrahman.AssignmentSubmissionApp.entity.Assignment;
import com.Abdelrahman.AssignmentSubmissionApp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface AssignmentRepo extends JpaRepository<Assignment, Integer> {
    Set<Assignment> findByUser(User user);

    @Query("select a from Assignment a "
            + "where ((a.status = 'Submitted' or a.status = 'Resubmitted') and (a.codeReviewer is null or a.codeReviewer = :codeReviewer))"
            + "or a.codeReviewer = :codeReviewer")
    Set<Assignment> findByCodeReviewer(User codeReviewer);


}
