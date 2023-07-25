import React, { useState, useEffect, useRef } from 'react';
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
import { data } from 'jquery';
const Attempt_Quiz = () => {

    const [quiztable, setquiztable] = useState(null);
    const history = useHistory();
    var moment = require('moment');
    const [quizid, setQuizid] = useState(null);
    const [quizname, setQuizName] = useState(null);
    const [quizcourse, setQuizCourse] = useState(null);
    const [quizquestions, setQuizQuestions] = useState(null);
    const [error, setError] = useState(false);
    const onDismiss = () => setError(false);
    const [addsuccess, setaddSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const handleFileInputChange = (event, id) => {

        const file = event.target.files[0];
        setFile(file);
        console.log(file);
        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }
        axios({    //AddCourse API Calling
            method: 'post',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Quiz/UploadQuiz?temp_id=" + id,
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
                closeModal();
                // window.location.reload(false);
            })
            .catch(error => {
                setErrorMessage("Failed to connect to backend")
                setError(true);

            })


    };

    function SearchQuiz(id) {

        axios({     //FindOneCourse on the base of id API Calling
            method: 'get',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Quiz/SearchQuiz?temp_id=" + id
        })
            .then(res => {
                if (res.data.data && res.data.message == "success") {

                    const statedata = {
                        Quizid: res.data.data._id,
                        QuizName: res.data.data.Quiz_title,
                        QuizCourse: res.data.data.Quiz_Course,
                        QuizQuestions: res.data.data.Questions
                        // Add other data here...
                    };

                    // history.push({
                    //     pathname: '/QuizPdf',
                    //     state: {
                    //         data: statedata,
                    //     },
                    // });
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

            })
    }
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
                url: "http://localhost:8000/Quiz/GetStudentQuiz?temp_id=" + user_id,
            })
                .then(res => {
                    if (res.data.data && res.data.message == "success") {
                        console.log(res.data.data);
                        setquiztable(res.data.data);
                    }
                    else if (res.data.message == "only student can access this") {
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
                                            <th scope="col">Upload Quiz</th>

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
                                                        <td style={{ textAlign: 'center' }}>{row.Questions}</td>


                                                        <td>
                                                            {!isExpired ? (
                                                                <>
                                                                    <Link to={"/QuizPdf?quiz_id=" + row._id}
                                                                        target="_blank"
                                                                    >
                                                                        <Button color="primary"
                                                                            // onClick={() => { SearchQuiz(row._id) }}
                                                                            style={{ fontSize: '13px', padding: '4px 8px' }}>
                                                                            Download Quiz

                                                                        </Button>
                                                                    </Link>
                                                                </>



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
                                                        <td>
                                                            {!isExpired && !addsuccess && (
                                                                <>
                                                                    <Button
                                                                        className="float-right"
                                                                        color="default"
                                                                        size="sm"
                                                                        onClick={() => fileInputRef.current.click()}
                                                                    >
                                                                        Submit Quiz
                                                                    </Button>
                                                                    <input
                                                                        id="fileInput"
                                                                        type="file"
                                                                        ref={fileInputRef}
                                                                        style={{ display: 'none' }}
                                                                        onChange={(event) => handleFileInputChange(event, row._id)}
                                                                    />
                                                                </>
                                                            )}

                                                            {addsuccess && (
                                                                <Button className="float-right" color="default" size="sm" disabled>
                                                                    Submitted
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