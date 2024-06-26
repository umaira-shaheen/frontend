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
import { useState } from 'react';
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

const Login = () => {
 const [isloggedin, setlogin]=useState(false);
//  useState for error message. initially error message will be false
const [error, setError] = useState(false);
const history = useHistory();
function handleSubmit(e)
{
e.preventDefault()
const email=e.target.elements.email.value;
const password=e.target.elements.password.value;
// axios.get('http://localhost:8000/auth/get_data?name=rida').then(res =>{console.log(res)})
axios({
  method:'post',
  withCredentials: true,
  url :"http://localhost:8000/auth/validate",
  data:{email:email , password:password}
})
.then(res=>{
  // return <Redirect to="/admin/index">
  var state = localStorage.getItem('state');
  state = JSON.parse(state)
  if(state !== null && state !== undefined)
  {
    localStorage.clear('state')
    localStorage.setItem('user', JSON.stringify(res.data));
    history.push('/detail', state);
    return
  }

  setlogin(true);
   const user_id=res.data._id;
   const user_role=res.data.Role;
   
   localStorage.setItem('user', JSON.stringify(res.data));
})
.catch(error=>{
  setError(true)
})

}
const onDismiss = () => setError(false); 
if (localStorage.getItem("user") != null) {
  const storedUser = localStorage.getItem('user');
  const user_info = JSON.parse(storedUser);
  if(user_info.Email)
  {
    return <Redirect to="/admin/user-profile" />;
  }
}
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Alert color="danger" isOpen={error} toggle={onDismiss}>
              <strong>Error! </strong> Invalid credentials
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
                    placeholder="Email"
                    type="email"
                    name="email"
                    autoComplete="new-email"
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
                    placeholder="Password"
                    type="password"
                    name="password"
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div> */}
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
          <Link to={"/auth/ForgotPassword"} className="text-light"><small>Forgot Password?</small></Link> 
          </Col>
          <Col className="text-right" xs="6">
            <Link to={"/auth/register"} className="text-light"><small>Create new account</small></Link> 
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
