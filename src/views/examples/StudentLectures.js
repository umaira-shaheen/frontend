import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import JsFileDownloader from 'js-file-downloader';
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

const StudentLectures=()=>{
   
    const [lecturetable, setLecturetable] = useState(null);
    const [coursename, setCourseName] = useState(null);

       
       

    function DownloadLecture(id)
    {
        axios({     //FindOneCourse on the base of id API Calling
            method: 'get',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Lecture/FindLecture?temp_id=" + id
        })
            .then(res => {
                if (res.data) {        
                    let lec_files = res.data.Lecture_files
                    console.log(lec_files);
                    lec_files.forEach(fileUrl => {
                    
                        new JsFileDownloader({ 
                            url: "http://localhost:8000/" + fileUrl
                        })
                        .then(function () {
                            console.log('success')
                        })
                        .catch(function (error) {
                           console.log('error')
                        });
                      });             
                }
            })
            .catch(error => {
                if (error && error.response) {
                    if (error.response.data && error.response.data == "Not logged in") {
                        localStorage.clear(); // Clear local storage
                        history.push('/auth/login');
                    }
                }
                console.log(error);
                setError(true);
               
            })
    }

    useEffect(() => {

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const course_id = params.get('course_id');
        console.log('course ID: ' + course_id);

        axios({     //FindOneCourse on the base of id API Calling
            method: 'get',
            url: "http://localhost:8000/course/FindCourse?temp_id=" + course_id
          })
            .then(res => {
              if (res.data) {
          
                setCourseName(res.data.Course_title);
            
              }
      
            })
            .catch(error => {
      
              console.log(error);
              setError(true);
        
            })
    
    }, []);
    return(
        <>
        <NewHeader/>
        <Container className="mt--7" fluid>
        <Row>
                    <div className="col">
                    <h2 style={{color:"white"}}>{coursename}</h2>
                        <Card className="shadow">
                            <CardHeader className="border-0">
                             
                            </CardHeader>

                            <Table className="align-items-center table-flush" responsive>

                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Lecture Course</th>
                                        <th scope="col">Lecture Number</th>
                                        <th scope="col">Lecture Title</th>
                                        <th scope="col"> Download Content</th>

                                        <th scope="col">Description</th>

                                        

                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {lecturetable ?
                                        lecturetable.map((row, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">
                                                        {/* <i className="ni ni-book-bookmark text-blue"/> */}
                                                        <span className="mb-0 text-sm">
                                                            {row.Lecture_Course}
                                                        </span>

                                                    </th>


                                                    <td style={{ textAlign: 'center' }}>
                                                        {row.Lecture_Number}
                                                    </td>
                                                    <td>{row.Lecture_title}</td>
                                                    <td>
                                                        <Button color="success"
                                                            style={{ fontSize: '13px', padding: '4px 8px' }}
                                                            onClick={() => { DownloadLecture(row._id) }}
                                                        >
                                                            Download Content
                                                        </Button>
                                                    </td>


                                                    <td>

                                                        {<div dangerouslySetInnerHTML={{ __html: row.description }} />}

                                                    </td>
                                                   
                                                </tr>)
                                        })
                                        :
                                        <tr>
                                            <td span="5">No Lecture found!</td>
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
export default StudentLectures;