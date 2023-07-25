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

const Question = (args) => {
    const history = useHistory();
    const questionstoggle = () => setQuestionsModal(!questionsmodal);
    const closeQuestionModal = () => setQuestionsModal(false);
    const [questionsmodal, setQuestionsModal] = useState(false);
    const [addsuccess, setaddSuccess] = useState(false);
    const onDismissaddSuccess = () => setaddSuccess(false);
    const onDismiss = () => setError(false);
    const [error, setError] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [questiontable, setquestiontable] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentQuiz, setCurrentQuiz] = useState("No Quiz Selected Yet")


    function AddQuestions(e) {
        e.preventDefault();
        const quiz_id = e.target.quiz.value;
        const question = e.target.question.value;
        const question_type = e.target.question_type.value;
        const options = question_type === "Multichoice" ? e.target.options.value : ""; // Only assign options if question type is "Multichoice"
        const marks = e.target.marks.value;
        // if question type is multipchice then options cannot b null or empty
        if (question_type == "Multichoice" && options.length == 0) {
            alert('For multipchoice question type you must provide options')
            return
        }
        axios({    //AddUser API Calling
            method: 'post',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Question/AddQuestion",
            data: { quiz_id: quiz_id, question: question, question_type: question_type, options: options, marks: marks },
        })
            .then(res => {
                if (res.data == "success") {
                    setaddSuccess(true);
                    GetTeacheQuestion();
                    setRerender(!rerender);
                }
                else {
                    setErrorMessage(res.data);
                    setError(true);
                }
                closeQuestionModal();                    // window.location.reload(false);
            })
            .catch(error => {
                console.log(error)
                if (error.response.data == "Not logged in") {
                    localStorage.clear(); // Clear local storage
                    history.push('/auth/login');
                }
                setErrorMessage("Failed to connect to backend")
                setError(true);
                closeQuestionModal();
            })
    }

    function GetQuestion(e) {

        axios({
            method: 'get',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Question/GetQuestions",
        })
            .then(res => {
                if (res.data) {
                    setquestiontable(res.data)
                }
            })
            .catch(error => {
                if (error.response.data = "not logged in") {
                    localStorage.clear();
                    history.push('/auth/login');
                }
            })
    };
