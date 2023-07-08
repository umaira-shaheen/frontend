import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Editor } from "@tinymce/tinymce-react";
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
const Assignment = (args) => {
  const history = useHistory();
  var moment = require('moment');
  const [Assignmenttable, setAssignmenttable] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const closeModal = () => setModal(false);
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
  const [editorContent, setEditorContent] = useState(null);
  const edittoggle1 = (event) => {
    setEditModal(!editmodal);
  };

  const HandleEditor = (content, editor) => {
    setEditorContent(content)
  }

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

  const [id, setAssignmentid] = useState(null);
  const [Assignment_title, setAssignmentTitle] = useState(null);
  const [Description, setdescription] = useState(null);
  const [status, setStatus] = useState(null);
  const [total_marks, setmarks] = useState(null);
  const [date, setdate] = useState(null);
  const [rerender, setRerender] = useState(false);
  function DeleteAssignment() {
    axios({     //DeleteCourse API Calling
      method: 'get',
      withCredentials: true,
      sameSite: 'none',
      url: "http://localhost:8000/Assignment/DeleteAssignment?temp_id=" + tempId
    })
      .then(res => {
        if (res.data.indicator == "success") {
          setdeleteSuccess(true);
          GetAssignment();
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
        if (error && error.response) {
          if (error.response.data && error.response.data == "Not logged in") {
            localStorage.clear(); // Clear local storage
            history.push('/auth/login');
          }
        }
        console.log(error);
        setErrorMessage("Network Error!");
        setError(true);
        setdeleteModal(!deletemodal);
      })

  };

  function AddAssignment(e) {
    e.preventDefault();
    const assignment_title = e.target.assignment_title.value;
    const date = e.target.date.value;
    const total_marks = e.target.total_marks.value;
    const status = e.target.status.value;
    const description = editorContent;
    axios({    //AddUser API Calling
      method: 'post',
      withCredentials: true,
      sameSite: 'none',
      url: "http://localhost:8000/Assignment/AddAssignment",
      data: { assignment_title: assignment_title, date: date, total_marks: total_marks, status: status, description: description },
    })
      .then(res => {
        if (res.data == "success") {
          setaddSuccess(true);
          GetAssignment();
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
        if (error && error.response) {
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

  useEffect(() => {
    // Update the document title using the browser API

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
  }, []);
  function EditAssignment(e) {
    e.preventDefault();
    const assignment_title = e.target.assignment_title.value;
    const date = e.target.date.value;
    const total_marks = e.target.marks.value;
    const description = editorContent;
    const status = e.target.status.value;

    
    axios({     //edit Course on the base of id API Calling
      method: 'post',
      withCredentials: true,
      sameSite: 'none',
      url: "http://localhost:8000/Assignment/EditAssignment",
      data: { id: id, assignment_title: assignment_title, date: date, total_marks: total_marks, status: status, description: description },
    })
      .then(res => {
        if (res.data == "success") {
          seteditSuccess(true);
          GetAssignment();
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
        if (error && error.response) {
          if (error.response.data && error.response.data == "Not logged in") {
            localStorage.clear(); // Clear local storage
            history.push('/auth/login');
          }
        }
        setErrorMessage("Failed to connect to backend");
        setError(true);
        console.log(error);

      })
  };

  // !#################################### FIND COURSE FUNCTION ##############################################



  function FindAssignment(id) {

    axios({     //FindOneCourse on the base of id API Calling
      method: 'get',
      withCredentials: true,
      sameSite: 'none',
      url: "http://localhost:8000/Assignment/Findassignment?temp_id=" + id
    })
      .then(res => {
        if (res.data) {

          setAssignmentid(res.data._id);
          setAssignmentTitle(res.data.Assignment_title);
          setdate(res.data.Date);
          setdescription(res.data.description);
          console.log(res.data);
          setmarks(res.data.Total_marks);
          setStatus(res.data.Status);
          setEditModal(!editmodal);

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
        setError(true);
        setEditModal(!editmodal);
      })
  };
  useEffect(() => {
    // Update the document title using the browser API

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
        
        if(error && error.response)
        {
          if (error.response.data && error.response.data == "Not logged in") {
              localStorage.clear(); // Clear local storage
              history.push('/auth/login');
          }
        }
        console.log(error);
      })
  }, []);
  return (
    <>
      <NewHeader />
      <Container className="mt--7" fluid>
        <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
          <strong> New Assignment Added! </strong>
        </Alert>
        <Alert color="danger" isOpen={error} toggle={onDismiss}>
          <strong>Error! </strong> {errorMessage}
        </Alert>
        <Alert color="success" isOpen={deletesuccess} toggle={onDismissdeleteSuccess}>
          <strong> Assignment deleted successfully! </strong>
        </Alert>
        <Alert color="success" isOpen={editsuccess} toggle={onDismisseditSuccess}>
          <strong> Assignment Updated successfully! </strong>
        </Alert>
        {/* Delete modal */}

        <Modal isOpen={deletemodal} toggle={DeletetoggleClose} {...args} size='sm'>
          <ModalHeader toggle={DeletetoggleClose} >Delete Assignment</ModalHeader>
          <ModalBody>
            Are you sure you want to delete <b>{tempName}</b> Assignment?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => { DeleteAssignment() }}>
              Delete
            </Button>{' '}
            <Button color="secondary" onClick={DeletetoggleClose}>
              Cancel
            </Button>
          </ModalFooter>

        </Modal>
        <Modal isOpen={modal} toggle={toggle} {...args} size='lg'>
          <Form role="form" onSubmit={AddAssignment}>
            <ModalHeader toggle={toggle}>Add new Assignment</ModalHeader>

            <ModalBody>
              <Row >
                <Col md={6}>
                  <FormGroup>
                    <Label for="assignment_title">
                      Assignment Title
                    </Label>
                    <Input
                      id="assignment_title"
                      name="assignment_title"
                      placeholder="Enter Assignment Title"
                      type="text"
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>

                  <FormGroup>
                    <Label for="date">
                      Submission Date
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      placeholder="Submission Deadline"
                      type="date"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="marks">
                      Total Marks
                    </Label>
                    <Input
                      id="marks"
                      name="total_marks"
                      placeholder="Total Marks"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="status">
                      Assignment Status
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
                <Col md={12}>
                  <FormGroup>
                    <Label for="date">
                      Assignment Description
                    </Label>
                    <Editor
                      initialValue='Assignment Description'
                      onEditorChange={HandleEditor}
                    />
                  </FormGroup>
                </Col>
              </Row>


            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Add Assignment
              </Button>{' '}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        {/* Edit modal */}
        <Modal isOpen={editmodal} toggle={edittoggle1} {...args} size='lg'>
          <Form role="form" onSubmit={EditAssignment} >
            <ModalHeader toggle={edittoggle1}>Update Assignment</ModalHeader>
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
                    <Label for="assignment_title">
                      Assignment Title
                    </Label>
                    <Input
                      id="assignment_title"
                      name="assignment_title"
                      placeholder="Enter Assignment Title"
                      type="text"
                      defaultValue={Assignment_title}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="date">
                      Submission Date
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      placeholder="Submission Date"
                      type='date'
                      defaultValue={new Date(date).toISOString().split('T')[0]}
                    />

                  </FormGroup>
                </Col>

              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="marks">
                      Total Marks
                    </Label>
                    <Input
                      id="marks"
                      name="marks"
                      placeholder="Total Marks"
                      type='text'
                      defaultValue={total_marks}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="status">
                      Assignment Status
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
                <Col md={12}>
                  <FormGroup>
                    <Label for="date">
                      Assignment Description
                    </Label>
                    <Editor
                      initialValue='Assignment Description'
                      value={Description}
                      onEditorChange={HandleEditor}
                    />
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
                    <h3 className="mb-0">Course Assignment</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={toggle}
                      size="md"
                    >
                      Add new Assignment
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>

                <thead className="thead-light">
                  <tr>
                    <th scope="col">Assignment Title</th>
                   
                    <th scope="col">Submission Date</th>
                    <th scope="col">Total Marks</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>

                  {Assignmenttable ?
                    Assignmenttable.map((row, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">
                            {/* <i className="ni ni-book-bookmark text-blue"/> */}
                            <span className="mb-0 text-sm">
                              {row.Assignment_title}
                            </span>

                          </th>

                        
                          <td>
                            <Badge color="" className="badge-dot">
                              <i className="bg-info" />
                              {moment(row.Date).format('DD-MM-YYYY')}
                            </Badge>
                          </td>
                          <td>{row.Total_marks}</td>
                          <td>{row.Status}</td>
                          <td>
                            <Button color="primary" onClick={() => { FindAssignment(row._id) }}>
                              Edit
                              {/* <i className="ni ni-active-40"></i> */}
                            </Button>
                            <Button color="danger" onClick={() => { Deletetoggle(row._id, row.Assignment_title) }}>
                              Delete
                              {/* <i className="ni ni-fat-remove"></i> */}
                            </Button>
                          </td>

                        </tr>)
                    })
                    :
                    <tr>
                      <td span="5">No Assignment found!</td>
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

export default Assignment;