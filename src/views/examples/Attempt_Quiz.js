import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect, useHistory,Link } from 'react-router-dom';


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
const Attempt_Quiz = () => {
    const [quiztable, setquiztable] = useState(null);
    const history = useHistory();
    var moment = require('moment');
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
        else
        {
            axios({
                method: 'get',
                withCredentials: true,
                sameSite: 'none',
                url: "http://localhost:8000/Quiz/GetStudentQuiz?temp_id=" + user_id,
            })
                .then(res => {
                    if (res.data.data && res.data.message == "success") {
                        console.log(res.data.data);
                        setquiztable(res.data.data);
                    }
                    else if(res.data.message == "only student can access this") {
                        alert("only student can access this")
                    }
                })
                .catch(error => {
                    console.log(error);
                    if (error.response.data.message == "Not logged in") {
                        localStorage.clear(); // Clear local storage
                        history.push('/auth/login');
                    }
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
                                    <div className="col">
                                        {/* <h3 className="mb-0">Course Quiz</h3> */}
                                    </div>
                                    <div className="col text-right">
                                        {/* <Button
                                            color="primary"
                                            onClick={toggle}
                                            size="md"
                                        >
                                            Add new Quiz
                                        </Button> */}

                                    </div>

                                </Row>
                                <Table className="align-items-center table-flush" responsive>

                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Course title</th>
                                            <th scope="col">Quiz start Date</th>
                                            <th scope="col">Quiz End Date</th>
                                            {/* <th scope="col">Status</th> */}
                                            <th scope="col">Total Questions</th>


                                           
                                            <th scope="col">Action</th>

                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {quiztable ?
                                            quiztable.map((row, index) => {
                                                const endDate = moment(row.End_date).endOf('day');
                                                const currentDate = moment().endOf('day');
                                                const isExpired = endDate.isBefore(currentDate);
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
                                                        {/* <td>{row.Status}</td> */}
                                                        <td style={{textAlign:'center'}}>{row.Questions}</td>

                                                        
                                                        <td>
                                                        {isExpired ? (
                                                           <Link to="/QuizPdf"
                                                           target="_blank"
                                                        >
                                                           <Button color="primary" 
                                                           style={{ fontSize: '13px', padding: '4px 8px' }}>
                                                             Attempt Quiz
                                                           </Button>
                                                         </Link>
                                                             ) : (
                                                                <Button
                                                                  color="primary"
                                                                  style={{ fontSize: '13px', padding: '4px 8px' }}
                                                                  disabled
                                                                >
                                                                  Quiz Expired
                                                                </Button>
                                                              )}
                                                          
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
                            </CardHeader>
                        </Card>
                    </div>

                </Row>

            </Container>
        </>
    )

}
export default Attempt_Quiz