function GetTeacheQuestion()
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
        url: "http://localhost:8000/Question/GetTeacherQuestion?temp_id=" + user_id,
    })
        .then(res => {
            if (res.data.data && res.data.message == "success") {
                console.log(res.data.data);
                setquestiontable(res.data.data);
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
        // GetQuestion();
        GetQuiz();
        GetTeacheQuestion();
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

    //   Edit Quiz
    function EditQuestion(e) {
        const id = e.target.id.value;
        const question_title = e.target.question.value;
        const type = e.target.question_type.value;
        const options = e.target.options.value;
        const marks = e.target.marks.value;

        e.preventDefault();
        axios({     //edit Course on the base of id API Calling
            method: 'post',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Question/EditQuestion",
            data: { id: id, question_title: question_title, type: type, options: options, marks: marks },
        })
            .then(res => {
                if (res.data == "success") {
                    seteditSuccess(true);
                    GetTeacheQuestion();
                    setRerender(!rerender);
                }
                else {
                    setErrorMessage(res.data);
                    setError(true);
                }
                setEditModal(!editmodal);

            })
            .catch(error => {

                setErrorMessage("Failed to connect to backend");
                setError(true);
                console.log(error);

            })
    };
    // Find Quiz to edit the Quiz
    const [quiztable, setquiztable] = useState(null);
    const [teacherquiztable, setteacherquiztable] = useState(null);
    const [id, setQuestionid] = useState(null);
    const [question_title, setQuestionTitle] = useState(null);
    const [type, setquiztype] = useState(null);
    const [options, setoptions] = useState(null);
    const [marks, setmarks] = useState(null);
    const edittoggle1 = (event) => {
        setEditModal(!editmodal);
    };
    const editModalClose = () => {
        setEditModal(!editmodal);
    }
    const [editsuccess, seteditSuccess] = useState(false);
    const [tempId, setTempId] = useState('');
    const onDismisseditSuccess = () => seteditSuccess(false);
    const [editmodal, setEditModal] = useState(false);

    function FindQuestion(id) {

        axios({     //FindOneCourse on the base of id API Calling
            method: 'get',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Question/FindQuestion?temp_id=" + id
        })
            .then(res => {
                if (res.data) {
                    setQuestionid(res.data._id);
                    setQuestionTitle(res.data.Question);
                    setquiztype(res.data.questions_type);
                    setoptions(res.data.options);
                    setmarks(res.data.marks);
                    setEditModal(!editmodal);

                }

            })
            .catch(error => {

                console.log(error);
                setError(true);
                setEditModal(!editmodal);
            })
    };
    const [deletesuccess, setdeleteSuccess] = useState(false);
    const onDismissdeleteSuccess = () => setdeleteSuccess(false);

    const [deletemodal, setdeleteModal] = useState(false);
    const [showOptions, setShowOptions] = useState(true);
    const [coursetable, setCoursetable] = useState(null);
    const Deletetoggle = (id) => {

        setTempId(id);
        setdeleteModal(!deletemodal);
        // DeleteCourse(id) ;
    };
    const DeletetoggleClose = () => {
        setdeleteModal(!deletemodal);
    }

    function DeleteQuestion() {
        axios({     //DeleteCourse API Calling
            method: 'get',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Question/DeleteQuestion?temp_id=" + tempId
        })
            .then(res => {
                if (res.data.indicator == "success") {
                    setdeleteSuccess(true);
                    GetTeacheQuestion();
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
                console.log(error);
                setErrorMessage("Network Error!");
                setError(true);
                setdeleteModal(!deletemodal);
            })

    };
    function GetQuiz(e) {
        axios({
            method: 'get',
            withCredentials: true,
            url: "http://localhost:8000/quiz/GetQuiz",
        })
            .then(res => {
                if (res.data) {
                    setquiztable(res.data);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
   
    const [option_type, setOption_type] = useState('');
    const [filtered_questions, setFilteredQuestions] = useState('');
    const handleChange = (e) => {

        if (e.target.value == "Multichoice") {
            setShowOptions(true)
        }
        else {
            setShowOptions(false)
        }
    };
    const handleQuizChange = (e) => {
        // Function to filter the quiz questions based on the selected quiz
        const filteredQuestions = questiontable.filter(
            (question) => question.quiz_title === e.target.value
        );
        setFilteredQuestions(filteredQuestions);
        setCurrentQuiz(e.target.value)
    };

    // Function to render the filtered quiz questions

    return (
        <>
            <NewHeader />
            <Container className="mt--7" fluid>
                <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
                    <strong> New Question Added! </strong>
                </Alert>
                <Alert color="danger" isOpen={error} toggle={onDismiss}>
                    <strong>Error! </strong> {errorMessage}
                </Alert>
                <Alert color="success" isOpen={editsuccess} toggle={onDismisseditSuccess}>
                    <strong> Question Updated successfully! </strong>
                </Alert>
                <Alert color="success" isOpen={deletesuccess} toggle={onDismissdeleteSuccess}>
                    <strong> Question deleted successfully! </strong>
                </Alert>
                <Modal isOpen={questionsmodal} toggle={questionstoggle} {...args} size='lg'>
                    <Form role="form" onSubmit={AddQuestions}>
                        <ModalHeader toggle={questionstoggle}>Add Questions</ModalHeader>
                        <ModalBody>
                            <Row>

                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="quiz">
                                            Select Quiz
                                        </Label>

                                        <Input
                                            id="quiz"
                                            name="quiz"
                                            type="select"
                                        >
                                            {teacherquiztable ?
                                                teacherquiztable.map((row, index) => {
                                                    return (
                                                        <option key={index} value={row._id}>
                                                            {row.Quiz_title}
                                                        </option>
                                                    )
                                                })
                                                :
                                                <h1>No Quizes Added Yet!</h1>
                                            }


                                        </Input>

                                    </FormGroup>
                                </Col>

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

                                        <Label for="quiz_title">
                                            Question
                                        </Label>
                                        <Input
                                            id="question"
                                            name="question"
                                            placeholder="Enter Quiz Question"
                                            type="text"
                                            defaultValue={question_title}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="question_type">
                                            Questions type
                                        </Label>
                                        <Input
                                            id="question_type"
                                            name="question_type"
                                            type="select"
                                            onChange={handleChange}

                                        >
                                            <option value="Multichoice">
                                                Multichoice
                                            </option>
                                            <option value=" True/False">
                                                True/False
                                            </option>
                                            <option value="short question/Answers">
                                                short question/Answers
                                            </option>
                                            <option value="Blanks">
                                                Blanks
                                            </option>

                                        </Input>
                                    </FormGroup>
                                </Col>

                                <Col md={6} className={showOptions ? '' : 'hidden'} >
                                    <FormGroup>
                                        <Label for="options">
                                            Options(Each option on new line)
                                        </Label>
                                        <Input
                                            id="options"
                                            name="options"
                                            type="textarea" // Use type="textarea" to render a textarea input
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="questions">
                                            Marks
                                        </Label>
                                        <Input
                                            id="marks"
                                            name="marks"
                                            placeholder="marks"
                                            type="Number"
                                            min={'1'}
                                            max={'5'}
                                            required
                                        />
                                    </FormGroup>
                                </Col>

                            </Row>


                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">
                                Add Question
                            </Button>{' '}
                            <Button color="secondary" onClick={questionstoggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
                {/* Edit Modal */}
                <Modal isOpen={editmodal} toggle={edittoggle1} {...args} size='lg'>
                    <Form role="form" onSubmit={EditQuestion}>
                        <ModalHeader toggle={edittoggle1}>Edit Question</ModalHeader>
                        <ModalBody>
                            <Row >
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
                                            placeholder="question id"
                                            type="hidden"
                                            value={id}
                                        />

                                        <Label for="quiz_title">
                                            Question
                                        </Label>
                                        <Input
                                            id="question"
                                            name="question"
                                            placeholder="Enter Quiz Question"
                                            type="text"
                                            defaultValue={question_title}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="question_type">
                                            Questions type
                                        </Label>
                                        <Input
                                            id="question_type"
                                            name="question_type"
                                            type="select"
                                            defaultValue={type}
                                        >
                                            <option value="Multichoice">
                                                Multichoice
                                            </option>
                                            <option value=" True/False">
                                                True/False
                                            </option>
                                            <option value="short question/Answers">
                                                short question/Answers
                                            </option>
                                            <option value="Blanks">
                                                Blanks
                                            </option>

                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="options">
                                            Options(Each option on new line)
                                        </Label>
                                        <Input
                                            id="options"
                                            name="options"
                                            type="textarea" // Use type="textarea" to render a textarea input
                                            defaultValue={options}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="questions">
                                            Marks
                                        </Label>
                                        <Input
                                            id="marks"
                                            name="marks"
                                            placeholder="marks"
                                            type="Number"
                                            defaultValue={marks}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>


                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">
                                Update Question
                            </Button>{' '}
                            <Button color="secondary" onClick={editModalClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
                <Modal isOpen={deletemodal} toggle={DeletetoggleClose} {...args} size='sm'>
                    <ModalHeader toggle={DeletetoggleClose} >Delete Questions</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this question?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => { DeleteQuestion() }}>
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
                                                            <option key={index} value={row.Quiz_title}>
                                                                {row.Quiz_title}
                                                            </option>
                                                        )
                                                    })
                                                :
                                                <h1>No Quiz Added yet!</h1>
                                            }


                                        </Input>
                                    </div>

                                    <div className="col text-right">

                                        <Button
                                            color="primary"
                                            onClick={questionstoggle}
                                            size="md"
                                        >
                                            Add Questions
                                        </Button>
                                    </div>

                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>

                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Quiz Title</th>
                                        <th scope="col">Question</th>
                                        <th scope="col">Question type</th>
                                        <th scope="col">Options</th>
                                        <th scope="col">Marks</th>
                                        <th scope="col">Action</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered_questions.length > 0 ?

                                        filtered_questions.map((row, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">

                                                        <span className="mb-0 text-sm">
                                                            {row.quiz_title}
                                                        </span>

                                                    </th>
                                                    <td>
                                                        {row.Question}
                                                    </td>

                                                    <td>
                                                        {row.questions_type}
                                                    </td>
                                                    <td>
                                                        {row.options}
                                                    </td>
                                                    <td> {row.marks}</td>

                                                    <td>
                                                        <Button color="primary" onClick={() => { FindQuestion(row._id) }} >
                                                            Edit
                                                            {/* <i className="ni ni-active-40"></i> */}
                                                        </Button>
                                                        <Button color="danger" onClick={() => { Deletetoggle(row._id) }}>
                                                            Delete
                                                            {/* <i className="ni ni-fat-remove"></i> */}
                                                        </Button>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                        // :
                                        // filtered_questions.length === 0?
                                        // <tr>

                                        //     <td colSpan="6">

                                        //             "No Questions Exist for the Selected Course"
                                        //     </td>

                                        // </tr>

                                        :

                                        questiontable && questiontable.length > 0 && currentQuiz == "No Quiz Selected Yet" ? (
                                            questiontable.map((row, index) => (
                                                <tr key={index}>
                                                    <th scope="row">
                                                        <span className="mb-0 text-sm">{row.quiz_title}</span>
                                                    </th>
                                                    <td>{row.Question}</td>
                                                    <td>{row.questions_type}</td>
                                                    <td>{row.options}</td>
                                                    <td>{row.marks}</td>
                                                    <td>
                                                        <Button color="primary" onClick={() => { FindQuestion(row._id) }}>
                                                            Edit
                                                        </Button>
                                                        <Button color="danger" onClick={() => { Deletetoggle(row._id) }}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) :

                                            <tr>
                                                <td span="5">No Questions Added yet!</td>
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
export default Question;