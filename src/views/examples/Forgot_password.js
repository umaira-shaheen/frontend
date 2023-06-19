import { Link } from "react-router-dom";
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
    
    return(
        <>
        <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            {/* <Alert color="danger" isOpen={error} toggle={onDismiss}>
              <strong>Error! </strong> Invalid credentials
            </Alert> */}
            <div className="text-center text-muted mb-4">
              <small>Enter your email to change your password</small>
            </div>
            <Form role="form" >
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
              {/* <FormGroup>
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
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup> */}
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
                  Send Link
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
    )
}
export default Forgot_password;