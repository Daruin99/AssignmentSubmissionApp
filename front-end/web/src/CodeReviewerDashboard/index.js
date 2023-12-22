import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../StatusBadge";
import ajax from "../services/fetchService";
import Navbar from "../Navbar";

const CodeReviewerDashboard = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Row>
          <Col>
            <div className="h1">Code Reviewer Dashboard</div>
          </Col>
        </Row>
        <div className="assignment-wrapper in-review">
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

        <div className="assignment-wrapper in-review">
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

        <div className="assignment-wrapper in-review">
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

      </Container>
    </>
  );
};

export default CodeReviewerDashboard;
