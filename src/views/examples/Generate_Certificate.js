import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardFooter,
  Table,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge,
  Button,
  Alert,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Progress,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal, ModalHeader, ModalBody, ModalFooter,
  FormGroup,
  Form,
  Input,
  Label
} from "reactstrap";

import NewHeader from "components/Headers/NewHeader.js";

const Generate_Certificate = (args) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const closeModal = () => setModal(false);
  const [error, setError] = useState(false);
  const [feedbackmodal, setfeedbackModal] = useState();
  const [feedbacktable, setfeedbacktable] = useState();
  const [usertable, setUsertable] = useState();
  const [coursetable, setCoursetable] = useState(null);
  const [addsuccess, setaddSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const onDismissaddSuccess = () => setaddSuccess(false);
  const onDismiss = () => setError(false);
  const [customerror, setcustomerror] = useState(false);
  const onDismisscustomerror = () => setcustomerror(false);

  function GetUser(e) {
    axios({
      method: 'get',
      url: "http://localhost:8000/User/GetUser",
    })
      .then(res => {
        if (res.data) {

          setUsertable(res.data)
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
  function GetAllCertificates(e) {
    axios({
      method: 'get',
      url: "http://localhost:8000/Certificate/GetAllCertificates",
    })
      .then(res => {
        if (res.data) {

          setfeedbacktable(res.data);
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
  function GetCourse(e) {
    axios({
      method: 'get',
      withCredentials: true,
      url: "http://localhost:8000/course/GetAllCourse",
    })
      .then(res => {
        if (res.data) {
          setCoursetable(res.data)
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
  const [errorMessage, setErrorMessage] = useState("");
  function GenerateCertificate(e) {
    e.preventDefault();
    console.log('hy');
    const course = e.target.courses.value;
    const feedback = e.target.feedback.value;
    axios({
      method: 'post',
      withCredentials: true,
      sameSite: 'none',
      url: "http://localhost:8000/Certificate/GenerateCertificate",
      data: { course: course, feedback: feedback },
    })
      .then(res => {

        if (res.data.indicator === "Success!") {

          setfeedbackModal(!feedbackmodal);
          setaddSuccess(res.data.message);


          closeModal();

        }
        else if (res.data === "You have already generated certificates for this course") {
          setcustomerror(true);
          setErrorMessage(res.data);
          return
        }
        else {
          setErrorMessage(res.data.message);
          setError(true);
        }
        closeModal();
      })
      .catch(error => {
        console.log(error)
        if (error && error.response) {
          if (error.response.data && error.response.data == "Not logged in") {
            localStorage.clear(); // Clear local storage
            history.push('/auth/login');
          }
        }

      })
  }
  useEffect(() => {
    // Update the document title using the browser API
    GetUser();
    GetCourse();
    GetAllCertificates();
  }, []);
  const [filtered_courses, setFilteredCourses] = useState('');
  const handleCourseChange = (e) => {
    // Function to filter the quiz questions based on the selected quiz
    const filteredCourses = feedbacktable.filter(
      (feedback) => feedback.Course_name === e.target.value
    );
    setFilteredCourses(filteredCourses);
    setCurrentCourse(e.target.value)
  };
  const [currentCourse, setCurrentCourse] = useState("No Course Selected Yet");
  return (
    <>
      <NewHeader />
      <Container className="mt--7" fluid>
        <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
          <strong>Success!  </strong> {addsuccess}
        </Alert>
        <Alert color="danger" isOpen={error} toggle={onDismiss}>
          <strong>Error! </strong> {errorMessage}
        </Alert>
        <Modal isOpen={modal} toggle={toggle} {...args} size='lg'>
          <Form role="form" onSubmit={GenerateCertificate}>
            <ModalHeader toggle={toggle}>Generate New Certificate</ModalHeader>
            <ModalBody>
              <Alert color="danger" isOpen={customerror} toggle={onDismisscustomerror}>
                <strong> Error! {errorMessage} </strong>
              </Alert>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="courses">
                      Select Course
                    </Label>
                    <Input
                      id="AllCourses"
                      name="courses"
                      type="select"
                    >
                      <option value="all">All Courses</option>
                      {coursetable ? (
                        coursetable.map((row, index) => (
                          <option key={index} value={row._id}>
                            {row.Course_title}
                          </option>
                        ))
                      ) : (
                        <option disabled>Loading courses...</option>
                      )}
                    </Input>
                  </FormGroup>
                </Col>

              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="feedback">
                      Feedback About Students
                    </Label>
                    <Input
                      id="feedback"
                      name="feedback"
                      placeholder="Feedback About Student"
                      type='textarea'
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Generate Certificate
              </Button>{' '}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <Label for="quiz_title">
                      Search Course
                    </Label>
                    <Input
                      id="quiz_title"
                      name="quiz_title"
                      type="select"
                      onChange={handleCourseChange}
                      style={{ width: '300px' }}
                    >
                      <option value="No Course Selected Yet">No Course Selected Yet</option>
                      {coursetable ?
                        coursetable
                          .map((row, index) => {
                            return (
                              <option key={index} value={row.Course_title}>
                                {row.Course_title}
                              </option>
                            )
                          })
                        :
                        <h1>No Course Added yet!</h1>
                      }


                    </Input>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={toggle}
                      size="md"
                    >
                      Generate Certificate
                    </Button>
                  </div>
                </Row>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>

                <thead className="thead-light">
                  <tr>
                    <th scope="col">Course Name</th>
                    <th scope="col">Students</th>

                    <th scope="col">Action</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {filtered_courses.length > 0 ? (
                    filtered_courses.map((course, courseIndex) => (
                      <React.Fragment key={courseIndex}>
                        {course.Students.map((student, studentIndex) => (
                          <tr key={`${courseIndex}-${studentIndex}`}>
                            {studentIndex === 0 && (
                              <th scope="row" rowSpan={course.Students.length}>
                                <span className="mb-0 text-sm">
                                  {course.Course_name}
                                </span>
                              </th>
                            )}
                            <td>
                              {`${student.Student_First_name} ${student.Student_Last_name}`}
                            </td>
                            <td>
                              <Button color="danger" onClick={() => { Deletetoggle(course._id, course.Course_name) }}>
                                <i className="ni ni-fat-remove"></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))
                  ) : feedbacktable && feedbacktable.length > 0 && currentCourse === "No Course Selected Yet" ? (
                    feedbacktable.map((course, courseIndex) => (
                      <React.Fragment key={courseIndex}>
                        {course.Students.map((student, studentIndex) => (
                          <tr key={`${courseIndex}-${studentIndex}`}>
                            {studentIndex === 0 && (
                              <th scope="row" rowSpan={course.Students.length}>
                                <span className="mb-0 text-sm">
                                  {course.Course_name}
                                </span>
                              </th>
                            )}
                            <td>
                              {`${student.Student_First_name} ${student.Student_Last_name}`}
                            </td>
                            <td>
                              <Button color="danger" onClick={() => { Deletetoggle(course._id, course.Course_title) }}>
                                <i className="ni ni-fat-remove"></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No Certificates generated yet!</td>
                    </tr>
                  )}

                </tbody>
              </Table>

            </Card>
          </div>
        </Row>
      </Container>
    </>
  )

}
export default Generate_Certificate;