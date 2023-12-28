import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../StatusBadge";
import ajax from "../services/fetchService";
import Navbar from "../Navbar";
import "./style.css";

const CodeReviewerDashboard = () => {
  const [assignments, setAssignments] = useState(null);
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  function unclaimAssignment(assignment) {
    const codeReviewer = {
      username: "anon",
    };
    assignment.codeReviewer = codeReviewer;
    assignment.status = "Submitted";

    ajax(`/api/assignments/${assignment.id}`, "PUT", jwt, assignment).then(
      (updatedAssignment) => {
        const assignmentsCopy = [...assignments];
        const i = assignmentsCopy.findIndex((a) => a.id === assignment.id);
        assignmentsCopy[i] = updatedAssignment;
        setAssignments(assignmentsCopy);
      }
    );
  }

  function claimAssignment(assignment) {
    assignment.status = "In Review";
    ajax(`/api/assignments/${assignment.id}`, "PUT", jwt, assignment).then(
      (updatedAssignment) => {
        const assignmentsCopy = [...assignments];
        const i = assignmentsCopy.findIndex((a) => a.id === assignment.id);
        assignmentsCopy[i] = updatedAssignment;
        setAssignments(assignmentsCopy);
        ajax ("/api/email/student/notification", "PUT" , jwt, assignment)
      }
    );
  }

  function editReview(assignment) {
    navigate(`/assignments/${assignment.id}`);
  }

  useEffect(() => {
    ajax("api/assignments", "GET", jwt).then((assignmentsData) => {
      setAssignments(assignmentsData);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Row>
          <Col>
            <div className="h1">Code Reviewer Dashboard</div>
          </Col>
        </Row>
        <div className="assignment-wrapper">
          <div className="assignment-wrapper-title h3 px-2">In Review</div>
          {assignments &&
          assignments.filter((assignment) => assignment.status === "In Review")
            .length > 0 ? (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
            >
              {assignments
                .filter((assignment) => assignment.status === "In Review")
                .map((assignment) => (
                  <Card key={assignment.id} style={{ width: "18rem" }}>
                    <Card.Body className="d-flex flex-column justify-content-around">
                      <Card.Title>Assignment #{assignment.number}</Card.Title>
                      <Card.Subtitle
                        style={{ marginBottom: "0.5em" }}
                        className="text-muted"
                      >
                        {assignment.name}
                      </Card.Subtitle>
                      <div className="d-flex align-items-start">
                        <StatusBadge text={assignment.status} />
                      </div>
                      <Card.Text style={{ marginTop: "1em" }}>
                        <p>
                          <b>GitHub URL</b>: {assignment.githubUrl}
                        </p>
                        <p>
                          <b>Branch</b>: {assignment.branch}
                        </p>
                      </Card.Text>
                      <div className="d-flex flex-column justify-content-around">
                        <Button
                          variant="secondary"
                          onClick={() => {
                            editReview(assignment);
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="secondary"
                          className="mt-3"
                          onClick={() => {
                            unclaimAssignment(assignment);
                          }}
                        >
                          Un-claim
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          ) : (
            <div>No assignments found</div>
          )}
        </div>

        <div className="assignment-wrapper">
          <div className="assignment-wrapper-title h3 px-2">
            Awaiting Review
          </div>
          {assignments &&
          assignments.filter(
            (assignment) =>
              assignment.status === "Submitted" ||
              assignment.status === "Resubmitted"
          ).length > 0 ? (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
            >
              {assignments
                .filter(
                  (assignment) =>
                    assignment.status === "Submitted" ||
                    assignment.status === "Resubmitted"
                )
                .sort((a, b) => {
                  if (a.status === "Resubmitted") return -1;
                })
                .map((assignment) => (
                  <Card key={assignment.id} style={{ width: "18rem" }}>
                    <Card.Body className="d-flex flex-column justify-content-around">
                      <Card.Title>Assignment #{assignment.number}</Card.Title>
                      <Card.Subtitle
                        style={{ marginBottom: "0.5em" }}
                        className="text-muted"
                      >
                        {assignment.name}
                      </Card.Subtitle>
                      <div className="d-flex align-items-start">
                        <StatusBadge text={assignment.status} />
                      </div>
                      <Card.Text style={{ marginTop: "1em" }}>
                        <p>
                          <b>GitHub URL</b>: {assignment.githubUrl}
                        </p>
                        <p>
                          <b>Branch</b>: {assignment.branch}
                        </p>
                      </Card.Text>
                      <div className="d-flex flex-column justify-content-around">
                        <Button
                          variant="secondary"
                          onClick={() => {
                            claimAssignment(assignment);
                          }}
                        >
                          Claim
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          ) : (
            <div>No assignments found</div>
          )}
        </div>

        <div className="assignment-wrapper mb-5">
          <div className="assignment-wrapper-title h3 px-2">Needs update</div>
          {assignments &&
          assignments.filter(
            (assignment) => assignment.status === "Needs Update"
          ).length > 0 ? (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
            >
              {assignments
                .filter((assignment) => assignment.status === "Needs Update")
                .map((assignment) => (
                  <Card key={assignment.id} style={{ width: "18rem" }}>
                    <Card.Body className="d-flex flex-column justify-content-around">
                      <Card.Title>Assignment #{assignment.number}</Card.Title>
                      <Card.Subtitle
                        style={{ marginBottom: "0.5em" }}
                        className="text-muted"
                      >
                        {assignment.name}
                      </Card.Subtitle>
                      <div className="d-flex align-items-start">
                        <StatusBadge text={assignment.status} />
                      </div>
                      <Card.Text style={{ marginTop: "1em" }}>
                        <p>
                          <b>GitHub URL</b>: {assignment.githubUrl}
                        </p>
                        <p>
                          <b>Branch</b>: {assignment.branch}
                        </p>
                      </Card.Text>
                      <div className="d-flex flex-column justify-content-around">
                        <Button
                          variant="secondary"
                          onClick={() => {
                            navigate(`/assignments/${assignment.id}`);
                          }}
                        >
                          View
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          ) : (
            <div>No assignments found</div>
          )}
        </div>
      </Container>
    </>
  );
};

export default CodeReviewerDashboard;
