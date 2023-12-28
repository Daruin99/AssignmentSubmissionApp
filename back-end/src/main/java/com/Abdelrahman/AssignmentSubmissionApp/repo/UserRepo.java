package com.Abdelrahman.AssignmentSubmissionApp.repo;

import com.Abdelrahman.AssignmentSubmissionApp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
}
