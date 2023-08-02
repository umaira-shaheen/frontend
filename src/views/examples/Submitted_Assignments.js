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
const Submitted_Assignments = (args) => {
    const history = useHistory();
    const [teacherassignmenttable, setteacherAssignmenttable] = useState(null);
    const [assignment_title, setAssignmentTitle] = useState('');
    const [filtered_questions, setFilteredQuestions] = useState('');
    const [currentAssignment, setCurrentAssignment] = useState("No Assignment Selected Yet")
    const handleAssignmentChange = (e) => {
        // Function to filter the quiz questions based on the selected quiz
        const filteredQuestions = teacherassignmenttable.filter(
            (question) => question._doc.Assignment_title === e.target.value
        );
        setFilteredQuestions(filteredQuestions);
        setCurrentAssignment(e.target.value)
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
        axios({
            method: 'get',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Assignment/GetTeacherAssignment?temp_id=" + user_id,
        })
            .then(res => {
                if (res.data.data && res.data.message == "success") {
                    console.log(res.data.data);
                    setteacherAssignmenttable(res.data.data);
                    console.log(teacherassignmenttable);
                    // setAssignmentTitle(res.data.data.Assignment_title);
                }
                else if (res.data.message == "only Teacher can access this") {
                    alert("only teacher can access this")
                }
            })
            .catch(error => {
                console.log(error);

                if (error.response.data.message == "Not logged in") {
                    localStorage.clear(); // Clear local storage
                    history.push('/auth/login');
                }

            })




    }, []);

   
    const [total_marks, setTotalMarks] = useState('');
    const [studentId, setStudentID] = useState('');
    const [assignmentId, setAssignmentId] = useState('');
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const onDismiss = () => setError(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const closeModal = () => setModal(false);
    const [addsuccess, setaddSuccess] = useState(false);
    const onDismissaddSuccess = () => setaddSuccess(false);
    function FindAssignment(id, student_id) {

        axios({     //FindOneCourse on the base of id API Calling
            method: 'get',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Assignment/FindAssignment?temp_id=" + id
        })
            .then(res => {
                if (res.data) {
                    
                    console.log(res.data);
                    setStudentID(student_id);
                    setAssignmentId(res.data._id);
                    setAssignmentTitle(res.data.Assignment_title);
                    setTotalMarks(res.data.Total_marks);
                    setModal(!modal);
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
                setModal(!modal);
            })
    };
    const openFileHandler = (fileLink) => {
        // Check if the fileLink is not empty before opening it
        if (fileLink) {
            // Open the link in a new tab using window.open
            window.open(fileLink, '_blank');
        } else {
            // Handle the case when the fileLink is empty or not available
            alert('File link not available!');
        }
    };
    function UploadMarks(e) {
        e.preventDefault();
        const Student_ID = e.target.student_id.value;
        const assignment_id = e.target.assignment_id.value;
        const obtained_marks = e.target.obtained_marks.value;
        const total_marks = e.target.total_marks.value;
        if (obtained_marks >= total_marks) {
            setErrorMessage('Obtained Marks should be less than or equal to total marks');
            setError(true);
            closeModal();
            return;
        }

        axios({     //FindOneCourse on the base of id API Calling
            method: 'post',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Assignment/UploadMarks",
            data: { Student_ID: Student_ID, assignment_id: assignment_id, obtained_marks: obtained_marks },
        })
            .then(res => {
                if (res.data.data && res.data.message == "Marks uploaded successfully") {
                   console.log(res.data.data);
                   setaddSuccess(true);
                   
                }
                else if (res.data.message == "only Teacher can access this") {
                    alert("only teacher can access this");
                }
                else {
                    setErrorMessage(res.data.messege.message);
                    setError(true);
                  }
                  closeModal();
               

            })
            .catch(error => {
                console.log(error)
                if (error.response.data == "Not logged in") {
                    localStorage.clear(); // Clear local storage
                    history.push('/auth/login');
                }
                console.log(error);
                setError(true);
                setModal(!modal);
            })
    };
    return (
        <>
            <NewHeader />
            <Container className="mt--7" fluid>
            <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
                    <strong> Marks Uploaded! </strong>
                </Alert>
                <Alert color="danger" isOpen={error} toggle={onDismiss}>
                    <strong>Error! </strong> {errorMessage}
                </Alert>
            <Modal isOpen={modal} toggle={toggle} {...args} size='lg'>
                    <Form role="form" onSubmit={UploadMarks}>
                        <ModalHeader toggle={toggle}>Add new Quiz</ModalHeader>
                        <ModalBody>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="quiz_title">
                                Assignment Title
                            </Label>
                            <Input
                                id="assignment_title"
                                name="assignment_title"
                                placeholder="Enter Asignment Title"
                                type="text"
                                value={assignment_title}

                                readOnly
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="student Id">
                                Submitted By
                            </Label>
                            <Input
                                id="studentid"
                                name="student_id"
                                placeholder="Student Id"
                                type="text"
                                value={studentId}

                                readOnly
                            />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Label for="questions">
                                Total Marks
                            </Label>
                            <Input
                                id="marks"
                                name="total_marks"
                                placeholder="Obtained Marks"
                                type="Number"
                                value={total_marks}
                                readOnly

                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="questions">
                                Obtained Marks
                            </Label>
                            <Input
                                id="obtained_marks"
                                name="obtained_marks"
                                placeholder="Obtained marks"
                                type="Number"

                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="quiz_ID" hidden>
                                Assignment ID
                            </Label>
                            <Input
                                id="assignment_id"
                                name="assignment_id"
                                placeholder="Assignment ID"
                                type="text"
                                value={assignmentId}

                                hidden
                            />
                        </FormGroup>
                    </Col>

                </Row>



            </ModalBody>
            <ModalFooter>
                <Button color="primary" type="submit">
                    Upload Marks
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Form >
</Modal >
    <Row>
        <div className="col">
            <Card className="shadow">
                <CardHeader className="border-0">
                    <Row className="align-items-center">
                        <div className="col-md-6">
                            <Label for="quiz_title">
                                Select Assignment
                            </Label>
                            <Input
                                id="assignment_title"
                                name="assignment_title"
                                type="select"
                                onChange={handleAssignmentChange}
                            >
                                <option value="No Assignment Selected Yet">No Assignment Selected Yet</option>
                                {teacherassignmenttable ?
                                    teacherassignmenttable
                                        .map((row, index) => {
                                            return (
                                                <option key={index} value={row._doc.Assignment_title}>
                                                    {row._doc.Assignment_title}
                                                </option>
                                            )
                                        })
                                    :
                                    <h1>No Assignment Added yet!</h1>
                                }


                            </Input>
                        </div>


                    </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>

                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Assignment Title</th>
                            <th scope="col">Submitted By</th>
                            <th scope="col">Submitted Files</th>
                            <th scope="col">Upload Marks</th>

                        </tr>
                    </thead>

                    <tbody>
                        {filtered_questions.length > 0 ? (
                            filtered_questions.map((row, index) => {
                                // Create an object to store unique Quiz_title values
                                const uniqueTitles = {};
                                return (
                                    <React.Fragment key={index}>
                                        {row._doc.Submitted_by.map((submittedBy, idx) => {
                                            const assignmentTitle = row._doc.Assignment_title;
                                            // Check if the Quiz_title is already displayed
                                            const isTitleDisplayed = uniqueTitles[assignmentTitle];
                                            if (!isTitleDisplayed) {
                                                // If Quiz_title is not displayed yet, display it in a new row with colSpan for Quiz_title
                                                uniqueTitles[assignmentTitle] = true;
                                                return (
                                                    <tr key={`${index}-${idx}`}>
                                                        <th scope="row" rowSpan={row._doc.Submitted_by.length}>
                                                            <span className="mb-0 text-sm">{assignmentTitle}</span>
                                                        </th>
                                                        <td>{row.students[idx].student_Firstname}  {row.students[idx].student_Lastname}</td>
                                                        {/* <td>{row.Submitted_files[idx]}</td> */}
                                                        <td>
                                                            <Button
                                                                color="primary"
                                                                size="sm"

                                                                onClick={() => openFileHandler(`http://localhost:8000/${row._doc.Submitted_files[idx]}`)}
                                                            >
                                                                Open  File
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                color="primary"
                                                                size="sm"
                                                                onClick={() => { FindAssignment(row._doc._id, submittedBy) }}


                                                            >
                                                                Mark Assignment
                                                            </Button>
                                                        </td>
                                                        {/* Add more <td> elements for other data */}
                                                    </tr>
                                                );
                                            } else {
                                                // If Quiz_title is already displayed, render the additional records in new rows without Quiz_title
                                                return (
                                                    <tr key={`${index}-${idx}`}>
                                                        <td>{row.students[idx].student_Firstname}  {row.students[idx].student_Lastname}</td>
                                                        {/* <td>{row.Submitted_files[idx]}</td> */}
                                                        <td>
                                                            <Button
                                                                color="primary"
                                                                size="sm"
                                                                onClick={() => openFileHandler(`http://localhost:8000/${row._doc.Submitted_files[idx]}`)}
                                                            >
                                                                Open File
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                color="primary"
                                                                size="sm"
                                                                onClick={() => { FindAssignment(row._doc._id, submittedBy) }}
                                                            >
                                                                Mark Assignment
                                                            </Button>
                                                        </td>
                                                        {/* Add more <td> elements for other data */}
                                                    </tr>
                                                );
                                            }
                                        })}
                                    </React.Fragment>
                                );
                            })
                        ) : teacherassignmenttable && teacherassignmenttable.length > 0 && currentAssignment === "No Assignment Selected Yet" ? (
                            teacherassignmenttable.map((row, index) => {
                                const uniqueTitles = {};
                                return (
                                    <React.Fragment key={index}>
                                        {row._doc.Submitted_by.map((submittedBy, idx) => {
                                            const assignmentTitle = row._doc.Assignment_title;
                                            const isTitleDisplayed = uniqueTitles[assignmentTitle];
                                            if (!isTitleDisplayed) {
                                                uniqueTitles[assignmentTitle] = true;
                                                return (
                                                    <tr key={`${index}-${idx}`}>
                                                        <th scope="row" rowSpan={row._doc.Submitted_by.length}>
                                                            <span className="mb-0 text-sm">{assignmentTitle}</span>
                                                        </th>
                                                        <td>{row.students[idx].student_Firstname}  {row.students[idx].student_Lastname}</td>
                                                        {/* <td>{row.Submitted_files[idx]}</td> */}
                                                        <td>
                                                            <Button
                                                                color="primary"
                                                                size="sm"
                                                                onClick={() => openFileHandler(`http://localhost:8000/${row._doc.Submitted_files[idx]}`)}
                                                            >
                                                                Open File
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                color="primary"
                                                                size="sm"
                                                                onClick={() => { FindAssignment(row._doc._id, submittedBy) }}
                                                            >
                                                                Mark Assignment
                                                            </Button>
                                                        </td>
                                                        {/* Add more <td> elements for other data */}
                                                    </tr>
                                                );
                                            } else {
                                                return (
                                                    <tr key={`${index}-${idx}`}>
                                                        <td>{row.students[idx].student_Firstname}  {row.students[idx].student_Lastname}</td>
                                                        {/* <td>{row.Submitted_files[idx]}</td> */}
                                                        <td>
                                                            <Button
                                                                color="primary"
                                                                size="sm"
                                                                onClick={() => openFileHandler(`http://localhost:8000/${row._doc.Submitted_files[idx]}`)}
                                                            >
                                                                Open File
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                color="primary"
                                                                size="sm"
                                                                onClick={() => { FindAssignment(row._doc._id, submittedBy) }}
                                                            >
                                                                Mark Assignment
                                                            </Button>
                                                        </td>
                                                        {/* Add more <td> elements for other data */}
                                                    </tr>
                                                );
                                            }
                                        })}
                                    </React.Fragment>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5">No Assignment Added yet!</td>
                            </tr>
                        )}
                    </tbody>

                </Table>

            </Card>
        </div>
    </Row>
        </Container >
        </>
    )
}
export default Submitted_Assignments