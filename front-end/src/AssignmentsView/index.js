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
import { IsEditingContext } from "../App";
import { getButtonsByStatusAndRole } from "../services/statusService";

const AssignmentView = () => {
  // Inside your component...
  const [isEditing, setIsEditing] = React.useContext(IsEditingContext);

  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    number: null,
    name: null,
    status: null,
  });

  let jwt = localStorage.getItem("jwt");

  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);

  const prevAssignmentValue = useRef(assignment);
  const urlRegex = /^https:\/\/github\.com\//;
  const [isValidUrl, setIsValidUrl] = useState(
    urlRegex.test(assignment.githubUrl)
  );

  const [isValidName, setIsValidName] = useState(false);

  function updateAssignment(props, values) {
    const newAssignment = { ...assignment };
    props.forEach((prop, index) => {
      newAssignment[prop] = values[index];
    });
    setAssignment(newAssignment);
    console.log(props[0]);
    console.log(props[1]);
    console.log(newAssignment);

    if (props[0] === "githubUrl") {
      setIsValidUrl(urlRegex.test(values[0]));
    }
    if (props[1] === "name") {
      setIsValidName(true);
    }
  }

  function save(status) {
    console.log("url is " + isValidUrl)
    console.log("name is " + isValidName)
    if (isValidUrl && isValidName) {
      if (assignment.status !== status) {
        updateAssignment(["status"], [status]);
      } else {
        persist();
      }
    } else if (!isValidUrl) {
      alert("Enter correct URL!");
    } else {
      alert("Select an assignment!")
    }
  }

  function persist() {
    ajax(`/api/assignments/${assignmentId}`, "put", jwt, assignment).then(
      (assignmentData) => {
        setAssignment(assignmentData);
        if (assignmentData.status === "Resubmitted") {
          ajax("/api/email/reviewer/notification", "PUT", jwt, assignmentData);
        }
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
            <Form.Group as={Row} className="my-3" controlId="assignmentName">
              <Form.Label column sm="3" md="2">
                Assignment Number:
              </Form.Label>
              <Col sm="9" md="8" lg="6">
                <DropdownButton
                  as={ButtonGroup}
                  variant={"info"}
                  title={
                    assignment.number
                      ? `Assignment ${assignment.number}`
                      : "Select an Assignment"
                  }
                  onSelect={(selectedElement) => {
                    updateAssignment(
                      ["number", "name"],
                      [
                        selectedElement,
                        assignmentEnums[selectedElement - 1].assignmentName,
                      ]
                    );
                  }}
                  disabled={isEditing}
                >
                  {assignmentEnums.map((assignmentEnum) => (
                    <Dropdown.Item
                      key={assignmentEnum.assignmentNum}
                      eventKey={assignmentEnum.assignmentNum}
                    >
                      {assignmentEnum.assignmentNum}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="my-3" controlId="githubUrl">
              <Form.Label column sm="3" md="2">
                GitHub URL:
              </Form.Label>
              <Col sm="9" md="8" lg="6">
                <Form.Control
                  onChange={(e) =>
                    updateAssignment(["githubUrl"], [e.target.value])
                  }
                  type="url"
                  value={assignment.githubUrl}
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
                  onChange={(e) =>
                    updateAssignment(["branch"], [e.target.value])
                  }
                  value={assignment.branch}
                />
              </Col>
            </Form.Group>

            <div className="d-flex gap-5">
              {getButtonsByStatusAndRole(assignment.status, "student").map(
                (btn) => (
                  <Button
                    size="lg"
                    key={btn.text}
                    variant={btn.variant}
                    onClick={() => {
                      if (btn.nextStatus === "Same") persist();
                      else {
                        save(btn.nextStatus);
                      }
                    }}
                  >
                    {btn.text}
                  </Button>
                )
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default AssignmentView;
