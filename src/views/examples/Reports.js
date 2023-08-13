
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';
import report from "assets/img/landing_images/report.jpg";
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

import NewHeader from 'components/Headers/NewHeader';

const Reports = (args) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <>

      {/* <!-- Contact Start --> */}
      <div className="my-front-css-custom">
        <NewHeader />
        <Modal isOpen={modal} toggle={toggle} {...args} size='lg'>
          <Form>
            <ModalHeader toggle={toggle}>Student Wise Report</ModalHeader>
            <ModalBody>
            <Row className="align-items-center mb-3">
            <div className="col">

                      <Button
                        color="success"
                        size="lg"
                        onClick={toggle}
                      >
                        Registration Report
                      </Button>
                    </div>
                  </Row>
                  <Row className="align-items-center mb-3">
                    <div className="col">
                      <Button
                        color="success"
                        size="lg"
                      >
                        Quiz Report
                      </Button>
                    </div>
                  </Row>
                  <Row className="align-items-center">
                    <div className="col">
                      <Button
                        color="success"
                        size="lg"
                      >
                        Assignment Report
                      </Button>
                    </div>
                    </Row>
                    <Row className="align-items-center">
                    <div className="col">
                      <Button
                        color="success"
                        size="lg"
                      >
                        Enrollment Report
                      </Button>
                    </div>
                    </Row>


            </ModalBody>
            <ModalFooter>
             
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <div className="container-fluid py-5" >
          <div className="container py-5" style={{ marginTop: "-80px" }}>

            <div className="row align-items-center">
              <div className="col-lg-5 mb-5 mb-lg-0">
                <div
                  className="bg-light d-flex flex-column justify-content-center px-5"
                  style={{
                    height: "450px",
                    backgroundImage: `url(${report})`, // Replace with your image URL
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Your content goes here */}
                </div>
              </div>
              <div className="col-lg-7">
                <div className="section-title position-relative mb-4">
                  <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">Reports?</h6>
                  <h3 className="display-6">Generate Reports</h3>
                </div>
                <div className="contact-form">
                  <Row className="align-items-center mb-3">
                    <div className="col">
                      <Button
                        color="success"
                        size="lg"
                        onClick={toggle}
                      >
                        Student Report
                      </Button>
                    </div>
                  </Row>
                  <Row className="align-items-center mb-3">
                    <div className="col">
                      <Button
                        color="success"
                        size="lg"
                      >
                        Teacher Report
                      </Button>
                    </div>
                  </Row>
                  <Row className="align-items-center">
                    <div className="col">
                      <Button
                        color="success"
                        size="lg"
                      >
                        Course Report
                      </Button>
                    </div>
                  </Row>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
};
export default Reports;
