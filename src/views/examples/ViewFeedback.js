import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewHeader from 'components/Headers/NewHeader';
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
const ViewFeedback = () => {
    const [deletesuccess, setdeleteSuccess] = useState(false);
    const onDismissdeleteSuccess = () => setdeleteSuccess(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const onDismiss = () => setError(false);
    const [feedbacktable, setFeedbacktable] = useState("");
    const [rerender, setRerender] = useState(false);

    var moment = require('moment');
    function DeleteFeedback(id) {
        axios({
            method: 'get',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Feedback/DeleteFeedback?temp_id=" + id
        })
            .then(res => {
                if (res.data.indicator== "success") {
                    setdeleteSuccess(true);
                    GetFeedback();
                    setRerender(!rerender);
                }
                else {
                    setError(true);
                    setErrorMessage(res.data.messege.messege);
                }
            })
            .catch(error => {

                if (error.response.data == "Not logged in") {
                    localStorage.clear(); // Clear local storage
                    history.push('/auth/login');
                }
                console.log(error);
                setErrorMessage("Network Error!");
                setError(true);
                setdeleteModal(!deletemodal);
            })

    };
    useEffect(() => {
        GetFeedback();
    }, []);
    function GetFeedback(e) {
        axios({
            method: 'get',
            withCredentials: true,
            url: "http://localhost:8000/Feedback/GetAllFeedback",
        })
            .then(res => {
                if (res.data) {
                    setFeedbacktable(res.data)
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <>
            <NewHeader />
            <Container className="mt--7" fluid>
                <Alert color="success" isOpen={deletesuccess} toggle={onDismissdeleteSuccess}>
                    <strong> Feedback deleted successfully! </strong>
                </Alert>
                <Alert color="danger" isOpen={error} toggle={onDismiss}>
                        <strong>Error! </strong> {errorMessage}
                    </Alert>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                </Row>
                            </CardHeader>
                            <h2 className="display-8" style={{ textAlign: 'center' }}>Recent Feedbacks</h2>
                            <Table className="align-items-center table-flush " responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Experience</th>
                                        <th scope="col">Comments</th>
                                        <th scope="col">Action</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>

                                    {feedbacktable ?
                                        feedbacktable.map((row, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">
                                                        {/* <i className="ni ni-book-bookmark text-blue"/> */}
                                                        <span className="mb-0 text-sm">
                                                            {row.Name}
                                                        </span>

                                                    </th>
                                                    <th scope="row">
                                                        {/* <i className="ni ni-book-bookmark text-blue"/> */}
                                                        <span className="mb-0 text-sm">
                                                            {row.Email}
                                                        </span>

                                                    </th>
                                                    <th scope="row">
                                                        {/* <i className="ni ni-book-bookmark text-blue"/> */}
                                                        <span className="mb-0 text-sm">
                                                            {row.Phone_Number}
                                                        </span>

                                                    </th>

                                                   
                                                    <td>{row.Experience}</td>
                                                    <td>{row.Comments}</td>
                                                    <td>
                                                        <Button color="danger" onClick={() => { DeleteFeedback(row._id) }}>
                                                            Delete
                                                        </Button>
                                                    </td>


                                                </tr>)
                                        })
                                        :
                                        <tr>
                                            <td span="5">No Reviews Given Yet!</td>
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
};

export default ViewFeedback;