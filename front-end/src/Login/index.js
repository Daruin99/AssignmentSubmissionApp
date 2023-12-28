import React from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    console.log(event.target.name)
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function sendLoginReq() {
    const reqBody = {
      username: formData.username,
      password: formData.password,
    };

    fetch("api/auth/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200)
          return Promise.all([response.json(), response.headers]);
        else return Promise.reject("Invalid Login attempt");
      })
      .then(([body, headers]) => {
        localStorage.setItem("jwt", headers.get("authorization"));
        window.location.href = "/dashboard"
      })
      .catch((message) => {
        alert(message);
      });
  }

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md="8" lg="6">
          <Form.Group className="mb-3" controlId="username">
            <Form.Label className="fs-4">Username</Form.Label>
            <Form.Control
              type="email"
              size="lg"
              placeholder="joe@gmail.com"
              name="username"
              onChange={handleChange}
              value={formData.username}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md="8" lg="6">
          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="fs-4">Password</Form.Label>
            <Form.Control
              type="password"
              size="lg"
              name="password"
              placeholder="Type in your password"
              onChange={handleChange}
              value={formData.password}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col
          md="8"
          lg="6"
          className="mt-2 d-flex flex-column gap-5 flex-md-row justify-content-md-between"
        >
          <Button id="submit" type="button" size="lg" onClick={sendLoginReq}>
            Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
