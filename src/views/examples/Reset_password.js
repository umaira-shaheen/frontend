
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Redirect, Link, useHistory } from 'react-router-dom';
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
import NewHeader from "components/Headers/NewHeader.js";
import UKCELLLogo from './UKCELL.png';

const search = window.location.search;
const params = new URLSearchParams(search);
const token = params.get('token');
console.log("outside token" + token);
const Reset_password = () => {
  const [passwordchange, setpasswordchange] = useState(false);
  const [isvalidrequest, setvalidrequest] = useState(false);
  const [customerror, setcustomerror] = useState(false);
  const onDismisscustomerror = () => setcustomerror(false);
  const [error, setError] = useState(false);
  const history = useHistory();
  useEffect(() => {
    console.log("inside token" + token);
    console.log("hello");
    axios({
      method: 'get',
      withCredentials: true,
      url: "http://localhost:8000/auth/CheckToken?token_id=" + token,
    })
      .then(res => {
        if (res.data === "valid request") {
          console.log("hello");
          setvalidrequest(true);
        }
      })
      .catch(error => {
        setError(true)
      })
  }, []);


  function handleSubmit(e) {
    e.preventDefault()
    const email=e.target.email.value;
    const password = e.target.password.value;
    const confirm_password = e.target.confirm_password.value;
    if (password !== confirm_password) {
      setcustomerror(true);
      setErrorMessage("Password and Confirm password are not same!");
      return
    }
    axios({
      method: 'post',
      withCredentials: true,
      url: "http://localhost:8000/auth/ResetPassword",
      data: {email:email, confirm_password: confirm_password, password: password }
    })
      .then(res => {
        if (res.data === "success") {
          setpasswordchange(true);
          history.push('/auth/login');
        }
        else if(res.data==="Email Donot Exists! Plz Enter valid Email")
        {
          setcustomerror(true);
          setErrorMessage("Email Donot Exists! Plz Enter valid Email");
        }
        else {
          setError(true);
          setErrorMessage("Failed to update your password");
        }
      })
      .catch(error => {
        setError(true)
      })

  }
  const onDismiss = () => setError(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
     
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Alert color="danger" isOpen={error} toggle={onDismiss}>
              <strong>Error! </strong> Invalid credentials
            </Alert>
            <Alert color="danger" isOpen={customerror} toggle={onDismisscustomerror}>
              <strong> Error! {errorMessage} </strong>
            </Alert>
            <div className="text-center text-muted mb-4">
              Sign in with credentials
            </div>
            <Form role="form" onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="email"
                    type="email"
                    name="email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="password"
                    type="password"
                    name="password"
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
                  />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Change Password
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          {/* <Col xs="6">
          <Link to={"/auth/ForgotPassword"} className="text-light"><small>Forgot Password?</small></Link> 
          </Col>
          <Col className="text-right" xs="6">
            <Link to={"/auth/register"} className="text-light"><small>Create new account</small></Link> 
          </Col> */}
        </Row>
      </Col>

    </>
  );
};

export default Reset_password;
