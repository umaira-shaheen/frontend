import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Redirect, useHistory, Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Table,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Badge,
    toggle,
    Row,
    Col
} from "reactstrap";
// core components
import NewHeader from "components/Headers/NewHeader.js";
const View_Assignment = (args) => {
    const [Assignmenttable, setAssignmenttable] = useState(null);
    const history = useHistory();
    var moment = require('moment');

    const fileInputRef = useRef(null);
    const [assignment_file, setFile] = useState(null);
    const handleFileInputChange = (event, id) => {
      const file = event.target.files[0];
      setFile(file);
      console.log(file);
      const formData = new FormData();
      if (file) {
          formData.append('file', file);
      }
      axios({    
          method: 'post',
          withCredentials: true,
          sameSite: 'none',
          url: "http://localhost:8000/Assignment/UploadAssignment?temp_id=" + id,
          data: formData,
      })
          .then(res => {
              if (res.data == "success") {
                  setaddSuccess(true);
              }
              else {
                  setErrorMessage(res.data);
                  setError(true);
              }
            
              // window.location.reload(false);
          })
          .catch(error => {
              setErrorMessage("Failed to connect to backend")
              setError(true);

          })


    };
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const user_info = JSON.parse(storedUser);
        const user_id = user_info._id;
        console.log(user_info);
        // add course_id into local storage - last_url
        if (user_info == null) {
            localStorage.setItem('state', JSON.stringify(location.state))

            history.push('/auth/login');
        }
        else {
            axios({
                method: 'get',
                withCredentials: true,
                sameSite: 'none',
                url: "http://localhost:8000/Assignment/GetStudentAssignment?temp_id=" + user_id,
            })
                .then(res => {
                    if (res.data.data && res.data.message == "success") {
                        console.log(res.data.data);
                        setAssignmenttable(res.data.data);
                    }
                    else if (res.data.message == "only student can access this") {
                        alert("only student can access this")
                    }
                })
                .catch(error => {
                    if (error.response.data.message == "Not logged in") {
                        localStorage.clear(); // Clear local storage
                        history.push('/auth/login');
                    }
                    console.log(error);
                })

        }


    }, []);
    
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    return (
        <>
            <NewHeader />
            <Container className="mt--7" fluid>

                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                    </div>
                                    <div className="col text-right">
                                        {/* <Button
                                            color="primary"
                                            //   onClick={toggle}
                                            size="md"
                                        >
                                            Add new Assignment
                                        </Button> */}
                                    </div>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>

                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Assignment Title</th>

                                        <th scope="col">Submission Date</th>
                                        <th scope="col">Total Marks</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Action</th>

                                        <th scope="col">Obtained Marks</th>

                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>

                                    {Assignmenttable ?
                                        Assignmenttable
                                        .filter(row => row._doc.Status === 'Publish')
                                        .map((row, index) => {
                                            const currentDate = new Date();
                                            const dateToCompare = new Date(row._doc.Date);
                                            const isExpired = dateToCompare < currentDate ? true : false
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">
                                                        {/* <i className="ni ni-book-bookmark text-blue"/> */}
                                                        <span className="mb-0 text-sm">
                                                            {row._doc.Assignment_title}
                                                        </span>

                                                    </th>


                                                    <td>
                                                        <Badge color="" className="badge-dot">
                                                            <i className="bg-info" />
                                                            {moment(row._doc.Date).format('DD-MM-YYYY')}
                                                        </Badge>
                                                    </td>
                                                    <td>{row._doc.Total_marks}</td>
                                                    <Modal isOpen={modal} toggle={toggle} {...args}>
                                                        <ModalHeader toggle={toggle}>Assignment Question</ModalHeader>
                                                        <ModalBody>
                                                            {<div dangerouslySetInnerHTML={{ __html: row._doc.description }} />}
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            {/* <Button color="primary" onClick={toggle}>
                                                                Do Something
                                                            </Button>{' '} */}
                                                            <Button color="secondary" onClick={toggle}>
                                                                Cancel
                                                            </Button>
                                                        </ModalFooter>
                                                    </Modal>

                                                    <td>
                                                    {!isExpired ? (
                                                                <>
                                                                    <Link to={"/AssignmentPdf?assignment_id=" + row._doc._id}
                                                                        target="_blank"
                                                                    >
                                                                        <Button color="primary"
                                                                            // onClick={() => { SearchAssignment(row._id) }}
                                                                            style={{ fontSize: '13px', padding: '4px 8px' }}>
                                                                            Download Assignment

                                                                        </Button>
                                                                    </Link>
                                                                </>



                                                            ) : (
                                                                <Button
                                                                    color="primary"
                                                                    style={{ fontSize: '13px', padding: '4px 8px' }}
                                                                    disabled
                                                                >
                                                                    Assignment Expired
                                                                </Button>
                                                            )}


                                                    </td>

                                                    <td>
                                                        {!isExpired ? (row.has_submitted ? 
                                                          <Button  style={{width: '120px'}} color="default" size="sm" disabled>
                                                          Submitted
                                                       </Button>
                                                        : (
                                                            <>
                                                                <Button
                                                                   
                                                                    color="primary"
                                                                    style={{ fontSize: '13px', padding: '4px 8px' }}
                                                                    onClick={() => fileInputRef.current.click()}
                                                                >
                                                                    Submit Now
                                                                </Button>
                                                                <input
                                                                    id="fileInput"
                                                                    type="file"
                                                                    ref={fileInputRef}
                                                                    style={{ display: 'none' }}
                                                                    onChange={(event) => handleFileInputChange(event, row._doc._id)}
                                                                />
                                                            </>
                                                             ))

                                                       : <></> }
                                                            
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                            {row.has_submitted ? (
                                                                row.marks_obtained !== "-1" ? (
                                                                    row.marks_obtained
                                                                ) : (
                                                                    "Not Marked"
                                                                )
                                                            ) : null}
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
export default View_Assignment