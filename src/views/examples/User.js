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

const User = (args) => {
    const [usertable, setUsertable] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const closeModal = () => setModal(false);
    const [error, setError] = useState(false);
    const [addsuccess, setaddSuccess] = useState(false);
    const onDismissaddSuccess = () => setaddSuccess(false); 
    const onDismiss = () => setError(false); 
    const[editmodal, setEditModal]=useState(false);
    const [deletemodal, setdeleteModal] = useState(false);
    const onDismissdeleteSuccess = () => setdeleteSuccess(false); 
    const onDismisseditSuccess = () => seteditSuccess(false); 
    const [editsuccess, seteditSuccess] = useState(false);
    const [deletesuccess, setdeleteSuccess] = useState(false);
    const [tempId, setTempId] = useState('');
    const [tempName, setTempName] = useState('');
    const [id, setUserid] = useState(null);
    const [firstname, setFirstName]=useState(null);
    const[lastname,setLastName]=useState(null);
    const[email, setEmail]=useState(null);
    const[phoneno,setPhoneno]=useState(null);
    const[address,setAddress]=useState(null);
    const[role,setRole]=useState(null);
    const [rerender, setRerender] = useState(false);
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

    function GetUser(e)
  {
    
   useEffect(() => {
    // Update the document title using the browser API
    
    axios({ 
      method:'get',
      url:"http://localhost:8000/User/GetUser",
    })
    .then(res=>{
      if(res.data)
      {
        console.log(res.data);
        setUsertable(res.data)
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }, []);
  }

  GetUser();

  function DeleteUser()
  {
    axios({     //DeleteCourse API Calling
      method:'get',
      url:"http://localhost:8000/User/DeleteUser?temp_id="+tempId
    })
    .then(res=>{
      if(res.data.indicator=="success")
      {
        setdeleteSuccess(true); 
        GetUser();
        setRerender(!rerender);
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
  function FindUser(id)
  {
    axios({     //FindOneCourse on the base of id API Calling
      method:'get',
      url:"http://localhost:8000/User/FindUser?temp_id="+id
    })
    .then(res=>{
      if(res.data)
      {
        setUserid(res.data._id);
        setFirstName(res.data.First_name);
        setLastName(res.data.Last_name);
        setEmail(res.data.Email);
        setPhoneno(res.data.Phone_no);
        setAddress(res.data.Address);
        setRole(res.data.Role);
        setEditModal(!editmodal); 
      }
        
    })
    .catch(error=>{
      
      console.log(error);
      setError(true);
      setEditModal(!editmodal); 
    })
  };
  function AddUser(e)
  {
    e.preventDefault();
    const first_name=e.target.Firstname.value;
    const last_name=e.target.lastname.value;
    const email=e.target.email.value;
    const phone_no=e.target.phoneno.value;
    const address=e.target.address.value;
    const role=e.target.role.value;
    axios({    //AddUser API Calling
      method:'post',
      url:"http://localhost:8000/User/AddUser",
      data:{first_name:first_name, last_name:last_name, email:email, phone_no:phone_no, address:address, role:role},
    })
    .then(res=>{
      if(res.data == "success")
      {
        setaddSuccess(true);
        GetUser();
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
  function EditUser(e)
  {
    e.preventDefault();
    const first_name=e.target.firstname.value;
    const last_name=e.target.lastname.value;
    const email=e.target.email.value;
    const phone_no=e.target.phoneno.value;
    const address=e.target.address.value;
    const role=e.target.role.value;
  
    axios({     //edit Course on the base of id API Calling
      method:'post',
      url:"http://localhost:8000/User/EditUser",
      data:{id:id,first_name:first_name, last_name:last_name, email:email, phone_no:phone_no, address:address, role:role},
    })
    .then(res=>{
      if(res.data == "success")
      {
        seteditSuccess(true); 
        GetUser();
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
    return (
        <>
        <NewHeader />
        <Container className="mt--7" fluid>

        <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
          <strong> New User Added! </strong> 
        </Alert>
        <Alert color="danger" isOpen={error} toggle={onDismiss}>
          <strong>Error! </strong> { errorMessage }
        </Alert>
        <Alert color="success" isOpen={deletesuccess} toggle={onDismissdeleteSuccess}>
          <strong> User deleted successfully! </strong> 
        </Alert>
        <Alert color="success" isOpen={editsuccess} toggle={onDismisseditSuccess}>
          <strong> User Record Updated successfully! </strong> 
        </Alert>

        {/* Edit modal */}
        <Modal isOpen={editmodal} toggle={edittoggle1} {...args} size='lg'>
        <Form  role="form" onSubmit={EditUser} >
          <ModalHeader toggle={edittoggle1}>Update User</ModalHeader>
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
                    placeholder="user id"
                    type="hidden"
                    value={id}
                  />
                    <Label for="firstname">
                      First Name
                    </Label>
                    <Input
                      id="first_name"
                      name="firstname"
                      placeholder="Enter FirstName"
                      type="text"
                     defaultValue={firstname}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="last_name">
                      Lastname
                    </Label>
                    <Input
                      id="lastname"
                      name="lastname"
                      placeholder="Enter LastName"
                      type="text"
                      defaultValue={lastname}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Enter Email Address"
                      type="text"
                      defaultValue={email}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="phoneno">
                      Phone No
                    </Label>
                    <Input
                      id="phoneno"
                      name="phoneno"
                      placeholder="Enter Phone no"
                      type="text"
                      defaultValue={phoneno}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
              <FormGroup>
                <Label for="Address">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="User's Address"
                  type='textarea'
                  defaultValue={address}
                />
              </FormGroup>
              </Col>
              </Row>
              <Row>
                <Col md={12}>
                <FormGroup>
                  <Label for="Role">
                    User's Role
                  </Label>
                  <Input
                    id="role"
                    name="role"
                    type="select"
                    defaultValue={role}
                  >  
                    <option value="Teacher">
                      Teacher
                    </option>
                    <option value="Student">
                      Student
                    </option>
                    
                  </Input>
                </FormGroup>
              </Col>
              </Row>
           
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Update Record
            </Button>{' '}
            <Button color="secondary" onClick={editModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
        </Modal>
            {/* Delete modal */}
            
          <Modal isOpen={deletemodal} toggle={DeletetoggleClose} {...args} size='sm'>
          <ModalHeader toggle={DeletetoggleClose} >Delete User</ModalHeader>
          <ModalBody>
            Are you sure you want to delete <b>{tempName}</b>?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => {DeleteUser()}}>
              Delete
            </Button>{' '}
            <Button color="secondary" onClick={DeletetoggleClose}>
              Cancel
            </Button>
          </ModalFooter>

          </Modal>
        
        <Modal isOpen={modal} toggle={toggle} {...args} size='lg'>
        <Form  role="form" onSubmit={AddUser}>
          <ModalHeader toggle={toggle}>Add new User</ModalHeader>
          <ModalBody>
              <Row >
                <Col md={6}>
                  <FormGroup>
                    <Label for="firstname">
                      First Name
                    </Label>
                    <Input
                      id="first_name"
                      name="Firstname"
                      placeholder="Enter FirstName"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="lastname">
                      Last name
                    </Label>
                    <Input
                      id="lastname"
                      name="lastname"
                      placeholder="Enter LastName"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Email">
                     Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="phoneno">
                      Phone No
                    </Label>
                    <Input
                      id="Phoneno"
                      name="phoneno"
                      placeholder="Enter Phone Number"
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
              <FormGroup>
                <Label for="Address">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="User's Address"
                  type='textarea'
                />
              </FormGroup>
              </Col>
              </Row>
              <Row>
                <Col md={12}>
                <FormGroup>
                  <Label for="">
                    User's Role
                  </Label>
                  <Input
                    id="role"
                    name="role"
                    type="select"
                  >  
                    <option value="Teacher">
                      Teacher
                    </option>
                    <option value="Student">
                      Student
                    </option>
                   
                  </Input>
                </FormGroup>
              </Col>
              </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Add User
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
                    <h3 className="mb-0">Users</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                     onClick={toggle}
                      size="md"
                    >
                      Add new User
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
                    <th scope="col">First Name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone No</th>
                    <th scope="col">Role</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>

                { usertable ?
                  usertable.map((row, index) => {
                  return(
                  <tr key={index}>
                    <th scope="row">
                      {/* <i className="ni ni-book-bookmark text-blue"/> */}
                      <span className="mb-0 text-sm">
                        {row.First_name}
                      </span>

                    </th>
                    <td>{row.Last_name}</td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                        {row.Email}
                      
                      </Badge>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                        {row.Phone_no}
                      </Badge>
                    </td>
                    <td>{row.Role}</td>
                    <td>{row.Address}</td>
                    <td>
                      <Button color="primary" onClick={() => {FindUser(row._id)}}>
                      <i className="ni ni-active-40"></i>
                      </Button>
                      <Button color="danger" onClick={() => {Deletetoggle(row._id,row.First_name)}}>
                        <i className="ni ni-fat-remove"></i>
                      </Button>
                    </td>

                  </tr> )
                  })
                  :
                  <tr>
                    <td span="5">No Users record found!</td>
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

export default User;
