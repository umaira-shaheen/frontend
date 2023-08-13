import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Editor } from "@tinymce/tinymce-react";
import JsFileDownloader from 'js-file-downloader';
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
const Upload_Lectures = (args) => {
    const [coursetable, setCoursetable] = useState(null);
    const [id, setLectureid] = useState(null);
    const [title, setLectureTitle] = useState(null);
    const [number, setLectureNumber] = useState(null);
    const [description, setdescription] = useState(null);
    const [course, setLectureCourse] = useState(null);
    const [lecturetable, setLecturetable] = useState(null);
    const [lecturefiles, setLectureFiles] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const closeModal = () => setModal(false);
    const [error, setError] = useState(false);
    const [addsuccess, setaddSuccess] = useState(false);
    const onDismissaddSuccess = () => setaddSuccess(false);
    const onDismiss = () => setError(false);
    const onDismissdeleteSuccess = () => setdeleteSuccess(false);
    const [editsuccess, seteditSuccess] = useState(false);
    const [deletesuccess, setdeleteSuccess] = useState(false);
    const onDismisseditSuccess = () => seteditSuccess(false);
    const [editmodal, setEditModal] = useState(false);
    const [deletemodal, setdeleteModal] = useState(false);
    const [tempId, setTempId] = useState('');
    const [tempName, setTempName] = useState('');
    const HandleEditor = (content, editor) => {
        setEditorContent(content)
    }
    const editModalClose = () => {
        setEditModal(!editmodal);
    }
    const [editorContent, setEditorContent] = useState(null);
    const [files, setFiles] = useState(null);

    const handleFileInputChange = (event) => {
        // const file = event.target.files[0];
        const newFiles = [...event.target.files]
        setFiles(newFiles);
        console.log(newFiles);

    };

    function GetTeacherCourses(e) {
        axios({
            method: 'get',
            withCredentials: true,
            url: "http://localhost:8000/course/get_teacher_courses",
        })
            .then(res => {
                if (res.data) {
                    setCoursetable(res.data)
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    function GetLecture(e) {
        axios({
            method: 'get',
            withCredentials: true,
            url: "http://localhost:8000/Lecture/GetLecture",
        })
            .then(res => {
                if (res.data) {
                    setLecturetable(res.data)
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    function AddLecture(e) {
        e.preventDefault();

        // console.log(e.target.category.value)
        const lecture_title = e.target.lecture_title.value;
        const lecture_number = e.target.LectureNumber.value;
        const lecture_course = e.target.courses.value;
        const description = editorContent;
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });


        // if (Lecturefiles) {
        //     formData.append('files', Lecturefiles);
        // }
        // if (audiofile) {
        //     formData.append('file', audiofile);
        // }
        formData.append('Lecture_title', lecture_title);
        formData.append('Lecture_Number', lecture_number);
        formData.append('Lecture_Course', lecture_course);
        formData.append('Description', description);

        axios({    //AddCourse API Calling
            method: 'post',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Lecture/AddLecture",
            data: formData,
        })
            .then(res => {
                if (res.data) {
                    console.log(res.data);
                    setaddSuccess(true);
                    //   GetTe();
                    //   setRerender(!rerender);
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
                closeModal();
            })
    }
    function EditLecture(e) {
        e.preventDefault();
        const lecture_title = e.target.lecture_title.value;
        const lecture_number = e.target.LectureNumber.value;
        const lecture_course = e.target.courses.value;
        const description = editorContent;
        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }
        // if (audiofile) {
        //     formData.append('audiofile', audiofile);
        // }
        formData.append('Lecture_title', lecture_title);
        formData.append('Lecture_Number', lecture_number);
        formData.append('Lecture_Course', lecture_course);
        formData.append('Description', description);
        axios({     //edit Course on the base of id API Calling
            method: 'post',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Lecture/EditLecture",
            data: formData,
        })
            .then(res => {
                if (res.data == "success") {
                    seteditSuccess(true);
                    GetLecture();
                    setRerender(!rerender);
                }
                else {
                    setErrorMessage(res.data);
                    setError(true);
                }
                setEditModal(!editmodal);

            })
            .catch(error => {
                console.log(error)
                if (error && error.response) {
                    if (error.response.data && error.response.data == "Not logged in") {
                        localStorage.clear(); // Clear local storage
                        history.push('/auth/login');
                    }
                }
                setErrorMessage("Failed to connect to backend");
                setError(true);
                console.log(error);

            })
    };
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
                    lec_files.forEach(fileUrl => {
                    
                        new JsFileDownloader({ 
                            url: "http://localhost:8000/" + fileUrl,
                            filename: data.lecture_title + "-" + data.lecture_number
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
    function FindLecture(id) {

        axios({     //FindOneCourse on the base of id API Calling
            method: 'get',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Lecture/FindLecture?temp_id=" + id
        })
            .then(res => {
                if (res.data) {

                    setLectureid(res.data._id);
                    setLectureTitle(res.data.Lecture_title);
                    setLectureNumber(res.data.Lecture_Number);
                    setdescription(res.data.description);
                    setLectureCourse(res.data.Lecture_Course);
                    setLectureFiles(res.data.Lecture_files)
                    console.log(res.data);
                    setEditModal(!editmodal);
                    

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
                setEditModal(!editmodal);
            })
    };
    function DeleteLecture() {
        axios({     //DeleteCourse API Calling
            method: 'get',
            withCredentials: true,
            sameSite: 'none',
            url: "http://localhost:8000/Lecture/DeleteLecture?temp_id=" + tempId
        })
            .then(res => {
                if (res.data.indicator == "success") {
                    setdeleteSuccess(true);
                    GetLecture();
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
                if (error && error.response) {
                    if (error.response.data && error.response.data == "Not logged in") {
                        localStorage.clear(); // Clear local storage
                        history.push('/auth/login');
                    }
                }
                console.log(error);
                setErrorMessage("Network Error!");
                setError(true);
                setdeleteModal(!deletemodal);
            })

    };
    const edittoggle1 = (event) => {
        setEditModal(!editmodal);
    };
    const Deletetoggle = (id, name) => {
        setTempName(name);
        setTempId(id);
        setdeleteModal(!deletemodal);
        // DeleteCourse(id) ;
    };
    const DeletetoggleClose = () => {
        setdeleteModal(!deletemodal);
    }
    useEffect(() => {
        // Update the document title using the browser API
        GetTeacherCourses();
        GetLecture();


    }, []);
    return (
        <>
            <NewHeader />
            <Container className="mt--7" fluid>
                <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
                    <strong> Lecture Added! </strong>
                </Alert>
                <Alert color="danger" isOpen={error} toggle={onDismiss}>
                    <strong>Error! </strong> {errorMessage}
                </Alert>
                <Alert color="success" isOpen={deletesuccess} toggle={onDismissdeleteSuccess}>
                    <strong> Lecture deleted successfully! </strong>
                </Alert>
                <Alert color="success" isOpen={editsuccess} toggle={onDismisseditSuccess}>
                    <strong> Lecture Updated successfully! </strong>
                </Alert>
                
                <Modal isOpen={deletemodal} toggle={DeletetoggleClose} {...args} size='sm'>
                    <ModalHeader toggle={DeletetoggleClose} >Delete Lecture</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete <b>{tempName}</b>?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => { DeleteLecture() }}>
                            Delete
                        </Button>{' '}
                        <Button color="secondary" onClick={DeletetoggleClose}>
                            Cancel
                        </Button>
                    </ModalFooter>

                </Modal>
                <Modal isOpen={modal} toggle={toggle} {...args} size='lg'>
                    <Form role="form" onSubmit={AddLecture}>
                        <ModalHeader toggle={toggle}>Add new Lecture</ModalHeader>
                        <ModalBody>
                            <Row >
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="LectureTitle">
                                            Lecture title
                                        </Label>
                                        <Input
                                            id="lecture_title"
                                            name="lecture_title"
                                            placeholder="Enter Lecture Title"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="LectureNumber">
                                            Lecture Number
                                        </Label>
                                        <Input
                                            id="LectureNumber"
                                            name="LectureNumber"
                                            placeholder="Enter Lecture Number"
                                            type="Number"
                                            min={'1'}
                                            max={'50'}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="course">
                                            Select Course
                                        </Label>

                                        <Input
                                            id="Allcourses"
                                            name="courses"
                                            type="select"
                                            required
                                        >
                                            {coursetable ?
                                                coursetable

                                                    .map((row, index) => {
                                                        return (
                                                            <option key={index} value={row.Course_title}>
                                                                {row.Course_title}
                                                            </option>
                                                        )
                                                    })
                                                :
                                                <h1>Courses not assigned yet!</h1>
                                            }


                                        </Input>

                                    </FormGroup>
                                </Col>


                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Label>
                                        Upload Your Lecture Content (Pdf, Audio, Video):
                                        <Input type="file" onChange={handleFileInputChange}
                                            multiple
                                            required
                                        />
                                    </Label>
                                </Col>
                                {/* <Col md={6}>
                                    <Label>
                                        Upload Lecture Audio:
                                        <Input type="file" onChange={handleAudioFileInputChange} />
                                    </Label>
                                </Col> */}
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="description">
                                            Lecture Description
                                        </Label>
                                        <Editor
                                            initialValue='Lecture Description'
                                            onEditorChange={HandleEditor}
                                            defaultValue={description}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit" >
                                Add Course
                            </Button>{' '}
                            <Button color="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
                <Modal isOpen={editmodal} toggle={edittoggle1} {...args} size='lg'>
                    <Form role="form" onSubmit={EditLecture}>
                        <ModalHeader toggle={edittoggle1}>Edit Lecture</ModalHeader>
                        <ModalBody>
                            <Row >
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="LectureTitle">
                                            Lecture title
                                        </Label>
                                        <Input
                                            id="lecture_title"
                                            name="lecture_title"
                                            placeholder="Enter Lecture Title"
                                            type="text"
                                            defaultValue={title}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="LectureNumber">
                                            Lecture Number
                                        </Label>
                                        <Input
                                            id="LectureNumber"
                                            name="LectureNumber"
                                            placeholder="Enter Lecture Number"
                                            type="Number"
                                            min={'1'}
                                            max={'50'}
                                            defaultValue={number}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="course">
                                            Select Course
                                        </Label>

                                        <Input
                                            id="Allcourses"
                                            name="courses"
                                            type="select"
                                            defaultValue={course}
                                            readOnly
                                        >
                                            {coursetable ?
                                                coursetable

                                                    .map((row, index) => {
                                                        return (
                                                            <option key={index} value={row.Course_title}>
                                                                {row.Course_title}
                                                            </option>
                                                        )
                                                    })
                                                :
                                                <h1>Courses not assigned yet!</h1>
                                            }


                                        </Input>

                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="LectureTitle" hidden>
                                            Lecture Id
                                        </Label>
                                        <Input
                                            id="lecture_id"
                                            name="lecture_id"
                                            placeholder="Enter Lecture Id"
                                            type="text"
                                            defaultValue={id}
                                            hidden
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Label>
                                        Upload Lecture Notes (Pdf):
                                        <Input type="file" onChange={handleFileInputChange} />
                                    </Label>
                                </Col>

                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="description">
                                            Lecture Description
                                        </Label>
                                        <Editor
                                            initialValue='Lecture Description'
                                            onEditorChange={HandleEditor}
                                            defaultValue={description}
                                            required
                                        />
                                    </FormGroup>
                                </Col>

                            </Row>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit" >
                                Edit Course
                            </Button>{' '}
                            <Button color="secondary" onClick={editModalClose}>
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
                                    <div className="col text-right">
                                        <Button
                                            color="primary"
                                            onClick={toggle}
                                            size="md"
                                        >
                                            Add new Lecture
                                        </Button>
                                    </div>
                                </Row>
                            </CardHeader>

                            <Table className="align-items-center table-flush" responsive>

                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Lecture Course</th>
                                        <th scope="col">Lecture Number</th>
                                        <th scope="col">Lecture Title</th>
                                        <th scope="col"> Download Content</th>

                                        <th scope="col">Description</th>

                                        <th scope="col">Action</th>

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
                                                    <td>
                                                        <Button color="primary"
                                                            style={{ fontSize: '15px', padding: '4px 8px' }}
                                                            onClick={() => { FindLecture(row._id) }}
                                                        >
                                                            Edit
                                                            {/* <i className="ni ni-active-40"></i> */}
                                                        </Button>
                                                        <Button color="danger"
                                                            style={{ fontSize: '15px', padding: '4px 8px' }}
                                                            onClick={() => { Deletetoggle(row._id, row.Lecture_title) }}
                                                        >
                                                            Delete
                                                            {/* <i className="ni ni-fat-remove"></i> */}
                                                        </Button>
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
}
export default Upload_Lectures;