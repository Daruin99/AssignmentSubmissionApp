import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';import 'bootstrap/dist/css/bootstrap.css';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
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
        window.location.href = "dashboard";
      })
      .catch((message) => {
        alert(message);
      });

  }

  return (
    <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0">Logo</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' type="text" placeholder="Enter username" name="username" onChange={handleChange} value={formData.username} size="lg"/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100'  type="password" placeholder="Password" name="password" onChange={handleChange} value={formData.password}  size="lg"/>

            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={sendLoginReq}>Login</MDBBtn>
            <p className='ms-5'>Don't have an account? <a href="#!" className="link-info">Register here</a></p>

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
};

export default Login;



