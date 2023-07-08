import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
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
const Quiz = (args) => {
  const history = useHistory();
  var moment = require('moment');
  const [quiztable, setquiztable] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  
  const [error, setError] = useState(false);
  const [addsuccess, setaddSuccess] = useState(false);
  const onDismissaddSuccess = () => setaddSuccess(false);
  const onDismiss = () => setError(false);
  const [editsuccess, seteditSuccess] = useState(false);
  const [deletesuccess, setdeleteSuccess] = useState(false);
  const [tempId, setTempId] = useState('');
  const [tempName, setTempName] = useState('');
  const onDismissdeleteSuccess = () => setdeleteSuccess(false);
  const onDismisseditSuccess = () => seteditSuccess(false);
  const [editmodal, setEditModal] = useState(false);
  const [deletemodal, setdeleteModal] = useState(false);
  const [rerender, setRerender] = useState(false);
  const edittoggle1 = (event) => {
    setEditModal(!editmodal);
  };

  const Deletetoggle = (id, name) => {
    setTempName(name);
    setTempId(id);
    setdeleteModal(!deletemodal);
    // DeleteCourse(id) ;
  };
  const editModalClose = () => {
    setEditModal(!editmodal);
  }
  const DeletetoggleClose = () => {
    setdeleteModal(!deletemodal);
  }

  const [id, setQuizid] = useState(null);
  const [quiz_title, setQuizTitle] = useState(null);
  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [status, setStatus] = useState(null);
  function DeleteQuiz() {
    axios({     //DeleteCourse API Calling
      method: 'get',
      url: "http://localhost:8000/Quiz/DeleteQuiz?temp_id=" + tempId
    })
      .then(res => {
        if (res.data.indicator == "success") {
          setdeleteSuccess(true);
          GetQuiz();
          setRerender(!rerender);

        }
        else {
          setError(true);
          setErrorMessage(res.data.messege.message);
        }
        setdeleteModal(!deletemodal);
        // window.location.reload(false);
      })
      .catch(error => {
      
        if (error.response.data == "Not logged in") {
            localStorage.clear(); // Clear local storage
            history.push('/auth/login');
        }
        console.log(error);
        setErrorMessage("Network Error!");
        setError(true);
        setdeleteModal(!deletemodal);
      })

  };
  const closeModal = () => setModal(false);
  function AddQuiz(e) {
    e.preventDefault();
    const quiz_title = e.target.quiz_title.value;
    const start_date = e.target.start_date.value;
    const end_date = e.target.end_date.value;
    const questions = e.target.questions.value;
    const status=e.target.status.value;
    axios({    //AddUser API Calling
      method: 'post',
      withCredentials: true,
      sameSite: 'none',
      url: "http://localhost:8000/Quiz/AddQuiz",
      data: { quiz_title: quiz_title, start_date: start_date, end_date: end_date, questions: questions, status:status },
    })
      .then(res => {
        if(res.data == "success") {
          setaddSuccess(true);
          GetQuiz();
          setRerender(!rerender);
        }
        else {
          setErrorMessage(res.data);
          setError(true);
        }
        closeModal();
        // window.location.reload(false);
      })
      .catch(error => {
        console.log(error)
        if(error && error.response)
        {
          if (error.response.data && error.response.data == "Not logged in") {
              localStorage.clear(); // Clear local storage
              history.push('/auth/login');
          }
        }
        setErrorMessage("Failed to connect to backend")
        setError(true);
        closeModal();
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
          if(error && error.response)
          {
            if (error.response.data && error.response.data == "Not logged in") {
                localStorage.clear(); // Clear local storage
                history.push('/auth/login');
            }
          }
        
        })
  }

  useEffect(() => {
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
        console.log(error);
       
        if(error && error.response)
        {
          if (error.response.data && error.response.data == "Not logged in") {
              localStorage.clear(); // Clear local storage
              history.push('/auth/login');
          }
        }
      })
  }, []);
  function EditQuiz(e) {
    const quiz_title = e.target.quiz_title.value;
    const start_date = e.target.start_date.value;
    const end_date = e.target.end_date.value;
    const questions = e.target.questions.value;
    const status=e.target.status.value;
    e.preventDefault();
    axios({     //edit Course on the base of id API Calling
      method: 'post',
      withCredentials: true,
      sameSite: 'none',
      url: "http://localhost:8000/Quiz/EditQuiz",
      data: { id: id, quiz_title: quiz_title, start_date: start_date, end_date: end_date, questions: questions, status:status },
    })
      .then(res => {
        if (res.data == "success") {
          seteditSuccess(true);
          GetQuiz();
          setRerender(!rerender);
        }
        else {
          setErrorMessage(res.data);
          setError(true);
        }
        setEditModal(!editmodal);

      })
      .catch(error => {
        console.log(error)
        if (error.response.data == "Not logged in") {
            localStorage.clear(); // Clear local storage
            history.push('/auth/login');
        }
        setErrorMessage("Failed to connect to backend");
        setError(true);
        console.log(error);

      })
  };

  // !#################################### FIND COURSE FUNCTION ##############################################

  function FindQuiz(id) {

    axios({     //FindOneCourse on the base of id API Calling
      method: 'get',
      withCredentials: true,
      sameSite: 'none',
      url: "http://localhost:8000/Quiz/FindQuiz?temp_id=" + id
    })
      .then(res => {
        if (res.data) {
          setQuizid(res.data._id);
          setQuizTitle(res.data.Quiz_title);
          setstartdate(res.data.Start_date);
          setenddate(res.data.End_date);
          setQuestions(res.data.Questions);
          setStatus(res.data.Status)
          setEditModal(!editmodal);

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
        setEditModal(!editmodal);
      })
  };

  return (
    <>
      <NewHeader />
      <Container className="mt--7" fluid>
        <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
          <strong> New Quiz Added! </strong>
        </Alert>
        <Alert color="danger" isOpen={error} toggle={onDismiss}>
          <strong>Error! </strong> {errorMessage}
        </Alert>
        <Alert color="success" isOpen={deletesuccess} toggle={onDismissdeleteSuccess}>
          <strong> Quiz deleted successfully! </strong>
        </Alert>
        <Alert color="success" isOpen={editsuccess} toggle={onDismisseditSuccess}>
          <strong> Quiz Updated successfully! </strong>
        </Alert>
        {/* Delete modal */}

        <Modal isOpen={deletemodal} toggle={DeletetoggleClose} {...args} size='sm'>
          <ModalHeader toggle={DeletetoggleClose} >Delete Quiz</ModalHeader>
          <ModalBody>
            Are you sure you want to delete <b>{tempName}</b> Quiz?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => { DeleteQuiz() }}>
              Delete
            </Button>{' '}
            <Button color="secondary" onClick={DeletetoggleClose}>
              Cancel
            </Button>
          </ModalFooter>

        </Modal>
        
        <Modal isOpen={modal} toggle={toggle} {...args} size='lg'>
          <Form role="form" onSubmit={AddQuiz}>
            <ModalHeader toggle={toggle}>Add new Quiz</ModalHeader>
            <ModalBody>
              <Row >
                <Col md={6}>
                  <FormGroup>
                    <Label for="quiz_title">
                      Quiz Title
                    </Label>
                    <Input
                      id="quiz_title"
                      name="quiz_title"
                      placeholder="Enter Quiz Title"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="start_date">
                      Quiz Start Date
                    </Label>
                    <Input
                      id="start_date"
                      name="start_date"
                      placeholder="Enter Quiz Start Date"
                      type="date"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="end_date">
                      Quiz End Date
                    </Label>
                    <Input
                      id="end_date"
                      name="end_date"
                      placeholder="Enter Quiz End Date"
                      type="date"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="questions">
                      Total Questions
                    </Label>
                    <Input
                      id="questions"
                      name="questions"
                      placeholder="Total Questions"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                
                <Col md={6}>
                  <FormGroup>
                    <Label for="status">
                      Quiz Status
                    </Label>
                    <Input
                      id="status"
                      name="status"
                      type="select"
                     
                    >
                      <option value="Draft">
                        Draft
                      </option>
                      <option value="Publish">
                        Publish
                      </option>
                     
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
             


            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Add Quiz
              </Button>{' '}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        {/* Edit modal */}
        <Modal isOpen={editmodal} toggle={edittoggle1} {...args} size='lg'>
          <Form role="form" onSubmit={EditQuiz} >
            <ModalHeader toggle={edittoggle1}>Update Quiz</ModalHeader>
            <ModalBody>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label
                      for="id"
                      hidden
                    >
                      ID
                    </Label>
                    <Input
                      id="id"
                      name="id"
                      placeholder="quiz id"
                      type="hidden"
                      value={id}
                    />
                    <Label for="quiz_title">
                      Quiz Title
                    </Label>
                    <Input
                      id="quiz_title"
                      name="quiz_title"
                      placeholder="Enter Quiz Title"
                      type="text"
                      defaultValue={quiz_title}
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
                      name="start_date"
                      placeholder="Enter start date"
                      type="date"
                      defaultValue={new Date(startdate).toISOString().split('T')[0]}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="enddate">
                      End Date
                    </Label>
                    <Input
                      id="enddate"
                      name="end_date"
                      placeholder="Enter End date"
                      type="date"
                      defaultValue={new Date(enddate).toISOString().split('T')[0]}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="questions">
                      Questions
                    </Label>
                    <Input
                      id="questions"
                      name="questions"
                      placeholder="Total Questions"
                      type='text'
                      defaultValue={questions}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="status">
                      Quiz Status
                    </Label>
                    <Input
                      id="status"
                      name="status"
                      type="select"
                     defaultValue={status}
                    >
                      <option value="Draft">
                        Draft
                      </option>
                      <option value="Publish">
                        Publish
                      </option>
                     
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" >
                Update
              </Button>{' '}
              <Button color="secondary" onClick={editModalClose}>
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
                    <h3 className="mb-0">Course Quiz</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={toggle}
                      size="md"
                    >
                      Add new Quiz
                    </Button>
                    
                  </div>

                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>

                <thead className="thead-light">
                  <tr>
                    <th scope="col">Course title</th>
                    <th scope="col">Quiz start Date</th>
                    <th scope="col">Quiz End Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Total Questions</th>
                   

                    <th scope="col">Description</th>
                    <th scope="col">Action</th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>

                  {quiztable ?
                    quiztable.map((row, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Quiz_title}
                            </span>

                          </th>

                          <td>
                            <Badge color="" className="badge-dot">
                              <i className="bg-info" />
                              {moment(row.Start_date).format('DD-MM-YYYY')}

                            </Badge>
                          </td>
                          <td>
                            <Badge color="" className="badge-dot">
                              <i className="bg-info" />
                              {moment(row.End_date).format('DD-MM-YYYY')}
                            </Badge>
                          </td>
                          <td>{row.Status}</td>
                          <td>{row.Questions}</td>
                          
                          <td>
                            <Button color="success" >
                              View Question
                            </Button>
                          </td>
                          <td>
                            <Button color="primary" onClick={() => { FindQuiz(row._id) }}>
                              Edit
                              {/* <i className="ni ni-active-40"></i> */}
                            </Button>
                            <Button color="danger" onClick={() => { Deletetoggle(row._id, row.Quiz_title) }}>
                              Delete
                              {/* <i className="ni ni-fat-remove"></i> */}
                            </Button>
                          </td>

                        </tr>)
                    })
                    :
                    <tr>
                      <td span="5">No Quiz found!</td>
                    </tr>
                  }
                </tbody>
              </Table>

            </Card>
          </div>
        </Row>


      </Container>
    </>

  )
}

export default Quiz;