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
const Submitted_Quizes = () => {
    const history = useHistory();
    const [teacherquiztable, setteacherquiztable] = useState(null);
    const [filtered_questions, setFilteredQuestions] = useState('');
    const [currentQuiz, setCurrentQuiz] = useState("No Quiz Selected Yet")

    const handleQuizChange = (e) => {
        // Function to filter the quiz questions based on the selected quiz
        const filteredQuestions = teacherquiztable.filter(
            (question) => question.Quiz_title === e.target.value
        );
        setFilteredQuestions(filteredQuestions);
        setCurrentQuiz(e.target.value)
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
    return (
        <>
            <NewHeader />
            <Container className="mt--7" fluid>
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


                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>

                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Quiz Title</th>
                                        <th scope="col">Submitted File</th>
                                        <th scope="col">Submitted By</th>




                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered_questions.length > 0 ?

                                        filtered_questions.map((row, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">

                                                        <span className="mb-0 text-sm">
                                                            {row.Quiz_title}
                                                        </span>

                                                    </th>
                                                    <td>
                                                        {row.Submitted_by}
                                                    </td>

                                                    <td>
                                                        {row.Submitted_files}
                                                    </td>


                                                    <td>

                                                    </td>

                                                </tr>
                                            )
                                        })


                                        :

                                        teacherquiztable && teacherquiztable.length > 0 && currentQuiz == "No Quiz Selected Yet" ? (
                                            teacherquiztable.map((row, index) => (
                                                <tr key={index}>
                                                    <th scope="row">
                                                        <span className="mb-0 text-sm">{row.Quiz_title}</span>
                                                    </th>
                                                    <td>
                                                        {row.Submitted_by.map((submittedBy, idx) => (
                                                            <div key={idx}>{submittedBy}</div>
                                                        ))}
                                                    </td>

                                                    <td>
                                                        {row.Submitted_files.map((submittedFile, idx) => (
                                                            <div key={idx}>{submittedFile}</div>
                                                        ))}
                                                    </td>



                                                    <td>

                                                    </td>
                                                </tr>
                                            ))
                                        ) :

                                            <tr>
                                                <td span="5">No Quiz Added yet!</td>
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
export default Submitted_Quizes;