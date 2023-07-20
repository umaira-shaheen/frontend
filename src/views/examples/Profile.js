import React, { useState,useRef } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Alert,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

const Profile = () => {
  const fileInputRef = useRef(null);
  const storedUser = localStorage.getItem('user');
  const user_info = JSON.parse(storedUser);
  const [error, setError] = useState(false);
  const [editsuccess, seteditSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [addsuccess, setaddSuccess] = useState(false);
  const onDismisseditSuccess = () => seteditSuccess(false);
  const onDismiss = () => setError(false);
  // function EditImage(file_1)
  // {

  //   const formData = new FormData();
  //   if(file_1)
  //   {
  //     formData.append('file', file_1);
  //   }
  //   axios({    //AddCourse API Calling
  //     method: 'post',
  //     withCredentials: true,
  //     sameSite: 'none',
  //     url: "http://localhost:8000/User/AddProfileImage",
  //     data: formData,
  //   })
  //     .then(res => {
  //       if (res.data == "success") {
  //         setaddSuccess(true);
  //         console.log(res.data);
          
  //       }
  //       else {
  //         setErrorMessage(res.data);
  //         setError(true);
  //       }
        
  //       // window.location.reload(false);
  //     })
  //     .catch(error => {
  //       setErrorMessage("Failed to connect to backend")
  //       setError(true);
       
  //     })
  // }
  function EditProfile(e) {
    e.preventDefault();
    const id = e.target.id.value;
    const user_name = e.target.username.value;
    const first_name = e.target.firstname.value;
    const last_name = e.target.lastname.value;
    const address = e.target.address.value;
    const phone_no = e.target.phoneno.value;
    const bio=e.target.bio.value;
    const formData = new FormData();
    if(profile_pic)
    {
     
      formData.append('file', profile_pic);
    }
    formData.append('user_name', user_name);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('address', address);
    formData.append('phone_no', phone_no);
    formData.append('id', id);
    formData.append('bio', bio);
    e.preventDefault();
    axios({     //edit Course on the base of id API Calling
      method: 'post',
      withCredentials: true,
      sameSite: 'none',
      url: "http://localhost:8000/User/EditProfile",
      data: formData,
     })
      .then(res => {
        if (res.data.indicator == "success") {
          seteditSuccess(true);
       
          if(profile_pic)
          {
            user_info.User_img=res.data.path;
            localStorage.setItem('user', JSON.stringify(user_info));

           
          }
          user_info.Address = address;
          user_info.UserName=  user_name;
          user_info.First_name=first_name;
          user_info.Last_name=last_name;
          user_info.Phone_no=phone_no;
          user_info.Bio=bio;
          localStorage.setItem('user', JSON.stringify(user_info));



          setRerender(!rerender);

        }
        else {
          setErrorMessage(res.data.messege);          
          setError(true);
        }


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
   const[profile_pic, setProfile_Pic]=useState();
   const [rerender, setRerender] = useState(false);
  const handleFileInputChange = (event) => {
    const file_1 = event.target.files[0];
    setProfile_Pic(file_1);
    EditProfile();
  };
  
  return (
    <>
     
      <UserHeader />
     
      {/* Page content */}
      <Container className="mt--7" fluid>
      <Alert color="danger" isOpen={error} toggle={onDismiss}>
          <strong>Error! </strong> {errorMessage}
        </Alert>
        <Alert color="success" isOpen={editsuccess} toggle={onDismisseditSuccess}>
          <strong>Profile updated successfully! </strong>
        </Alert>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={`http://localhost:8000/${user_info.User_img}`}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  {/* <Button
                    className="mr-4"
                    color="info"
                    href="linkedin.com/in/umaira-shaheen-a795ab258"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Remove 
                  </Button> */}
                 
                    <Button
                      className="float-right"
                      color="default"
                      size="sm"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Edit Image
                    </Button>
                    <input
                      id="fileInput"
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileInputChange}
                    />
                 
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>

                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                       
                        {/* <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span> */}
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3 style={{ fontSize: '24px', marginTop: '-30px' }}>
                    {user_info.First_name} {user_info.Last_name}
                    <span className="font-weight-light"></span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {user_info.Role}
                  </div>
                  <div className="h5 mt-4" style={{ fontSize: '16px' }}>
                    <i className="ni business_briefcase-24 mr-2" />
                    Uk College of English Language
                  </div>
                  {/* <div>
                    <i className="ni education_hat mr-2" />
                    International Islamic Universty Islamabad
                  </div> */}
                  <hr className="my-4" />
                  <div className="h5 mt-4" style={{ fontSize: '16px' }}>
                    <i className="ni business_briefcase-24 mr-2" />
                   Bio
                  </div>
                  <p>
                    “{user_info.Bio}”
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    {/* Show more */}
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  {/* <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col> */}
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={EditProfile}>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                            name="username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={user_info.First_name}
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            name="username"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-id"
                            name="id"
                            hidden
                          >
                            Id
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={user_info._id}
                            id="input-id"
                            placeholder="Id"
                            type="text"
                            name="id"
                            hidden
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                            name="email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            defaultValue={user_info.Email}
                            placeholder="jesse@example.com"
                            type="email"
                            name="email"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                            name="firstname"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={user_info.First_name}
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            name="firstname"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                            name="lastname"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={user_info.Last_name}
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                            name="lastname"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={user_info.Address}
                            id="input-address"
                            placeholder="Home Address"
                            type="text"
                            name="address"

                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={user_info.Phone_no}
                            id="input-city"
                            placeholder="City"
                            type="text"
                            name="phoneno"
                          />
                        </FormGroup>
                      </Col>
                     
                    </Row>
                    <hr className="my-4" />
                
                <div className="pl-lg-4">
                  <FormGroup>
                    <label>About Me</label>
                    <Input
                      className="form-control-alternative"
                      placeholder="A few words about you ..."
                      rows="4"
                      name="bio"
                     defaultValue={user_info.Bio}
                      type="textarea"
                    />
                  </FormGroup>
                </div>
                    <Button
                      color="info"
                      type="submit"
                      // onClick={(e) => e.preventDefault()}
                    >
                      Edit profile
                    </Button>
                  </div>
                 
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
