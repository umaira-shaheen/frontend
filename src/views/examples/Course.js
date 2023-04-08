import React, { useState,useEffect } from 'react';
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
// import AdminFooter from "components/Footers/AdminFooter.js";
const Course = (args) => {
  var moment = require('moment');
  const [id, setCourseid] = useState(null);
  const [coursetable, setCoursetable] = useState(null);
  const [coursename, setCourseName]=useState(null);
  const[coursecode,setCoursecode]=useState(null);
  const[startdate, setstartdate]=useState(null);
  const[enddate,setenddate]=useState(null);
  const[description,setCoursedescription]=useState(null);
  const[category,setCoursecategory]=useState(null);
  const[rerender,setRerender]=useState(false);

  
  
//  !#################################### Delete COURSE FUNCTION ##############################################

  function DeleteCourse()
  {
    axios({     //DeleteCourse API Calling
      method:'get',
      url:"http://localhost:8000/course/DeleteCourse?temp_id="+tempId
    })
    .then(res=>{
      if(res.data.indicator=="success")
      {
        setdeleteSuccess(true); 
       
      }
      else{
        setError(true);
        setErrorMessage(res.data.messege.message);
      }
      setdeleteModal(!deletemodal); 
      // window.location.reload(false);
    })
    .catch(error=>{
      console.log(error);
      setErrorMessage("Network Error!");
      setError(true);
      setdeleteModal(!deletemodal); 
    })
    
  };

  function EditCourse(e)
  {
    const course_name=e.target.Coursename.value;
    const course_code=e.target.coursecode.value;
    const start_date=e.target.startdate.value;
    const end_date=e.target.enddate.value;
    const Category=e.target.category.value;
    const Description=e.target.description.value;
    e.preventDefault();
    axios({     //edit Course on the base of id API Calling
      method:'post',
      url:"http://localhost:8000/course/EditCourse",
      data:{id:id,course_name:course_name, course_code:course_code , start_date:start_date, end_date:end_date, Description:Description,Category:Category},
    })
    .then(res=>{
      if(res.data == "success")
      {
        seteditSuccess(true); 
        GetCourse();
        setRerender(!rerender);
      }
      else
      {
        setErrorMessage(res.data);
        setError(true);
      }
      setEditModal(!editmodal); 
      
    })
    .catch(error=>{

      setErrorMessage("Failed to connect to backend");
      setError(true);
      console.log(error);
     
    })
  };

// !#################################### FIND COURSE FUNCTION ##############################################

  function FindCourse(id)
  {

    axios({     //FindOneCourse on the base of id API Calling
      method:'get',
      url:"http://localhost:8000/course/FindCourse?temp_id="+id
    })
    .then(res=>{
      if(res.data)
      {
        setCourseid(res.data._id);
        setCourseName(res.data.Course_title);
        setCoursecode(res.data.Course_code);
        setCoursecategory(res.data.Course_category);
        setstartdate(res.data.start_date);
        setenddate(res.data.end_date);
        setCoursedescription(res.data.description);
        setEditModal(!editmodal);
       
      }
        
    })
    .catch(error=>{
      
      console.log(error);
      setError(true);
      setEditModal(!editmodal); 
    })
  };
    
  const [error, setError] = useState(false);
  const [addsuccess, setaddSuccess] = useState(false);
  const [editsuccess, seteditSuccess] = useState(false);
  const [deletesuccess, setdeleteSuccess] = useState(false);
  const [tempId, setTempId] = useState('');
  const [tempName, setTempName] = useState('');
  
// !#################################### Get Course Api ##############################################
 function GetCourse(e)
  {
    axios({ 
      method:'get',
      url:"http://localhost:8000/course/GetCourse",
    })
    .then(res=>{
      if(res.data)
      {
        setCoursetable(res.data)
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }

  useEffect(() => {
  GetCourse();
  }, []);
// !#################################### Add COURSE FUNCTION ##############################################

  function AddCourse(e)
  {
    e.preventDefault();
    // console.log(e.target.category.value)
    const course_name=e.target.Coursename.value;
    const course_code=e.target.coursecode.value;
    const start_date=e.target.startdate.value;
    const end_date=e.target.enddate.value;
    const Category=e.target.category.value;
    const Description=e.target.description.value;
    axios({    //AddCourse API Calling
      method:'post',
      url:"http://localhost:8000/course/AddCourse",
      data:{course_name:course_name, course_code:course_code , start_date:start_date, end_date:end_date, Description:Description,Category:Category},
    })
    .then(res=>{
      if(res.data == "success")
      {
        setaddSuccess(true);
        GetCourse();
        setRerender(!rerender);
      }
      else
      {
        setErrorMessage(res.data);
        setError(true);
      }
      closeModal();
      // window.location.reload(false);
    })
    .catch(error=>{
      setErrorMessage("Failed to connect to backend")
      setError(true);
      closeModal();
    })
  }
  const onDismiss = () => setError(false); 
  const onDismissaddSuccess = () => setaddSuccess(false); 
  const onDismissdeleteSuccess = () => setdeleteSuccess(false); 
  const onDismisseditSuccess = () => seteditSuccess(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const [modal, setModal] = useState(false);
  const[editmodal, setEditModal]=useState(false);
  const [deletemodal, setdeleteModal] = useState(false);
  const toggle = () => setModal(!modal);
  
  const edittoggle1=(event)=>
  {
    setEditModal(!editmodal);
  };

  const Deletetoggle = (id, name) => { 
    setTempName(name);
    setTempId(id);
    setdeleteModal(!deletemodal);
    // DeleteCourse(id) ;
  };
  const editModalClose=()=>
  {
    setEditModal(!editmodal); 
  }
  const DeletetoggleClose = () => {
    setdeleteModal(!deletemodal); 
  }
  const closeModal = () => setModal(false);

  
  return (
    <>
      <NewHeader />
      <Container className="mt--7" fluid>
      
        <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
          <strong> Course Registered! </strong> 
        </Alert>
        <Alert color="danger" isOpen={error} toggle={onDismiss}>
          <strong>Error! </strong> { errorMessage }
        </Alert>
        <Alert color="success" isOpen={deletesuccess} toggle={onDismissdeleteSuccess}>
          <strong> Course deleted successfully! </strong> 
        </Alert>
        <Alert color="success" isOpen={editsuccess} toggle={onDismisseditSuccess}>
          <strong> Course Updated successfully! </strong> 
        </Alert>
        <Modal isOpen={modal} toggle={toggle} {...args} size='lg'>
        <Form  role="form" onSubmit={AddCourse}>
          <ModalHeader toggle={toggle}>Add new Course</ModalHeader>
          <ModalBody>
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
              <Row>
                <Col md={12}>
              <FormGroup>
                <Label for="description">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Course Description"
                  type='textarea'
                />
              </FormGroup>
              </Col>
              </Row>
              <Row>
                <Col md={12}>
                <FormGroup>
                  <Label for="category">
                    Course Category
                  </Label>
                  <Input
                    id="category"
                    name="category"
                    type="select"
                  >  
                    <option value="English">
                      English
                    </option>
                    <option value="Science">
                      Science
                    </option>
                    <option value="Technology">
                      Technology
                    </option>
                    <option value="Visa">
                      Visa 
                    </option>
                    <option value="Mathematics">
                      Mathematics
                    </option>
                    <option value="Computer">
                      Computer
                    </option>
                  </Input>
                </FormGroup>
              </Col>
              </Row>

            
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" >
              Add Course
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
        </Modal>
      
       {/* Edit modal */}
        <Modal isOpen={editmodal} toggle={edittoggle1} {...args} size='lg'>
        <Form  role="form" onSubmit={EditCourse} >
          <ModalHeader toggle={edittoggle1}>Update Course</ModalHeader>
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
                    placeholder="course id"
                    type="hidden"
                    value={id}
                  />
                    <Label for="Coursename">
                      Course name
                    </Label>
                    <Input
                      id="course_name"
                      name="Coursename"
                      placeholder="Enter Course Name"
                      type="text"
                     defaultValue={coursename}
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
                      defaultValue={coursecode}
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
                      name="enddate"
                      placeholder="Enter End date"
                      type="date"
                      defaultValue={new Date(enddate).toISOString().split('T')[0]}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
              <FormGroup>
                <Label for="description">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Course Description"
                  type='textarea'
                  defaultValue={description}
                />
              </FormGroup>
              </Col>
              </Row>
              <Row>
                <Col md={12}>
                <FormGroup>
                  <Label for="category">
                    Course Category
                  </Label>
                  <Input
                    id="category"
                    name="category"
                    type="select"
                    defaultValue={category}
                  >  
                    <option value="English">
                      English
                    </option>
                    <option value="Science">
                      Science
                    </option>
                    <option value="Technology">
                      Technology
                    </option>
                    <option value="Visa">
                      Visa 
                    </option>
                    <option value="Mathematics">
                      Mathematics
                    </option>
                    <option value="Computer">
                      Computer
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
        {/* Delete modal */}
 
        <Modal isOpen={deletemodal} toggle={DeletetoggleClose} {...args} size='sm'>
          <ModalHeader toggle={DeletetoggleClose} >Delete Course</ModalHeader>
          <ModalBody>
            Are you sure you want to delete <b>{tempName}</b>?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => {DeleteCourse()}}>
              Delete
            </Button>{' '}
            <Button color="secondary" onClick={DeletetoggleClose}>
              Cancel
            </Button>
          </ModalFooter>

          </Modal>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Courses</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={toggle}
                      size="md"
                    >
                      Add new Course
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              {/* <CardHeader className="border-0">
                <h3 className="mb-0">Courses</h3>
               
              </CardHeader> */}
              <Table className="align-items-center table-flush" responsive>
               {/* AllCourses.map(function(item, i){
                  console.log('test');
                  return <li key={i}>Test</li>
                }) */}
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Course title</th>
                    <th scope="col">Course Code</th>
                    <th scope="col">start date</th>
                    <th scope="col">End date</th>
                    <th scope="col">Category</th>
                    <th scope="col">Action</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>

                { coursetable ?
                  coursetable.map((row, index) => {
                  return(
                  <tr key={index}>
                    <th scope="row">
                      {/* <i className="ni ni-book-bookmark text-blue"/> */}
                      <span className="mb-0 text-sm">
                        {row.Course_title}
                      </span>

                    </th>
                    <td>{row.Course_code}</td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                        {moment(row.start_date).format('DD-MM-YYYY')}
                      
                      </Badge>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                        {moment(row.end_date).format('DD-MM-YYYY')}
                      </Badge>
                    </td>
                    <td>{row.Course_category}</td>
                    <td>
                      <Button color="primary"   onClick={() => {FindCourse(row._id)}}>
                      <i className="ni ni-active-40"></i>
                      </Button>
                      <Button color="danger" onClick={() => {Deletetoggle(row._id,row.Course_title)}}>
                        <i className="ni ni-fat-remove"></i>
                      </Button>
                    </td>

                  </tr> )
                  })
                  :
                  <tr>
                    <td span="5">No course found!</td>
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

export default Course;