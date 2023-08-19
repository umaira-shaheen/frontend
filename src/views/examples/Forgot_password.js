import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
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
const Forgot_password=()=>{
  const [isloggedin, setlogin]=useState(false);
  const [addsuccess, setaddSuccess] = useState(false);
  const onDismissaddSuccess = () => setaddSuccess(false);
  //  useState for error message. initially error message will be false
  const [error, setError] = useState(false);

  function handleSubmit(e)
  {
  e.preventDefault()
  const email=e.target.elements.email.value;
  axios({
    method:'post',
    withCredentials: true,
    url :"http://localhost:8000/auth/ForgotPassword",
    data:{email:email}
  })
  .then(res=>{
    if(res.data==="Email Sent to reset your password")
    {
            setaddSuccess(true);
    }
   
    
  })
  .catch(error=>{
    setError(true)
  })
  
  }
  const onDismiss = () => setError(false); 
 
    return(
        <>
        <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
          <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
          <strong> Email Sent to reset your password! </strong>
        </Alert>
          <Alert color="danger" isOpen={error} toggle={onDismiss}>
              <strong>Error! </strong> Email Address Donot Exists
            </Alert>
           
            <div className="text-center text-muted mb-4">
              <small>Enter your email to change your password</small>
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
                    placeholder="Email"
                    type="email"
                    name="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
          
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Send Link
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
       
      </Col>
        </>
    )
}
export default Forgot_password;