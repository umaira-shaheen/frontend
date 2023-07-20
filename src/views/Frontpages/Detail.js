import Topbar from "./Topbar"
import NavBar from "./NavBar"
import Footer from "./Footer";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import {
    Alert,
    Button
} from "reactstrap";
import "./front.scss";
const Detail = () => {
    const [coursetable, setCoursetable] = useState(null);
    const [AllCoursetable, setAllCoursetable] = useState(null);
    const location = useLocation();
    const { courseName, courseCode, courseImage, startdate, enddate, coursecategory, description, instructor, course_id } = location.state;
    var moment = require('moment');
    const history = useHistory();
    const onDismiss = () => setError(false);
    const onDismissaddSuccess = () => setaddSuccess(false);
    const [addsuccess, setaddSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    function HandleSubmit() {


        const storedUser = localStorage.getItem('user');

        const user_info = JSON.parse(storedUser);
        console.log(user_info);
        // add course_id into local storage - last_url
        if (user_info == null) {
            localStorage.setItem('state', JSON.stringify(location.state))

            history.push('/auth/login');
        }
        else {
            const course_id = location.state.course_id;
            axios({
                method: 'get',
                withCredentials: true,
                url: "http://localhost:8000/course/EnrollCourse?temp_id=" + course_id,

            })
                .then(res => {
                    if (res.data === 'You are already enrolled in this course') {
                        setErrorMessage(res.data);
                        setError(true);
                    } else {
                        setaddSuccess(true);
                    }
                })
                .catch(error => {
                    if (error.response.data == "Not logged in") {
                        localStorage.clear(); // Clear local storage
                        history.push('/auth/login');
                      }
                    setErrorMessage("Failed to connect to backend")
                    setError(true);
                    console.log(error);
                })
            // method 1
            // call api and send course_id
            // BE - get taht course by id and check if current user req,session.user.id and match

        }

    }
    function GetCourse(e) {
        axios({
            method: 'get',
            url: "http://localhost:8000/course/GetRecentCourse",
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
    function GetAllCourse(e) {
        axios({
            method: 'get',
            url: "http://localhost:8000/course/GetAllCourse",
        })
            .then(res => {
                if (res.data) {
                    setAllCoursetable(res.data)
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        GetCourse();
        GetAllCourse();
    }, []);

    return (
        <>
            <Topbar />
            <NavBar />
            <div className="my-front-css-custom">
                <div className="container-fluid py-5">
                    <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
                        <strong> Enrollment successful </strong>
                    </Alert>
                    <Alert color="danger" isOpen={error} toggle={onDismiss}>
                        <strong>Error! </strong> {errorMessage}
                    </Alert>
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="mb-5">
                                    <div className="section-title position-relative mb-5">
                                        <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">Course Detail</h6>
                                        <h1 className="display-4">{courseName}</h1>
                                    </div>
                                    <img className="img-fluid rounded w-100 mb-4" src={courseImage} alt="Image" />
                                    <p>Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam dolor diam ipsum et, tempor voluptua sit consetetur sit. Aliquyam diam amet diam et eos sadipscing labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo et tempor consetetur takimata eirmod, dolores takimata consetetur invidunt magna dolores aliquyam dolores dolore. Amet erat amet et magna</p>

                                    <p>{description}</p>
                                </div>

                                <h2 className="mb-3">Related Courses</h2>
                                <div className="row">
                                    {AllCoursetable ?
                                        AllCoursetable.map((row, index) => {
                                            return (
                                                <div className="col-lg-4 col-md-6 pb-4" key={index}>
                                                    <Link
                                                        to={{
                                                            pathname: '/detail',
                                                            state: {
                                                                courseName: row.Course_title,
                                                                courseCode: row.Course_code,
                                                                courseImage: `http://localhost:8000/${row.course_img}`,
                                                                startdate: row.start_date,
                                                                enddate: row.end_date,
                                                                coursecategory: row.Course_category,
                                                                description: row.description,
                                                                instructor: row.assigned_to,
                                                                course_id: row._id
                                                            }
                                                        }}
                                                        className="courses-list-item position-relative d-block overflow-hidden mb-2"
                                                    >
                                                        <img className="img-fluid" src={`http://localhost:8000/${row.course_img}`} alt="" />

                                                        <div className="courses-text">
                                                            <h4 className="text-center text-white px-3">{row.Course_title}</h4>
                                                            <div className="border-top w-100 mt-3">
                                                                <div className="d-flex justify-content-between p-4">
                                                                    <span className="text-white"><i className="fa fa-user mr-2"></i>{row.Course_code}</span>
                                                                    <span className="text-white"><i className="fa fa-star mr-2"></i>4.5
                                                                        <small>(250)</small></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>


                                            )
                                        })
                                        :
                                        <div>
                                            <h1 >No course found!</h1>
                                        </div>
                                    }

                                </div>

                            </div>


                            <div className="col-lg-4 mt-5 mt-lg-0">

                                <div className="bg-primary mb-5 py-3">
                                    <h3 className="text-white py-3 px-4 m-0">Course Features</h3>

                                    <div className="d-flex justify-content-between border-bottom px-4">
                                        <h6 className="text-white my-3">Instructor</h6>
                                        <h6 className="text-white my-3"></h6>
                                    </div>
                                    <div className="d-flex justify-content-between border-bottom px-4">
                                        <h6 className="text-white my-3">Course_code</h6>
                                        <h6 className="text-white my-3">{courseCode}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between border-bottom px-4">
                                        <h6 className="text-white my-3">Start Date</h6>
                                        <h6 className="text-white my-3"> {moment(startdate).format('DD-MM-YYYY')}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between border-bottom px-4">
                                        <h6 className="text-white my-3">End Date</h6>
                                        <h6 className="text-white my-3"> {moment(enddate).format('DD-MM-YYYY')}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between border-bottom px-4">
                                        <h6 className="text-white my-3">Course Category</h6>
                                        <h6 className="text-white my-3">{coursecategory}</h6>
                                    </div>

                                    <h5 className="text-white py-3 px-4 m-0">Course Price: $199</h5>
                                    <div className="py-3 px-4">
                                        <Button className="btn btn-block btn-secondary py-3 px-5"
                                            color="primary"
                                            onClick={() => { HandleSubmit() }}
                                            type="submit">
                                            Enroll Now
                                        </Button>
                                    </div>
                                </div>


                                <div className="mb-5">
                                    <h2 className="mb-4">Recent Courses</h2>
                                    {coursetable ?
                                        coursetable.map((row, index) => {
                                            return (
                                                <Link
                                                    to={{
                                                        pathname: '/detail',
                                                        state: {
                                                            courseName: row.Course_title,
                                                            courseCode: row.Course_code,
                                                            courseImage: `http://localhost:8000/${row.course_img}`,
                                                            startdate: row.start_date,
                                                            enddate: row.end_date,
                                                            coursecategory: row.Course_category,
                                                            description: row.description,
                                                            instructor: row.assigned_to,
                                                            course_id: row._id
                                                        }
                                                    }}
                                                    className="d-flex align-items-center text-decoration-none mb-4" key={index}
                                                >
                                                    <img className="img-fluid1 rounded" src={`http://localhost:8000/${row.course_img}`} alt="" />

                                                    <div className="pl-3" >

                                                        <h6>{row.Course_title}</h6>
                                                        <div className="d-flex">
                                                            <small className="text-body mr-3"><i className="fa fa-user text-primary mr-2"></i>Jhon Doe</small>
                                                            <small className="text-body"><i className="fa fa-star text-primary mr-2"></i>{row.Course_code}</small>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                        :
                                        <div>
                                            <h1 >No course found!</h1>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default Detail;