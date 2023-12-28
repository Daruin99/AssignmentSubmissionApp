import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import StatusBadge from "../StatusBadge";
import ajax from "../services/fetchService";
import { getButtonsByStatusAndRole } from "../services/statusService";

const CodeReviewerAssignmentView = () => {
  const { assignmentId } = useParams();
  let jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    number: null,
    status: null,
    codeReviewUrl: null,
  });

  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);

  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  const [isValidUrl, setIsValidUrl] = useState(
    urlRegex.test(assignment.codeReviewUrl)
  );

  const prevAssignmentValue = useRef(assignment);

  function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);

    if (prop === "codeReviewUrl") {
      setIsValidUrl(urlRegex.test(value));
    }
  }

  function save(status) {
    if (isValidUrl) {
      if (assignment.status !== status) {
        updateAssignment("status", status);
      } else {
        persist();
      }
    } else {
      alert("Enter correct url!")
    }
  }

  function persist() {
    ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
      (assignmentData) => {
        setAssignment(assignmentData);
        ajax("/api/email/student/notification", "PUT", jwt, assignmentData);
      }
    );
  }
  useEffect(() => {
    if (
      prevAssignmentValue.current.status !== assignment.status &&
      prevAssignmentValue.current.status !== null
    ) {
      persist();
    }
    prevAssignmentValue.current = assignment;
  }, [assignment.status]);

  useEffect(() => {
    ajax(`/api/assignments/${assignmentId}`, "GET", jwt).then(
      (assignmentResponse) => {
        let assignmentData = assignmentResponse.assignment;
        if (assignmentData.branch === null) assignmentData.branch = "";
        if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
        setAssignment(assignmentData);
        setAssignmentEnums(assignmentResponse.assignmentEnums);
        setAssignmentStatuses(assignmentResponse.statusEnums);
      }
    );
  }, []);

  return (
    <>
      <Container className="mt-5">
        <Row className="d-flex align-items-center">
          <Col>
            {assignment && assignment.number && assignmentEnums.length > 0 ? (
              <>
                <h1>Assignment {assignment.number}</h1>
                <h4>{assignmentEnums[assignment.number - 1].assignmentName}</h4>
              </>
            ) : (
              <></>
            )}
          </Col>
          <Col>
            {assignment ? <StatusBadge text={assignment.status} /> : <></>}
          </Col>
        </Row>
        {assignment ? (
          <>
            <Form.Group as={Row} className="my-3" controlId="githubUrl">
              <Form.Label column sm="3" md="2">
                GitHub URL:
              </Form.Label>
              <Col sm="9" md="8" lg="6">
                <Form.Control
                  onChange={(e) =>
                    updateAssignment("githubUrl", e.target.value)
                  }
                  type="url"
                  value={assignment.githubUrl}
                  readOnly
                  placeholder="https://github.com/username/repo-name"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="branch">
              <Form.Label column sm="3" md="2">
                Branch:
              </Form.Label>
              <Col sm="9" md="8" lg="6">
                <Form.Control
                  type="text"
                  placeholder="example_branch_name"
                  readOnly
                  onChange={(e) => updateAssignment("branch", e.target.value)}
                  value={assignment.branch}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="my-3" controlId="codeReviewUrl">
              <Form.Label column sm="3" md="2">
                Video Review URL:
              </Form.Label>
              <Col sm="9" md="8" lg="6">
                <Form.Control
                  onChange={(e) =>
                    updateAssignment("codeReviewUrl", e.target.value)
                  }
                  type="url"
                  value={assignment.codeReviewUrl}
                  placeholder="https://screencast-o-matic.com/something"
                />
              </Col>
            </Form.Group>

            <div className="d-flex gap-5">
              {getButtonsByStatusAndRole(
                assignment.status,
                "code_reviewer"
              ).map((btn) => (
                <Button
                  size="lg"
                  variant={btn.variant}
                  onClick={() => save(btn.nextStatus)}
                >
                  {btn.text}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default CodeReviewerAssignmentView;
