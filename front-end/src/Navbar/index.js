import React from 'react';
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <Row>
        <Col>
          <div
            className="d-flex justify-content-end p-3"
            style={{ cursor: "pointer" }}
            onClick={() => {
              localStorage.setItem("jwt", null);
              navigate("/login");
            }}
          >Logout</div>
        </Col>
      </Row>
    );
};

export default Navbar;