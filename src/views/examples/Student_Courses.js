import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect, useHistory, Link } from 'react-router-dom';
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
const Student_Courses = () => {
    const onDismiss = () => setError(false);
    const [coursetable, setCoursetable] = useState(null);
    var moment = require('moment');
    const history= useHistory();
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
                url: "http://localhost:8000/course/StudentCourses?temp_id=" + user_id,

            })
                .then(res => {
                    if (res.data.data && res.data.message == "success") {
                        console.log(res.data.data);
                        setCoursetable(res.data.data);
                    }
                    else if(res.data.message == "only student can access this") {
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
    return (
        <>
            <NewHeader />
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">



                                </Row>
                            </CardHeader>

                            <Table className="align-items-center table-flush" responsive >

                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Course title</th>
                                        <th scope="col">Course Code</th>
                                        <th scope="col">start date</th>
                                        <th scope="col">End date</th>
                                        <th scope="col">Open Lectures</th>
                                        <th scope="col">Certificates</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {coursetable ?

                                        coursetable.map((row, index) => {
                                            return (
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
                                                    <td>
                                                        <>
                                                        <Link to={"/admin/Lectures?course_id=" + row._id}                                                                        
                                                                    >
                                                                        <Button color="primary"
                                                                       
                                                                            style={{ fontSize: '13px', padding: '4px 8px', width: '120px' }}>
                                                                            Open Lectures

                                                                        </Button>
                                                                    </Link>
                                                        </>
                                                    </td>
                                                    <td>
                                                        <>
                                                        <Link to={"/Certificate_Pdf?course_id=" + row._id}
      
                                                                    >
                                                                        <Button color="primary"
                                                                       
                                                                            style={{ fontSize: '13px', padding: '4px 8px', width: '150px' }}>
                                                                            Download Certificate

                                                                        </Button>
                                                                    </Link>
                                                        </>
                                                    </td>


                                                    </tr>)
                    })
                    :
                    <tr>
                      <td span="5">You are not enrolled in any course yet!! </td>
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
export default Student_Courses