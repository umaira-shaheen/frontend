
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';

import Navbar from "./NavBar";
import Footer from "./Footer";
import Header from "./Header";
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
const ContactUs = () => {
    const history = useHistory();
    const [addsuccess, setaddSuccess] = useState(false);
    const onDismissaddSuccess = () => setaddSuccess(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const onDismiss = () => setError(false);
    const [feedbacktable, setFeedbacktable] = useState("");
    const [rerender, setRerender] = useState(false);
    function SendMessege(e) {

        e.preventDefault();
        console.log('hello');
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phonenumber=e.target.phonenumber.value;
        const subject = e.target.subject.value;
        const messege = e.target.messege.value;
        axios({  
            method: 'post',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Messege/SendMessege",
            data: { name: name, email: email,phonenumber:phonenumber, subject: subject, messege: messege },
        })
            .then(res => {
                if (res.data == "successfully submitted") {
                    setaddSuccess(true);
                }
                else {
                    setErrorMessage(res.data);
                    setError(true);
                }
            })
            .catch(error => {
                console.log(error)
                  if (error && error.response) {
                    if (error.response.data && error.response.data == "Not logged in") {
                      localStorage.clear(); // Clear local storage
                      history.push('/auth/login');
                    }
                  }
                setErrorMessage("Failed to connect to backend")
                setError(true);

            })


    }
    return (
        <>
            {/* <Topbar />
            <Navbar /> */}
            {/* <!-- Contact Start --> */}
            <div className="my-front-css-custom">
                <div className="container-fluid py-5">
                    <div className="container py-5">
                        <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
                            <strong>Thank You! for contacting us. Our team will contact you shortly. </strong>
                        </Alert>
                        <Alert color="danger" isOpen={error} toggle={onDismiss}>
                            <strong>Error! </strong> {errorMessage}
                        </Alert>
                        <div className="row align-items-center">
                            <div className="col-lg-5 mb-5 mb-lg-0">
                                <div className="bg-light d-flex flex-column justify-content-center px-5" style={{ height: "450px" }}>
                                    <div className="d-flex align-items-center mb-5">
                                        <div className="btn-icon bg-primary mr-4">
                                            <i className="fa fa-2x fa-map-marker-alt text-white"></i>
                                        </div>
                                        <div className="mt-n1">
                                            <h4>Our Location</h4>
                                            <p className="m-0">Uk College of English Langugae, Gujar Khan</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-5">
                                        <div className="btn-icon bg-secondary mr-4">
                                            <i className="fa fa-2x fa-phone-alt text-white"></i>
                                        </div>
                                        <div className="mt-n1">
                                            <h4>Call Us</h4>
                                            <p className="m-0">0318-5656084</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="btn-icon bg-warning mr-4">
                                            <i className="fa fa-2x fa-envelope text-white"></i>
                                        </div>
                                        <div className="mt-n1">
                                            <h4>Email Us</h4>
                                            <p className="m-0">umairashaheen32@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="section-title position-relative mb-4">
                                    <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">Need Help?</h6>
                                    <h1 className="display-4">Send Us A Message</h1>
                                </div>
                                <div className="contact-form">
                                    <form role='form' onSubmit={SendMessege}>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <input type="text" className="form-control border-top-0 border-right-0 border-left-0 p-0" placeholder="Your Name" required="required" name="name" />
                                            </div>
                                            <div className="col-6 form-group">
                                                <input type="email" className="form-control border-top-0 border-right-0 border-left-0 p-0" placeholder="Your Email" required="required" name="email" />
                                                </div> 
                                            <div className="col-6 form-group">
                                              
                                                <InputMask
                                                    mask=" (0399)-9999999"
                                                    placeholder=" Your Phone Number"
                                                    className="form-control border-top-0 border-right-0 border-left-0 p-0"
                                                    name="phonenumber"
                                                    id="phonenumber"
                                                    required
                                                />
                                            </div>
                                            
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control border-top-0 border-right-0 border-left-0 p-0" placeholder="Subject" name="subject" required="required" />
                                        </div>
                                        <div className="form-group">
                                            <textarea className="form-control border-top-0 border-right-0 border-left-0 p-0" rows="5" placeholder="Message" name="messege" required="required"></textarea>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary py-3 px-5" type="submit">Send Message</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Contact End --> */}
        </>
    )
};
export default ContactUs;