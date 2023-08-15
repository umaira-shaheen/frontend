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
const Submitted_Quizes = (args) => {
    const history = useHistory();
    const [teacherquiztable, setteacherquiztable] = useState(null);
    const [filtered_questions, setFilteredQuestions] = useState('');
    const [currentQuiz, setCurrentQuiz] = useState("No Quiz Selected Yet")
    const [quiz_title, setQuizTitle] = useState('');
    const [total_marks, setTotalMarks] = useState('');
    const [studentId, setStudentID] = useState('');
    const [studentFirstName, setStudentFirstName] = useState('');
    const [studentLastName, setStudentLastName] = useState('');
    const [quizId, setQuizId] = useState('');
    const handleQuizChange = (e) => {
        // Function to filter the quiz questions based on the selected quiz
        const filteredQuestions = teacherquiztable.filter(
            (question) => question._doc.Quiz_title === e.target.value
        );
        setFilteredQuestions(filteredQuestions);
        setCurrentQuiz(e.target.value)
    };
    function GetTeacherQuiz()
    {
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
            url: "http://localhost:8000/Quiz/GetTeacherQuiz?temp_id=" + user_id,
        })
            .then(res => {
                if (res.data.data && res.data.message == "success") {
                    console.log(res.data.data);
                    setteacherquiztable(res.data.data);
                    setQuizTitle(res.data.data.Quiz_title);
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

    }
    useEffect(() => {
        GetTeacherQuiz();
    }, []);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    function FindQuiz(id, student_id,Firstname, Lastname) {

        axios({     //FindOneCourse on the base of id API Calling
            method: 'get',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Quiz/FindQuiz?temp_id=" + id
        })
            .then(res => {
                if (res.data) {

                    console.log(student_id);
                    console.log(res.data);
                    setStudentID(student_id);
                    setStudentFirstName(Firstname);
                    setStudentLastName(Lastname);
                    setQuizId(res.data._id);
                    setQuizTitle(res.data.Quiz_title);
                    setTotalMarks(res.data.Questions);
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
    const onDismiss = () => setError(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const closeModal = () => setModal(false);
    const [addsuccess, setaddSuccess] = useState(false);
    const onDismissaddSuccess = () => setaddSuccess(false);
    const [rerender, setRerender] = useState(false);
    function UploadMarks(e) {
        e.preventDefault();
        const Student_ID = e.target.student_id.value;
        const quiz_id = e.target.quiz_id.value;
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
            url: "http://localhost:8000/Quiz/UploadMarks",
            data: { Student_ID: Student_ID, quiz_id: quiz_id, obtained_marks: obtained_marks },
        })
            .then(res => {
                if (res.data.data && res.data.message == "Marks uploaded successfully") {
                    console.log(res.data.data);
                    setaddSuccess(true);
                    GetTeacherQuiz();
                    setRerender(!rerender);

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
                                            value={quiz_title}

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
                                            value={studentFirstName + ' ' + studentLastName}
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
                                            Quiz ID
                                        </Label>
                                        <Input
                                            id="quiz_id"
                                            name="quiz_id"
                                            placeholder="QUIZ ID"
                                            type="text"
                                            value={quizId}

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
                    </Form>
                </Modal>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col-md-6">
                                        <Label for="quiz_title">
                                            Select Quiz
                                        </Label>
                                        <Input
                                            id="quiz_title"
                                            name="quiz_title"
                                            type="select"
                                            onChange={handleQuizChange}
                                        >
                                            <option value="No Quiz Selected Yet">No Quiz Selected Yet</option>
                                            {teacherquiztable ?
                                                teacherquiztable
                                                    .map((row, index) => {
                                                        return (
                                                            <option key={index} value={row._doc.Quiz_title}>
                                                                {row._doc.Quiz_title}
                                                            </option>
                                                        )
                                                    })
                                                :
                                                <h1>No Quiz Added yet!</h1>
                                            }


                                        </Input>
                                    </div>


                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>

                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Quiz Title</th>
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
                                                        const quizTitle = row._doc.Quiz_title;
                                                        // Check if the Quiz_title is already displayed
                                                        const isTitleDisplayed = uniqueTitles[quizTitle];
                                                        if (!isTitleDisplayed) {
                                                            // If Quiz_title is not displayed yet, display it in a new row with colSpan for Quiz_title
                                                            uniqueTitles[quizTitle] = true;
                                                            return (
                                                                <tr key={`${index}-${idx}`}>
                                                                    <th scope="row" rowSpan={row._doc.Submitted_by.length}>
                                                                        <span className="mb-0 text-sm">{quizTitle}</span>
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
                                                                        {row.students[idx].marks_obtained !== "-1" ? (
                                                                            <Button
                                                                            color="default"
                                                                                size="sm"
                                                                            >
                                                                                Marked
                                                                            </Button>
                                                                        ) : (
                                                                            <Button
                                                                                color="primary"
                                                                                size="sm"
                                                                                onClick={() => { FindQuiz(row._doc._id, submittedBy,row.students[idx].student_Firstname,row.students[idx].student_Lastname) }}
                                                                            >
                                                                                Mark Quiz
                                                                            </Button>
                                                                        )}
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
                                                                        {row.students[idx].marks_obtained !== "-1" ? (
                                                                            <Button
                                                                                color="default"
                                                                                size="sm"
                                                                            >
                                                                                Marked
                                                                            </Button>
                                                                        ) : (
                                                                            <Button
                                                                                color="primary"
                                                                                size="sm"
                                                                                onClick={() => { FindQuiz(row._doc._id, submittedBy,row.students[idx].student_Firstname,row.students[idx].student_Lastname) }}
                                                                            >
                                                                                Mark Quiz
                                                                            </Button>
                                                                        )}
                                                                    </td>






                                                                    {/* Add more <td> elements for other data */}
                                                                </tr>
                                                            );
                                                        }
                                                    })}
                                                </React.Fragment>
                                            );
                                        })
                                    ) : teacherquiztable && teacherquiztable.length > 0 && currentQuiz === "No Quiz Selected Yet" ? (
                                        teacherquiztable.map((row, index) => {
                                            const uniqueTitles = {};
                                            return (
                                                <React.Fragment key={index}>
                                                    {row._doc.Submitted_by.map((submittedBy, idx) => {
                                                        const quizTitle = row._doc.Quiz_title;
                                                        const isTitleDisplayed = uniqueTitles[quizTitle];
                                                        if (!isTitleDisplayed) {
                                                            uniqueTitles[quizTitle] = true;
                                                            return (
                                                                <tr key={`${index}-${idx}`}>
                                                                    <th scope="row" rowSpan={row._doc.Submitted_by.length}>
                                                                        <span className="mb-0 text-sm">{quizTitle}</span>
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
                                                                        {row.students[idx].marks_obtained !== "-1" ? (
                                                                            <Button
                                                                                color="default"
                                                                                size="sm"
                                                                            >
                                                                                Marked
                                                                            </Button>
                                                                        ) : (
                                                                            <Button
                                                                                color="primary"
                                                                                size="sm"
                                                                                onClick={() => { FindQuiz(row._doc._id, submittedBy,row.students[idx].student_Firstname,row.students[idx].student_Lastname) }}
                                                                            >
                                                                                Mark Quiz
                                                                            </Button>
                                                                        )}
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
                                                                        {row.students[idx].marks_obtained !== "-1" ? (
                                                                            <Button
                                                                                color="default"
                                                                                size="sm"
                                                                            >
                                                                                Marked
                                                                            </Button>
                                                                        ) : (
                                                                            <Button
                                                                                color="primary"
                                                                                size="sm"
                                                                                onClick={() => { FindQuiz(row._doc._id, submittedBy,row.students[idx].student_Firstname,row.students[idx].student_Lastname) }}
                                                                            >
                                                                                Mark Quiz
                                                                            </Button>
                                                                        )}
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
                                            <td colSpan="5">No Quiz Added yet!</td>
                                        </tr>
                                    )}
                                </tbody>

                            </Table>

                        </Card>
                    </div>
                </Row>


            </Container>
        </>
    )

}
export default Submitted_Quizes;