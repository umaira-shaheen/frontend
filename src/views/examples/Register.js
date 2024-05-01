/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import axios from 'axios';
import { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import InputMask from 'react-input-mask';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert
} from "reactstrap";

const Register = () => {
  const [isregistered, setRegister] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const Firstname = e.target.First_Name.value;
    const Lastname = e.target.Last_Name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirm_password = e.target.confirm_password.value;
    const phone_no = e.target.phone_no.value;
    const role = "Student";
    axios({
      method: 'post',
      url: "http://localhost:8000/auth/register",
      data: { Firstname: Firstname, Lastname: Lastname, email: email, password: password, role: role, confirm_password: confirm_password, phone_no: phone_no },
    })
      .then(res => {
        if (res.data == "successfully inserted") {
          setRegister(true);

        }
        else {
          setErrorMessage(res.data);
          setError(true);
        }
        console.log(res);

      })
      .catch(error => {
        console.log(error);
        setErrorMessage("Failed to connect to backend");
        setError(true);
      })
  }
  const onDismiss = () => setError(false);

  if (isregistered) {
    return <Redirect to="/admin/index" />;
  }
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          {/* <CardHeader className="bg-transparent pb-5"> */}
          <Alert color="success" isOpen={isregistered} toggle={onDismiss}>
            <strong> You are successfully registered!! </strong>
          </Alert>
         

          {/* <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div> */}
          {/* </CardHeader> */}
          <CardBody className="px-lg-5 py-lg-5">
          <Alert color="danger" isOpen={error} toggle={onDismiss}>
            <strong>Error! </strong> {errorMessage}
          </Alert>
            <div className="text-center text-muted mb-4">
               sign up with credentials
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="First Name" type="text" name="First_Name" required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Last Name" type="text" name="Last_Name" required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    name="email"
                    type="email"
                    autoComplete="new-email"
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Enter password of max 8 characters"
                    type="password"
                    name="password"
                    minLength={4} // Set the minimum password length
                    maxLength={8} // Set the maximum password length
                    // autoComplete="new-password"
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    name="confirm_password"
                    minLength={4} // Set the minimum password length
                    maxLength={8} // Set the maximum password length
                    // autoComplete="conform-password"
                    required
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="ni ni-mobile-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputMask
                    mask=" (0399)-9999999"
                    placeholder="Phone Number"
                   
                    className="form-control border-top-0 border-right-0 border-left-0 p-0"
                    name="phone_no"
                    id="phone_no"
                    required
                  />
                  {/* <Input
                    placeholder="Phone Number"
                    type="Number"
                    name="phone_no"
                    // autoComplete=""
                    required
                  /> */}
                </InputGroup>
              </FormGroup>
              {/* <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
             */}
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="my-4" style={{ marginLeft: "100px" }}>
          <Col className="text-right" xs="6">
            <span className="text-light"><small>Already have an account?</small></span>
            <Link to={"/auth/login"} style={{ paddingLeft: '10px' }} className="text-success font-weight-300 ml-90"><small>Login</small></Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Register;
