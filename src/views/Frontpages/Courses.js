import Navbar from "./NavBar";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Detail from "./Detail";

// import bg_img from "assets/img/landing_images/bg-image.jpg";
import "./front.scss"
const Courses = () => {
    const [coursetable, setCoursetable] = useState(null);
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
    useEffect(() => {
        GetCourse();
    }, []);
    return (
        <>


            <div className="my-front-css-custom">
                {/* <!-- Courses Start --> */}
                <div class="container-fluid py-5">
                    <div class="container py-5">
                        <div class="row mx-0 justify-content-center">
                            <div class="col-lg-8" >
                                <div class="section-title text-center position-relative mb-5">
                                    <h6 class="d-inline-block position-relative text-secondary text-uppercase pb-2">Our Courses</h6>
                                    <h1 class="display-4">Checkout New Releases Of Our Courses</h1>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            {coursetable ?
                                coursetable.map((row, index) => {
                                    return (
                                        <div class="col-lg-4 col-md-6 pb-4" key={index}>
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
                                                        instructor: row.assigned_to
                                                    }
                                                }}
                                                className="courses-list-item position-relative d-block overflow-hidden mb-2"
                                            >
                                                <img class="img-fluid" src={`http://localhost:8000/${row.course_img}`} alt="" />

                                                <div class="courses-text">
                                                    <h4 class="text-center text-white px-3">{row.Course_title}</h4>
                                                    <div class="border-top w-100 mt-3">
                                                        <div class="d-flex justify-content-between p-4">
                                                            <span class="text-white"><i class="fa fa-user mr-2"></i>{row.Course_code}</span>
                                                            <span class="text-white"><i class="fa fa-star mr-2"></i>4.5
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

                        </div>//
                    </div>
                </div>
                {/* <!-- Courses End --> */}
            </div>

        </>
    );
}
export default Courses;