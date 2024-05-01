import {
 
  Card,
  CardHeader,
  Container, 
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
  Button,
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
  Alert 
} from "reactstrap";

const Add_Course = () => {
    return (
      <>
       
      <div 
      className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style={{
        minHeight: "500px",
        backgroundImage:
          "url(" + require("../../assets/img/theme/book.jpg") + ")",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      
      >
        <Container className="mt--7 pb-8 pt-3 pt-lg-8" fluid>
      <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-5 text-center">Course Registration Form</h3>
               
              <Form>
                      <Row >
                        <Col md={6}>
                          <FormGroup>
                            <Label for="Coursename">
                            Course name
                            </Label>
                            <Input
                              id="course_name"
                              name="Coursename"
                              placeholder="Enter Course Name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="Coursecode">
                              Coursecode
                            </Label>
                            <Input
                              id="Coursecode"
                              name="coursecode"
                              placeholder="Enter Course code"
                              type="coursecode"
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="startdate">
                            Start Date
                            </Label>
                            <Input
                              id="startdate"
                              name="startdate"
                              placeholder="Enter start date"
                              type="date"
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="enddate">
                            Start Date
                            </Label>
                            <Input
                              id="enddate"
                              name="enddate"
                              placeholder="Enter End date"
                              type="date"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <FormGroup>
                        <Label for="description">
                          Description
                        </Label>
                        <Input
                          id="description"
                          name="description"
                          placeholder="Course Description"
                        />
                      </FormGroup>
                    
                      <UncontrolledDropdown group>
                      <Label for="description">
                          Select Category of your course   
                        </Label>

                        <Button color="primary" >
                          Category
                        </Button>
                        <DropdownToggle
                          caret
                          color="primary"
                        />
                        <DropdownMenu>
                          <DropdownItem>
                            English
                          </DropdownItem>
                          <DropdownItem>
                            Technology
                          </DropdownItem>
                          <DropdownItem>
                            Commerce
                          </DropdownItem>
                          <DropdownItem>
                            Science
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      

                      <div className="text-center">
                      <Button className="my-4" color="primary" type="submit">
                      Register Course
                      </Button>
                    </div>
                      
                     
                    </Form>
          
           </CardHeader>   
            </Card>
          </div>
        </Row>
      </Container>
  
     

      </div>
     
      </>
    )}
 export default Add_Course;