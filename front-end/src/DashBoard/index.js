import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../StatusBadge";
import ajax from "../services/fetchService";
import { IsEditingContext } from "../App";
import Navbar from "../Navbar";

const DashBoard = () => {
  const [isEditing, setIsEditing] = React.useContext(IsEditingContext);
  const [assignments, setAssignments] = useState(null);
  const navigate = useNavigate();
  let jwt = localStorage.getItem("jwt");

  useEffect(() => {
    ajax("/api/assignments", "get", jwt).then((assignments) =>
      setAssignments(assignments)
    );
  }, []);

  function createNewAssignment() {
    ajax("/api/assignments", "post", jwt).then((assignment) => {
      if (assignment.number > 14) {
        alert("Can't submit more than 14 assignments!");
      } else {
        navigate(`/assignments/${assignment.id}`);
      }
    });
  }

  return (
    <div style={{ margin: "2em" }}>
      <Navbar />
      <Button
        size="lg"
        className="mb-4"
        onClick={() => {
          createNewAssignment();
          setIsEditing(false);
        }}
      >
        Submit New Assignment
      </Button>
      <div
        className="d-grid gap-5"
        style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
      >
        {assignments &&
          assignments.map((assignment) => (
            // <Col>
            <Card
              key={assignment.id}
              style={{ width: "18rem", height: "20rem" }}
            >
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
                  <b>GitHub URL</b>: {assignment.githubUrl}
                  <br />
                  <b>Branch</b>: {assignment.branch}
                </Card.Text>

                {assignment && assignment.status === "Completed" ? (
                  <>
                    <Button
                      onClick={() => {
                        window.open(assignment.codeReviewUrl);
                      }}
                      className="mb-4"
                    >
                      Watch Review
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setIsEditing(true);
                        navigate(`/assignments/${assignment.id}`);
                      }}
                    >
                      View
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsEditing(true);
                      navigate(`/assignments/${assignment.id}`);
                    }}
                  >
                    Edit
                  </Button>
                )}
              </Card.Body>
            </Card>
            // </Col>
          ))}
      </div>
    </div>
  );
};

export default DashBoard;
