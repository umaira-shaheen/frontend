
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Navbar from "./NavBar";
import Footer from "./Footer";
import Header from "./Header";
import feedback from "assets/img/landing_images/feedback.jpg";

import Topbar from "./Topbar";
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
const FeedbackForm = () => {
    const [addsuccess, setaddSuccess] = useState(false);
    const onDismissaddSuccess = () => setaddSuccess(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const onDismiss = () => setError(false);
    const [feedbacktable, setFeedbacktable] = useState("");
    const [rerender, setRerender] = useState(false);
    var moment = require('moment');
    useEffect(() => {
        GetFeedback();
    }, []);
    function GetFeedback(e) {
        axios({
            method: 'get',
            withCredentials: true,
            url: "http://localhost:8000/Feedback/GetFeedback",
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

    function AddFeedback(e) {

        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const phonenumber = e.target.phonenumber.value;
        const feedback = e.target.feedback.value;
        const comments = e.target.comments.value;
        axios({    //AddUser API Calling
            method: 'post',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Feedback/AddFeedback",
            data: { name: name, email: email, phonenumber: phonenumber, feedback: feedback, comments: comments },
        })
            .then(res => {
                if (res.data == "successfully submitted") {
                    setaddSuccess(true);
                    GetFeedback();
                    setRerender(!rerender);
                }
                else {
                    setErrorMessage(res.data);
                    setError(true);
                }
            })
            .catch(error => {
                console.log(error)
                //   if (error && error.response) {
                //     if (error.response.data && error.response.data == "Not logged in") {
                //       localStorage.clear(); // Clear local storage
                //       history.push('/auth/login');
                //     }
                //   }
                setErrorMessage("Failed to connect to backend")
                setError(true);

            })


    }

    return (
        <>
            <Topbar />
            <Navbar />
            {/* <!-- Contact Start --> */}
            <div className="my-front-css-custom">
                <div className="container-fluid py-5">
                    <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
                        <strong>Thank You! for your valuable Feedback. You response matters alot </strong>
                    </Alert>
                    <Alert color="danger" isOpen={error} toggle={onDismiss}>
                        <strong>Error! </strong> {errorMessage}
                    </Alert>
                    <div className="container py-5">
                        <div className="row align-items-center">
                            <div className="col-lg-5 mb-5 mb-lg-0">
                                <div
                                    className="bg-light d-flex flex-column justify-content-center px-5"
                                    style={{
                                        height: "450px",
                                        backgroundImage: `url(${feedback})`, // Replace with your image URL
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    {/* Your content goes here */}
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="section-title position-relative mb-4">
                                    <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">Reviews?</h6>
                                    <h3 className="display-6">Your Feedback Matters Alot</h3>
                                </div>
                                <div className="contact-form">
                                    <form role='form' onSubmit={AddFeedback}>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <input type="text" className="form-control border-top-0 border-right-0 border-left-0 p-0"
                                                    name="name" placeholder="Your Name" required="required" />
                                            </div>
                                            <div className="col-6 form-group">
                                                <input type="email" className="form-control border-top-0 border-right-0 border-left-0 p-0"
                                                    name="email" placeholder="Your Email" required="required" />
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="col-6 form-group">
                                                <input type="text" className="form-control border-top-0 border-right-0 border-left-0 p-0"
                                                    name="phonenumber" 
                                                    mask="+1 (999) 999-9999"
                                                    placeholder="+1 (___) ___-____"
                                                     required="required" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <b><p className="m-0">How do you rate your overall experience?</p></b>
                                            <div className="form-check">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    name="feedback"
                                                    id="bad"
                                                    value="Bad"
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="bad">
                                                    Bad
                                                </label>
                                            </div>

                                            <div className="form-check">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    name="feedback"
                                                    id="average"
                                                    value="Average"
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="average">
                                                    Average
                                                </label>
                                            </div>

                                            <div className="form-check">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    name="feedback"
                                                    id="good"
                                                    value="Good"
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="good">
                                                    Good
                                                </label>
                                            </div>

                                        </div>
                                        <div className="form-group">
                                            <textarea className="form-control border-top-0 border-right-0 border-left-0 p-0" rows="5"
                                                name="comments" placeholder="Comments" required="required"></textarea>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary py-3 px-5" type="submit" style={{ backgroundColor: '#ffc107', color: 'black' }}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Row style={{marginLeft:"50px", marginRight:"50px"}}>
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

                                    <th scope="col">Date</th>
                                    <th scope="col">Experience</th>
                                    <th scope="col">Comments</th>

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

                                                <td>
                                                    <Badge color="" className="badge-dot">
                                                        <i className="bg-info" />
                                                        {moment(row.createdAt).format('DD-MM-YYYY')}
                                                    </Badge>
                                                </td>
                                                <td>{row.Experience}</td>
                                                <td>{row.Comments}</td>



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
            
        </>
    )
};
export default FeedbackForm;
