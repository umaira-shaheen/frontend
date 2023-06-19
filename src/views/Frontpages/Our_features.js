import Navbar from "./NavBar";
import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";
import Topbar from "./Topbar";
import feature from "assets/img/landing_images/pic3.jpeg";
const Feature = () => {
    return (
        <>
        <Topbar/>
        <NavBar/>

            {/* <!-- Feature Start --> */}
            <div className="my-front-css-custom">
                <div className="container-fluid bg-image" style={{ margin: "90px 0" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 my-5 pt-5 pb-lg-5">
                                <div className="section-title position-relative mb-4">
                                    <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">Why Choose Us?</h6>
                                    <h1 className="display-4">Why You Should Start Learning with Us?</h1>
                                </div>
                                <p className="mb-4 pb-2">Our main aim </p>
                                <div className="d-flex mb-3">
                                    <div className="btn-icon bg-primary mr-4">
                                        <i className="fa fa-2x fa-graduation-cap text-white"></i>
                                    </div>
                                    <div className="mt-n1">
                                        <h4>Skilled Instructors</h4>
                                        <p> Flexible enviroment in campus, helpful and professional lecturers,
                                            all day accessible facilities, on-campus services are open to hire studentams,
                                            offering flexible working schedule and fair wage.</p>
                                    </div>
                                </div>
                                <div className="d-flex mb-3">
                                    <div className="btn-icon bg-secondary mr-4">
                                        <i className="fa fa-2x fa-certificate text-white"></i>
                                    </div>
                                    <div className="mt-n1">
                                        <h4>International Certificate</h4>
                                        <p>We are providing international certificates based on performance Like IELTS certificate</p>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="btn-icon bg-warning mr-4">
                                        <i className="fa fa-2x fa-book-reader text-white"></i>
                                    </div>
                                    <div className="mt-n1">
                                        <h4>Online Classes</h4>
                                        <p className="m-0">We are opening doors of education for students and providing flexible learning schedule by providing Online lecture uploading and other educational stuff .</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5" style={{ minHeight: "500px" }}>
                                <div className="position-relative h-100">
                                    <img className="position-absolute w-100 h-100" src={feature} style={{ objectFit: "cover" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Feature Start --> */}
            <Footer/>
        </>
    )
}
export default Feature;