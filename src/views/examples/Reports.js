
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';
import report from "assets/img/landing_images/report.jpg";
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

import NewHeader from 'components/Headers/NewHeader';

const Reports = (args) => {
  var moment = require('moment');

  const history = useHistory();
  const [usertable, setUsertable] = useState();
  const [modal, setModal] = useState(false);
  const [teachermodal, setteacherModal] = useState(false);
  const toggle = () => setModal(!modal);
  const coursetoggle = () => setcourseModal(!coursemodal);

  const teachertoggle = () => setteacherModal(!teachermodal);
  const closeModal = () => setModal(false);
  const closeteacherModal = () => setteacherModal(false);
  const [registrationmodal, setRegistrationModal] = useState(false);
  const [quizmodal, setQuizModal] = useState(false);
  const [enrollmentmodal, setenrollmentModal] = useState(false);
  const [assignmentmodal, setassignmentModal] = useState(false);
  const [coursemodal, setcourseModal] = useState(false);
  const [tablemodal, settableModal] = useState(false);
  const [quiztablemodal, setQuiztableModal] = useState(false);
  const [teachertablemodal, setteachertableModal] = useState(false);
  const [enrollmenttablemodal, setenrollmenttableModal] = useState(false);

  const [assignmenttablemodal, setAssignmenttableModal] = useState(false);
  const [coursetablemodal, setcoursetableModal] = useState(false);

  const [customerror, setcustomerror] = useState(false);
  const [registrationsuccess, setregistrationuccess] = useState(false);
  const onDismissregistrationSuccess = () => setregistrationSuccess(false);
  const onDismisscustomerror = () => setcustomerror(false);
  const [quiztable, setquiztable] = useState(null);
  const [assignmenttable, setassignmenttable] = useState(null);
  const [quizreporttable, setquizreporttable] = useState(null);
  const [coursereporttable, setcoursereporttable] = useState(null);

  const [teacherreporttable, setteacherreporttable] = useState(null);
  const [enrollmentreporttable, setenrollmentreporttable] = useState(null);
  const [assignmentreporttable, setassignmentreporttable] = useState(null);
  const onDismiss = () => setError(false);
  const [Assignmenttable, setAssignmenttable] = useState(null);
  const [coursetable, setCoursetable] = useState(null);
  const registrationtoggle1 = (event) => {
    closeModal();
    setRegistrationModal(!registrationmodal);
  };
  const quiztoggle1 = (event) => {
    closeModal();
    setQuizModal(!quizmodal);
  };
  const enrollmenttoggle1 = (event) => {
    closeModal();
    setenrollmentModal(!enrollmentmodal);
  };
  const coursetoggle1 = (event) => {
    closeModal();
    setcourseModal(!coursemodal);
  };
  const assignmenttoggle1 = (event) => {
    closeModal();
    setassignmentModal(!assignmentmodal);
  };
  const tabletoggle1 = (event) => {
    settableModal(!tablemodal);
  };
  const quiztabletoggle1 = (event) => {
    setQuiztableModal(!quiztablemodal);
  };
  const coursetabletoggle1 = (event) => {
    setcoursetableModal(!coursetablemodal);
  };
  const teachertabletoggle1 = (event) => {
    setteachertableModal(!teachertablemodal);
  };
  const assignmenttabletoggle1 = (event) => {
    setAssignmenttableModal(!assignmenttablemodal);
  };
  const enrollmenttabletoggle1 = (event) => {
    setenrollmenttableModal(!enrollmenttablemodal);
  };
  const tableModalClose = () => {
    settableModal(!tablemodal);
  }
  const quiztableModalClose = () => {
    setQuiztableModal(!quiztablemodal);
  }
  const teachertableModalClose = () => {
    setteachertableModal(!teachertablemodal);
  }
  const coursetableModalClose = () => {
    setcoursetableModal(!coursetablemodal);
  }
  const assignmenttableModalClose = () => {
    setAssignmenttableModal(!assignmenttablemodal);
  }
  const enrollmenttableModalClose = () => {
    setenrollmenttableModal(!enrollmenttablemodal);
  }
  const quizModalClose = () => {
    setQuizModal(!quizmodal);
  }
  const enrollmentModalClose = () => {
    setenrollmentModal(!enrollmentmodal);
  }
  const courseModalClose = () => {
    setcoursetModal(!coursemodal);
  }
  const assignmentModalClose = () => {
    setassignmentModal(!assignmentmodal);
  }
  const RegistrationModalClose = () => {
    setRegistrationModal(!registrationmodal);
  }
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function CourseReport(e) {
    e.preventDefault();
    const category = e.target.category.value;
    const course = e.target.courses.value;
    const start_date = e.target.start_date.value;
    const end_date = e.target.end_date.value;
    const url = `http://localhost:8000/Reports/CourseReport?category=${category}&course=${course}&start_date=${start_date}&end_date=${end_date}`;

    axios({
      method: 'get',
      withCredentials: true,
      sameSite: 'none',
      url: url,
    })
      .then(res => {
        console.log(res.data.data);
        if (res.data.message === "Success!") {
          console.log("printed");
          setcourseModal(!coursemodal);
          // console.log(res.data.data);
          setcoursereporttable(res.data.data);
          setcoursetableModal(true);
        }
        else {
          setErrorMessage(res.data.message);
          setError(true);
        }
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
  function GetUser(e) {

    axios({
      method: 'get',
      url: "http://localhost:8000/User/GetUser",
    })
      .then(res => {
        if (res.data) {
          console.log(res.data);
          setUsertable(res.data)
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  function RegistrationReport(e) {
    e.preventDefault();
    const date_to = e.target.start_date.value;
    const date_from = e.target.end_date.value;
    const All_Time = e.target.time.value;
    const url = `http://localhost:8000/Reports/StudentRegistrationReport?date_from=${date_from}&date_to=${date_to}&All_Time=${All_Time}`;

    axios({     //FindOneCourse on the base of id API Calling
      method: 'get',
      withCredentials: true,
      sameSite: 'none',
      url: url,
    })
      .then(res => {
        if (res.data.message === "Success!") {
          setRegistrationModal(!registrationmodal);
          console.log(res.data);
          setUsertable(res.data);
          settableModal(true);
        }
        else {
          setErrorMessage(res.data.message);
          setError(true);
        }

      })
      .catch(error => {
        console.log(error)
        if (error.response.data == "Not logged in") {
          localStorage.clear(); // Clear local storage
          history.push('/auth/login');
        }
        console.log(error);
        setError(true);
        setRegistrationModal(!registrationmodal);
      })

  }
  function EnrollmentReport(e) {
    e.preventDefault();
    const date_to = e.target.start_date.value;
    const date_from = e.target.end_date.value;
    const courses = e.target.courses.value;
    const url = `http://localhost:8000/Reports/CourseEnrollmentReport?date_from=${date_from}&date_to=${date_to}&courses=${courses}`;

    axios({     //FindOneCourse on the base of id API Calling
      method: 'get',
      withCredentials: true,
      sameSite: 'none',
      url: url,
    })
      .then(res => {
        if (res.data.message === "Success!") {
          setenrollmentModal(!enrollmentmodal);
          console.log(res.data.data);
          setenrollmentreporttable(res.data.data);
          setenrollmenttableModal(true);
        }
        else {
          setErrorMessage(res.data.message);
          setError(true);
        }
      })
      .catch(error => {
        console.log(error)
        if (error.response.data == "Not logged in") {
          localStorage.clear(); // Clear local storage
          history.push('/auth/login');
        }
        console.log(error);
        setError(true);
        setRegistrationModal(!registrationmodal);
      })

  }
  function GetQuiz(e) {
    // Update the document title using the browser API

    axios({
      method: 'get',
      withCredentials: true,
      sameSite: 'none',
      url: "http://localhost:8000/Quiz/GetQuiz",
    })
      .then(res => {
        if (res.data) {
          setquiztable(res.data)
        }
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
    GetQuiz();
    GetAssignment();
    GetCourse();
    console.log(coursetable);
    
 
  }, []);
  function StudentQuizReport(e) {
    e.preventDefault();
    const students = e.target.students.value;
    const quiz = e.target.quizes.value;
    const start_date = e.target.start_date.value;
    const end_date = e.target.end_date.value;
    const url = `http://localhost:8000/Reports/StudentQuizReport?students=${students}&quizes=${quiz}&start_date=${start_date}&end_date=${end_date}`;

    axios({
      method: 'get',
      withCredentials: true,
      sameSite: 'none',
      url: url,
    })
      .then(res => {
        console.log(res.data.data);
        if (res.data.message === "Success!") {
          console.log("printed");
          setQuizModal(!quizmodal);
          // console.log(res.data.data);
          setquizreporttable(res.data.data);
          setQuiztableModal(true);
        }
        else {
          setErrorMessage(res.data.message);
          setError(true);
        }
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
  function StudentAsignmentReport(e) {
    e.preventDefault();
    const students = e.target.students.value;
    const assignment = e.target.assignments.value;
    const start_date = e.target.start_date.value;
    const end_date = e.target.end_date.value;
    const url = `http://localhost:8000/Reports/StudentAssignmentReport?students=${students}&assignments=${assignment}&start_date=${start_date}&end_date=${end_date}`;

    axios({
      method: 'get',
      withCredentials: true,
      sameSite: 'none',
      url: url,
    })
      .then(res => {
        console.log(res.data.data);
        if (res.data.message === "Success!") {
          console.log("printed");
          setassignmentModal(!assignmentmodal);

          setassignmentreporttable(res.data.data);
          setAssignmenttableModal(true);
        }
        else {
          setErrorMessage(res.data.message);
          setError(true);
        }
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
  function TeacherReport(e) {
    e.preventDefault();
    const teachers = e.target.teachers.value;

    const start_date = e.target.start_date.value;
    const end_date = e.target.end_date.value;
    const url = `http://localhost:8000/Reports/TeacherReport?teachers=${teachers}&start_date=${start_date}&end_date=${end_date}`;

    axios({
      method: 'get',
      withCredentials: true,
      sameSite: 'none',
      url: url,
    })
      .then(res => {
        console.log(res.data.data);
        if (res.data.message === "Success!") {
          console.log("printed");
          setteacherModal(!teachermodal);
          setteacherreporttable(res.data.data);
          setteachertableModal(true);
        }
        else {
          setErrorMessage(res.data.message);
          setError(true);
        }
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
  function GetAssignment(e) {

    axios({
      method: 'get',
      withCredentials: true,
      sameSite: 'none',
      url: "http://localhost:8000/Assignment/GetAssignment",
    })
      .then(res => {
        if (res.data) {
          setAssignmenttable(res.data)
        }
      })
      .catch(error => {
        if (error && error.response) {
          if (error.response.data && error.response.data == "Not logged in") {
            localStorage.clear(); // Clear local storage
            history.push('/auth/login');
          }
        }
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
  const [selectedCategory, setSelectedCategory] = useState('all'); // State to track selected category
  const [filteredCourses, setFilteredCourses] = useState(coursetable); // State to store filtered courses
  const [uniqueCategories, setUniqueCategories] = useState(new Set());
  const handleCategoryChange = (e) => {
    const categoryValue = e.target.value;
    setSelectedCategory(categoryValue);

    // Filter courses based on selected category
    if (categoryValue === 'all') {
      setFilteredCourses(coursetable);
    } else {
      const filtered = coursetable.filter(course => course.Course_category === categoryValue);
      setFilteredCourses(filtered);
    }
  };

  return (
    <>

      {/* <!-- Contact Start --> */}
      <div className="my-front-css-custom">
        <NewHeader />
        <Modal isOpen={tablemodal} toggle={tabletoggle1} {...args} size='lg' style={{ maxWidth: '1000px' }}>
          <Form role="form">
            <ModalHeader toggle={tabletoggle1}>Student Registration Report</ModalHeader>
            <ModalBody>
              <h2 className="display-8" style={{ textAlign: 'center' }}>Student Registration Report</h2>
              <Table className="align-items-center table-flush " responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Address</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>

                  {usertable ?
                    usertable.map((row, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.First_name}
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Last_name}
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Email}
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Phone_no}
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Address}
                            </span>

                          </th>
                        </tr>)
                    })
                    :
                    <tr>
                      <td span="5">No User Record Found!</td>
                    </tr>
                  }
                </tbody>
              </Table>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" >
                Download in Excel
              </Button>{' '}
              <Button color="secondary" onClick={tableModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal isOpen={quiztablemodal} toggle={quiztabletoggle1} {...args} size='lg' style={{ maxWidth: '1000px' }} >
          <Form role="form">
            <ModalHeader toggle={quiztabletoggle1}>Student Quiz Report</ModalHeader>
            <ModalBody>
              <h2 className="display-8" style={{ textAlign: 'center' }}>Student Quiz Report</h2>
              <Table className="align-items-center table-flush " responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Quiz Title</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Total Marks</th>
                    <th scope="col">Quiz Course</th>
                    <th scope="col">Submitted By</th>
                    <th scope="col">Obtained Marks</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>

                  {Array.isArray(quizreporttable) ?
                    quizreporttable.map((row, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Quiz_title}
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              <Badge color="" className="badge-dot">
                                <i className="bg-info" />
                                {moment(row.Start_date).format('DD-MM-YYYY')}

                              </Badge>
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              <Badge color="" className="badge-dot">
                                <i className="bg-info" />
                                {moment(row.End_date).format('DD-MM-YYYY')}

                              </Badge>
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Questions}
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Quiz_Course}
                            </span>

                          </th>
                          <td>
                            {row.Submitted_by.map((student) => (
                              <div key={student}>
                                {`${student.Student_First_name} ${student.Student_Last_name}`}
                              </div>
                            ))}
                          </td>
                          <td>
                            {row.obtained_marks.map((obtainedmarks) => (
                              <div key={obtainedmarks}>
                                {obtainedmarks === '-1' ? "Not Marked" : obtainedmarks}
                              </div>
                            ))}
                          </td>
                        </tr>)
                    })
                    :
                    <tr>
                      <td>{quizreporttable instanceof Array ? quizreporttable[0].Quiz_title : quizreporttable?.Quiz_title}</td>
                      <td>{quizreporttable instanceof Array ? quizreporttable[0].Start_date : quizreporttable?.Start_date}</td>
                      <td>{quizreporttable instanceof Array ? quizreporttable[0].End_date : quizreporttable?.End_date}</td>
                      <td>{quizreporttable instanceof Array ? quizreporttable[0].End_date : quizreporttable?.Questions}</td>
                      <td>{quizreporttable instanceof Array ? quizreporttable[0].Quiz_Course : quizreporttable?.Quiz_Course}</td>
                      <td>{quizreporttable instanceof Array ? quizreporttable[0].Student_First_name : quizreporttable?.Student_First_name}</td>
                      <td>
                        {quizreporttable ? (
                          quizreporttable instanceof Array ? (
                            quizreporttable[0].obtained_marks == "-1 " ? (
                              "Not Marked"
                            ) : (
                              quizreporttable[0].obtained_marks
                            )
                          ) : (
                            quizreporttable.obtained_marks == "-1" ? "Not Marked" : quizreporttable.obtained_marks
                          )
                        ) : null}
                      </td>
                    </tr>
                  }
                </tbody>
              </Table>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" >
                Download in Excel
              </Button>{' '}
              <Button color="secondary" onClick={quiztableModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal isOpen={teachertablemodal} toggle={teachertabletoggle1} {...args} size='lg' style={{ maxWidth: '1000px' }} >
          <Form role="form">
            <ModalHeader toggle={teachertabletoggle1}>Teacher Report</ModalHeader>
            <ModalBody>
              <h2 className="display-8" style={{ textAlign: 'center' }}>Teacher Report</h2>
              <Table className="align-items-center table-flush " responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Course Title</th>
                    <th scope="col">Course Code</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Course Category</th>
                    <th scope="col">Assigned to</th>
                    <th scope="col">Students Enrolled</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(teacherreporttable) ?
                    teacherreporttable.map((row, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Course_title}
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Course_code}
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              <Badge color="" className="badge-dot">
                                <i className="bg-info" />
                                {moment(row.start_date).format('DD-MM-YYYY')}

                              </Badge>
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              <Badge color="" className="badge-dot">
                                <i className="bg-info" />
                                {moment(row.end_date).format('DD-MM-YYYY')}

                              </Badge>
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Course_category}
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Teacher_First_name} {row.Teacher_Last_name}
                            </span>

                          </th>
                          <td>
                            {row.Students.map((student) => (
                              <div key={student}>
                                {`${student.Student_First_name} ${student.Student_Last_name}`}
                              </div>
                            ))}
                          </td>

                        </tr>)
                    })
                    :
                    <tr>
                      <td>{teacherreporttable instanceof Array ? teacherreporttable[0].Course_title : teacherreporttable?.Course_title}</td>
                      <td>{teacherreporttable instanceof Array ? teacherreporttable[0].Course_code : teacherreporttable?.Course_code}</td>

                      <td>{teacherreporttable instanceof Array ? teacherreporttable[0].start_date : teacherreporttable?.start_date}</td>
                      <td>{teacherreporttable instanceof Array ? teacherreporttable[0].end_date : teacherreporttable?.end_date}</td>
                      <td>{teacherreporttable instanceof Array ? teacherreporttable[0].Course_category : teacherreporttable?.Course_category}</td>

                      <td>{teacherreporttable instanceof Array ? teacherreporttable[0].Teacher_First_name : teacherreporttable?.Teacher_First_name}</td>
                      <td>{teacherreporttable instanceof Array ? teacherreporttable[0].Student_First_name : teacherreporttable?.Student_First_name}</td>

                    </tr>


                  }
                </tbody>
              </Table>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" >
                Download in Excel
              </Button>{' '}
              <Button color="secondary" onClick={quiztableModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal isOpen={coursetablemodal} toggle={coursetabletoggle1} {...args} size='lg' style={{ maxWidth: '1300px' }} >
          <Form role="form">
            <ModalHeader toggle={coursetabletoggle1}>Course Report</ModalHeader>
            <ModalBody>
              <h2 className="display-8" style={{ textAlign: 'center' }}>Course Report</h2>
              <Table className="align-items-center table-flush " responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Course Title</th>
                    <th scope="col">Course Code</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Course Category</th>
                    <th scope="col">Assigned to</th>
                    <th scope="col"> Students Enrolled</th>
                    <th scope="col">Number of Students Enrolled</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(coursereporttable) ?
                    coursereporttable.map((row, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Course_title}
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Course_code}
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              <Badge color="" className="badge-dot">
                                <i className="bg-info" />
                                {moment(row.start_date).format('DD-MM-YYYY')}

                              </Badge>
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              <Badge color="" className="badge-dot">
                                <i className="bg-info" />
                                {moment(row.end_date).format('DD-MM-YYYY')}

                              </Badge>
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Course_category}
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Teacher_First_name} {row.Teacher_Last_name}
                            </span>

                          </th>
                          <td>
                            {row.Students.map((student) => (
                              <div key={student}>
                                {`${student.Student_First_name} ${student.Student_Last_name}`}
                              </div>
                            ))}
                          </td>
                          <td>
                            {row.Num_Students}
                          </td>

                        </tr>)
                    })
                    :
                    <tr>
                      <td>{coursereporttable instanceof Array ? coursereporttable[0].Course_title : coursereporttable?.Course_title}</td>
                      <td>{coursereporttable instanceof Array ? coursereporttable[0].Course_code : coursereporttable?.Course_code}</td>

                      <td>{coursereporttable instanceof Array ? coursereporttable[0].start_date : coursereporttable?.start_date}</td>
                      <td>{coursereporttable instanceof Array ? coursereporttable[0].end_date : coursereporttable?.end_date}</td>
                      <td>{coursereporttable instanceof Array ? coursereporttable[0].Course_category : coursereporttable?.Course_category}</td>

                      <td>{coursereporttable instanceof Array ? coursereporttable[0].Teacher_First_name : coursereporttable?.Teacher_First_name}</td>
                      <td>{coursereporttable instanceof Array ? coursereporttable[0].Student_First_name : coursereporttable?.Student_First_name}</td>
                      <td>{coursereporttable instanceof Array ? coursereporttable[0].Num_Students : coursereporttable?.Num_Students}</td>

                    </tr>


                  }
                </tbody>
              </Table>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" >
                Download in Excel
              </Button>{' '}
              <Button color="secondary" onClick={coursetableModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal isOpen={enrollmenttablemodal} toggle={enrollmenttabletoggle1} {...args} size='lg' style={{ maxWidth: '1000px' }}>

          <Form role="form">
            <ModalHeader toggle={enrollmenttabletoggle1}>Course Enrollment Report</ModalHeader>
            <ModalBody>
              <h2 className="display-8" style={{ textAlign: 'center' }}>Course Enrollment Report</h2>
              <Table className="align-items-center table-flush " responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Course Title</th>
                    <th scope="col">Course Code</th>
                    <th scope="col">Course Category</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Students Enrolled</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>

                  {Array.isArray(enrollmentreporttable) ?
                    enrollmentreporttable.map((row, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Course_title}
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Course_code}
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Course_category}
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              <Badge color="" className="badge-dot">
                                <i className="bg-info" />
                                {moment(row.start_date).format('DD-MM-YYYY')}

                              </Badge>
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              <Badge color="" className="badge-dot">
                                <i className="bg-info" />
                                {moment(row.end_date).format('DD-MM-YYYY')}

                              </Badge>
                            </span>

                          </th>

                          <td>
                            {row.Students.map((student) => (
                              <div key={student}>
                                {student}
                              </div>
                            ))}
                          </td>

                        </tr>)
                    })
                    :
                    <tr>
                      <td>{enrollmentreporttable instanceof Array ? enrollmentreporttable[0].Course_title : enrollmentreporttable?.Course_title}</td>
                      <td>{enrollmentreporttable instanceof Array ? enrollmentreporttable[0].Course_code : enrollmentreporttable?.Course_code}</td>
                      <td>{enrollmentreporttable instanceof Array ? enrollmentreporttable[0].Course_category : enrollmentreporttable?.Course_category}</td>
                      <td>{enrollmentreporttable instanceof Array ? enrollmentreporttable[0].start_date : enrollmentreporttable?.start_date}</td>
                      <td>{enrollmentreporttable instanceof Array ? enrollmentreporttable[0].end_date : enrollmentreporttable?.end_date}</td>
                      <td>{enrollmentreporttable instanceof Array ? enrollmentreporttable[0].status : enrollmentreporttable?.status}</td>
                      <td>{enrollmentreporttable instanceof Array ? enrollmentreporttable[0].Students : enrollmentreporttable?.Students}</td>

                    </tr>


                  }
                </tbody>
              </Table>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" >
                Download in Excel
              </Button>{' '}
              <Button color="secondary" onClick={enrollmenttableModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal isOpen={assignmenttablemodal} toggle={assignmenttabletoggle1} {...args} size='lg' style={{ maxWidth: '1000px' }}>
          <Form role="form">
            <ModalHeader toggle={assignmenttabletoggle1}>Student Assignment Report</ModalHeader>
            <ModalBody>
              <h2 className="display-8" style={{ textAlign: 'center' }}>Student Assignment Report</h2>
              <Table className="align-items-center table-flush " responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Assignment Title</th>
                    <th scope="col">Submission Date</th>
                    <th scope="col">Total Marks</th>
                    <th scope="col">Assignment Course</th>
                    <th scope="col">Submitted By</th>
                    <th scope="col">Obtained Marks</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>

                  {Array.isArray(assignmentreporttable) ?
                    assignmentreporttable.map((row, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Assignment_title}
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              <Badge color="" className="badge-dot">
                                <i className="bg-info" />
                                {moment(row.Date).format('DD-MM-YYYY')}

                              </Badge>
                            </span>

                          </th>

                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Total_marks}
                            </span>

                          </th>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Assignment_Course}
                            </span>

                          </th>
                          <td>
                            {row.Submitted_by.map((studentId) => (
                              <div key={studentId}>
                                {studentId}
                              </div>
                            ))}
                          </td>
                          <td>
                            {row.obtained_marks.map((obtainedmarks) => (
                              <div key={obtainedmarks}>
                                {obtainedmarks}
                              </div>
                            ))}
                          </td>
                        </tr>)
                    })
                    :
                    <tr>
                      <td>{assignmentreporttable instanceof Array ? assignmentreporttable[0].Quiz_title : assignmentreporttable?.Assignment_title}</td>
                      <td>{assignmentreporttable instanceof Array ? assignmentreporttable[0].Start_date : assignmentreporttable?.Date}</td>
                      <td>{assignmentreporttable instanceof Array ? assignmentreporttable[0].End_date : assignmentreporttable?.Total_marks}</td>
                      <td>{assignmentreporttable instanceof Array ? assignmentreporttable[0].Quiz_Course : assignmentreporttable?.Assignment_Course}</td>
                      <td>{assignmentreporttable instanceof Array ? assignmentreporttable[0].Submitted_by : assignmentreporttable?.Submitted_by}</td>
                      <td>
                        {assignmentreporttable ? (
                          assignmentreporttable instanceof Array ? (
                            assignmentreporttable[0].obtained_marks == "-1 " ? (
                              "Not Marked"
                            ) : (
                              assignmentreporttable[0].obtained_marks
                            )
                          ) : (
                            assignmentreporttable.obtained_marks == "-1" ? "Not Marked" : assignmentreporttable.obtained_marks
                          )
                        ) : null}
                      </td>
                    </tr>


                  }
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" >
                Download in Excel
              </Button>{' '}
              <Button color="secondary" onClick={assignmenttableModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal isOpen={registrationmodal} toggle={registrationtoggle1} {...args} size='lg'>
          <Form role="form" onSubmit={RegistrationReport} >
            <ModalHeader toggle={registrationtoggle1}>Student Registration Report</ModalHeader>
            <ModalBody>
              <Alert color="danger" isOpen={customerror} toggle={onDismisscustomerror}>
                <strong> Error! {errorMessage} </strong>
              </Alert>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="startdate">
                      Date From *
                    </Label>
                    <Input
                      id="startdate"
                      name="start_date"
                      placeholder="Enter start date"
                      type="date"

                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="enddate">
                      Date to *
                    </Label>
                    <Input
                      id="enddate"
                      name="end_date"
                      placeholder="Enter End date"
                      type="date"

                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup className="d-flex align-items-center">
                    <Input
                      id="time"
                      name="time"
                      placeholder="time"
                      type="checkbox"
                      style={{ width: '30px', height: '30px', marginLeft: '3px' }}

                    />
                    <Label for="time" className="ml-5">
                      All Time
                    </Label>
                  </FormGroup>
                </Col>

              </Row>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" onClick={() => settableModal(true)}>
                Generate Report
              </Button>{' '}
              <Button color="secondary" onClick={RegistrationModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal isOpen={quizmodal} toggle={quiztoggle1} {...args} size='lg'>
          <Form role="form" onSubmit={StudentQuizReport} >
            <ModalHeader toggle={quiztoggle1}>Student Quiz Report</ModalHeader>
            <ModalBody>
              <Alert color="danger" isOpen={customerror} toggle={onDismisscustomerror}>
                <strong> Error! {errorMessage} </strong>
              </Alert>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="students">
                      Select Students
                    </Label>
                    <Input
                      id="AllStudents"
                      name="students"
                      type="select"

                    >
                      <option value="all">All Students</option>
                      {usertable ?
                        usertable
                          .filter(row => row.Role === 'Student')
                          .map((row, index) => {
                            return (
                              <option key={index} value={row._id}>
                                {row.First_name} {row.Last_name}
                              </option>
                            )
                          })
                        :
                        <h1>No Student Selected Yet</h1>
                      }
                    </Input>

                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="students">
                      Select Quizes
                    </Label>

                    <Input
                      id="AllQuizes"
                      name="quizes"
                      type="select"

                    >
                      <option value="all">All Quizes</option>
                      {quiztable ?
                        quiztable

                          .map((row, index) => {
                            return (
                              <option key={index} value={row._id}>
                                {row.Quiz_title}
                              </option>
                            )
                          })
                        :
                        <h1>No Teacher Selected Yet</h1>
                      }


                    </Input>

                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="startdate">
                      Date from *
                    </Label>
                    <Input
                      id="start_date"
                      name="start_date"
                      placeholder="Enter Start date"
                      type="date"

                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="enddate">
                      Date to *
                    </Label>
                    <Input
                      id="enddate"
                      name="end_date"
                      placeholder="Enter End date"
                      type="date"

                    />
                  </FormGroup>
                </Col>
              </Row>


            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" onClick={() => setQuiztableModal(true)}>
                Generate Report
              </Button>{' '}
              <Button color="secondary" onClick={quizModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal isOpen={enrollmentmodal} toggle={enrollmenttoggle1} {...args} size='lg'>
          <Form role="form" onSubmit={EnrollmentReport}>
            <ModalHeader toggle={enrollmenttoggle1}>Course Enrollment Report</ModalHeader>
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
                      {coursetable ?
                        coursetable
                          .map((row, index) => {
                            return (
                              <option key={index} value={row._id}>
                                {row.Course_title}
                              </option>
                            )
                          })
                        :
                        <h1>No Course Selected Yet</h1>
                      }


                    </Input>

                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="startdate">
                      Date from *
                    </Label>
                    <Input
                      id="start_date"
                      name="start_date"
                      placeholder="Enter Start date"
                      type="date"

                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="enddate">
                      Date to *
                    </Label>
                    <Input
                      id="enddate"
                      name="end_date"
                      placeholder="Enter End date"
                      type="date"

                    />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" onClick={() => setenrollmenttableModal(true)}>
                Generate Report
              </Button>{' '}
              <Button color="secondary" onClick={enrollmentModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal isOpen={coursemodal} toggle={coursetoggle1} {...args} size='lg'>
          <Form role="form" onSubmit={CourseReport}>
            <ModalHeader toggle={coursetoggle1}>Course Report</ModalHeader>
            <ModalBody>
              <Alert color="danger" isOpen={customerror} toggle={onDismisscustomerror}>
                <strong> Error! {errorMessage} </strong>
              </Alert>
              <Row>

                <Col md={6}>
                  <FormGroup>
                    <Label for="category">
                      Select Course Category
                    </Label>

                    <Input
                      id="AllCategories"
                      name="category"
                      type="select"
                      onChange={handleCategoryChange} // Call the handler when category changes
                      value={selectedCategory} // Bind selectedCategory to the value
                    >
                      <option value="all">All Categories</option>
                      {coursetable ?
                        coursetable
                          .map((row, index) => {
                            return (
                              <option key={index} value={row.Course_category}>
                                {row.Course_category}
                              </option>
                            )
                          })
                        :
                        <h1>No Category Selected Yet</h1>
                      }
                    </Input>

                  </FormGroup>
                </Col>
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
                      {filteredCourses ? (
                        filteredCourses.map((row, index) => (
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

                <Col md={6}>
                  <FormGroup>
                    <Label for="startdate">
                      Date from *
                    </Label>
                    <Input
                      id="start_date"
                      name="start_date"
                      placeholder="Enter Start date"
                      type="date"

                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="enddate">
                      Date to *
                    </Label>
                    <Input
                      id="enddate"
                      name="end_date"
                      placeholder="Enter End date"
                      type="date"

                    />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" onClick={() => setcoursetableModal(true)}>
                Generate Report
              </Button>{' '}
              <Button color="secondary" onClick={courseModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal isOpen={assignmentmodal} toggle={assignmenttoggle1} {...args} size='lg'>
          <Form role="form" onSubmit={StudentAsignmentReport}>
            <ModalHeader toggle={assignmenttoggle1}>Student Assignment Report</ModalHeader>
            <ModalBody>
              <Alert color="danger" isOpen={customerror} toggle={onDismisscustomerror}>
                <strong> Error! {errorMessage} </strong>
              </Alert>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="students">
                      Select Students
                    </Label>
                    <Input
                      id="AllStudents"
                      name="students"
                      type="select"

                    >
                      <option value="all">All Students</option>
                      {usertable ?
                        usertable
                          .filter(row => row.Role === 'Student')
                          .map((row, index) => {
                            return (
                              <option key={index} value={row._id}>
                                {row.First_name} {row.Last_name}
                              </option>
                            )
                          })
                        :
                        <h1>No Student Selected Yet</h1>
                      }
                    </Input>

                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="assignments">
                      Select Assignments
                    </Label>

                    <Input
                      id="AllAssignments"
                      name="assignments"
                      type="select"
                    >
                      <option value="all">All Assignments</option>
                      {Assignmenttable ?
                        Assignmenttable
                          .map((row, index) => {
                            return (
                              <option key={index} value={row._id}>
                                {row.Assignment_title}
                              </option>
                            )
                          })
                        :
                        <h1>No Assignment Selected Yet</h1>
                      }


                    </Input>

                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="startdate">
                      Date from *
                    </Label>
                    <Input
                      id="start_date"
                      name="start_date"
                      placeholder="Enter Start date"
                      type="date"

                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="enddate">
                      Date to *
                    </Label>
                    <Input
                      id="enddate"
                      name="end_date"
                      placeholder="Enter End date"
                      type="date"

                    />
                  </FormGroup>
                </Col>
              </Row>


            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" onClick={() => setAssignmenttableModal(true)}>
                Generate Report
              </Button>{' '}
              <Button color="secondary" onClick={assignmentModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal isOpen={modal} toggle={toggle} {...args} size='lg'>
          <Form>
            <ModalHeader toggle={toggle}>Student Wise Report</ModalHeader>
            <ModalBody>
              <Row className="align-items-center mb-3">
                <div className="col">

                  <Button
                    color="success"
                    size="lg"
                    onClick={registrationtoggle1}
                  >
                    Registration Report
                  </Button>
                </div>
              </Row>
              <Row className="align-items-center mb-3">
                <div className="col">
                  <Button
                    color="success"
                    size="lg"
                    onClick={quiztoggle1}
                  >
                    Quiz Report
                  </Button>
                </div>
              </Row>
              <Row className="align-items-center mb-3">
                <div className="col">
                  <Button
                    color="success"
                    size="lg"
                    onClick={assignmenttoggle1}
                  >
                    Assignment Report
                  </Button>
                </div>
              </Row>
              <Row className="align-items-center mb-3">
                <div className="col">
                  <Button
                    color="success"
                    size="lg"
                    onClick={enrollmenttoggle1}
                  >
                    Enrollment Report
                  </Button>
                </div>
              </Row>
            </ModalBody>
            <ModalFooter>

              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal isOpen={teachermodal} toggle={teachertoggle} {...args} size='lg'>
          <Form role="form" onSubmit={TeacherReport}>
            <ModalHeader toggle={teachertoggle}>Teacher Wise Report</ModalHeader>
            <ModalBody>
              <Alert color="danger" isOpen={customerror} toggle={onDismisscustomerror}>
                <strong> Error! {errorMessage} </strong>
              </Alert>
              <Row>

                <Col md={6}>
                  <FormGroup>
                    <Label for="courses">
                      Select Teacher
                    </Label>

                    <Input
                      id="AllTeachers"
                      name="teachers"
                      type="select"
                    >
                      <option value="all">All Teachers</option>
                      {usertable ?
                        usertable
                          .filter(row => row.Role === 'Teacher')
                          .map((row, index) => {
                            return (
                              <option key={index} value={row._id}>
                                {row.First_name} {row.Last_name}
                              </option>
                            )
                          })
                        :
                        <h1>No Teacher Selected Yet</h1>
                      }


                    </Input>

                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="startdate">
                      Date from *
                    </Label>
                    <Input
                      id="start_date"
                      name="start_date"
                      placeholder="Enter Start date"
                      type="date"

                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="enddate">
                      Date to *
                    </Label>
                    <Input
                      id="enddate"
                      name="end_date"
                      placeholder="Enter End date"
                      type="date"

                    />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" onClick={() => setteachertableModal(true)}>
                Generate Report
              </Button>{' '}
              <Button color="secondary" onClick={teachertoggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <div className="container-fluid py-5" >
          <div className="container py-5" style={{ marginTop: "-80px" }}>

            <div className="row align-items-center">
              <div className="col-lg-5 mb-5 mb-lg-0">
                <div
                  className="bg-light d-flex flex-column justify-content-center px-5"
                  style={{
                    height: "450px",
                    backgroundImage: `url(${report})`, // Replace with your image URL
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Your content goes here */}
                </div>
              </div>
              <div className="col-lg-7">
                <div className="section-title position-relative mb-4">
                  <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">Reports?</h6>
                  <h3 className="display-6">Generate Reports</h3>
                </div>
                <div className="contact-form">
                  <Row className="align-items-center mb-3">
                    <div className="col">
                      <Button
                        color="success"
                        size="lg"
                        onClick={toggle}
                      >
                        Student Report
                      </Button>
                    </div>
                  </Row>
                  <Row className="align-items-center mb-3">
                    <div className="col">
                      <Button
                        color="success"
                        size="lg"
                        onClick={teachertoggle}
                      >
                        Teacher Report
                      </Button>
                    </div>
                  </Row>
                  <Row className="align-items-center">
                    <div className="col">
                      <Button
                        color="success"
                        size="lg"
                        onClick={coursetoggle}
                      >
                        Course Report
                      </Button>
                    </div>
                  </Row>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
};
export default Reports;
