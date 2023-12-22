package com.Abdelrahman.AssignmentSubmissionApp.dto;

import com.Abdelrahman.AssignmentSubmissionApp.entity.Assignment;
import com.Abdelrahman.AssignmentSubmissionApp.enums.AssignmentEnum;
import com.Abdelrahman.AssignmentSubmissionApp.enums.AssignmentStatusEnum;

public class AssignmentDto {
    private Assignment assignment;
    private AssignmentEnum[] AssignmentEnums = AssignmentEnum.values();

    private AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();


    public AssignmentDto(Assignment assignment) {
        this.assignment = assignment;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public AssignmentEnum[] getAssignmentEnums() {
        return AssignmentEnums;
    }

    public void setAssignmentEnums(AssignmentEnum[] assignmentEnums) {
        AssignmentEnums = assignmentEnums;

    }

    public AssignmentStatusEnum[] getStatusEnums() {
        return statusEnums;
    }
}
