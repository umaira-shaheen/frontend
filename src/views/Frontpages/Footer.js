// import overlay_top from "assets/img/landing_images/overlay_top";
import logo from '../../assets/img/theme/UKCELL.png'
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const Footer = () => {
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

                <div className="container-fluid position-relative overlay-top bg-dark text-white-50 py-5" style={{ marginTop: "90px" }}>
                    <div className="container mt-5 pt-5">
                        <div className="row">
                            <div className="col-md-6 mb-5">
                                <h1 className="mt-n2 text-uppercase text-white">
                                    <Link to={"/"} className="navbar-brand">
                                        <img className="logo" src={logo} alt="UKCELL logo" /></Link><span style={{ marginLeft: "10px" }}>UKCELL</span></h1>

                                <p className="m-0">We are opening doors of education for students and providing flexible learning schedule by providing Online lecture uploading and other educational stuff .</p>

                            </div>
                            {/* <div className="col-md-6 mb-5">
                    <h3 className="text-white mb-4">Newsletter</h3>
                    <div className="w-100">
                        <div className="input-group">
                            <input type="text" className="form-control border-light" style={{padding: "30px"}} placeholder="Your Email Address"/>
                            <div className="input-group-append">
                                <button className="btn btn-primary px-4">Register Now</button>
                            </div>
                        </div>
                    </div>
                </div> */}
                        </div>
                        <div className="row">
                            <div className="col-md-4 mb-5">
                                <h3 className="text-white mb-4">Get In Touch</h3>
                                <p><i className="fa fa-map-marker-alt mr-2"></i>UK College of English Language near MCB Bank, Gujar Khan</p>
                                <p><i className="fa fa-phone-alt mr-2"></i>0318-5656084</p>
                                <p><i className="fa fa-envelope mr-2"></i>Umairashaheen32@gmail.com</p>
                                <div className="d-flex justify-content-start mt-4">
                                    <a className="text-white mr-4" href="https://twitter.com/ShaheenUmaira?t=J_mLCggKoSQHiIU1nG9RUQ&s=09"><i className="fab fa-2x fa-twitter"></i></a>
                                    <a className="text-white mr-4" href="https://www.facebook.com/profile.php?id=100083973306949&mibextid=ZbWKwL"><i className="fab fa-2x fa-facebook-f"></i></a>
                                    <a className="text-white mr-4" href="https://www.linkedin.com/in/umaira-shaheen-a795ab258/"><i className="fab fa-2x fa-linkedin-in"></i></a>
                                    <a className="text-white" href="https://instagram.com/umairashaheen_1234?igshid=ZGUzMzM3NWJiOQ=="><i className="fab fa-2x fa-instagram"></i></a>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h3 className="text-white mb-4">Our Courses</h3>
                                {coursetable ?
                                coursetable
                                .filter(row => row.status === 'Publish')
                                .map((row, index) => {
                                    return (
                                <div className="d-flex flex-column justify-content-start" key={index}>
                                <Link to={"/coursesList"} className="text-white-50 mb-2"><i className="fa fa-angle-right mr-2"></i>{row.Course_title}</Link> 

                                    
                                </div>
                                 )
                                })
                                :
                                <div>
                                    <h1 >No course Added by UkCELL!</h1>
                                </div>
                            }
                            </div>
                            <div className="col-md-4 mb-5">
                                <h3 className="text-white mb-4">Quick Links</h3>
                                <div className="d-flex flex-column justify-content-start">
                                    <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Privacy Policy</a>
                                    <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Terms & Condition</a>
                                    <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Regular FAQs</a>
                                    <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Help & Support</a>
                                    <a className="text-white-50" href="#"><i className="fa fa-angle-right mr-2"></i>Contact</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid bg-dark text-white-50 border-top py-4" style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
                                <p className="m-0">Copyright &copy; <a className="text-white" href="#">UKCELL</a>. All Rights Reserved.
                                </p>
                            </div>
                            <div className="col-md-6 text-center text-md-right">
                                <p className="m-0">Designed by <a className="text-white" href="https://www.linkedin.com/in/umaira-shaheen-a795ab258/">Umaira Shaheen</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );

};
export default Footer;
