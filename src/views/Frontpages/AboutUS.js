import Navbar from "./NavBar";
import Footer from "./Footer";
import Header from "./Header";
import about_img from "assets/img/landing_images/aboutus.jpg";
import Topbar from "./Topbar";
import NavBar from "./NavBar";
import "./front.scss"
const AboutUs=()=>
{
    return(
        <>
        <Topbar/>
        <NavBar/>
        
         {/* <!-- About Start --> */}
         <div className="my-front-css-custom">
        <div className="container-fluid py-5">
        <div className="container py-5">
            <div className="row">
                <div className="col-lg-5 mb-5 mb-lg-0" style={{minHeight: "500px"}}>
                    <div className="position-relative h-100">
                        <img className="position-absolute w-100 h-100" src={about_img} style={{objectFit:"cover"}}/>
                    </div>
                </div>
                <div className="col-lg-7">
                    <div className="section-title position-relative mb-4">
                        <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">About Us</h6>
                        <h1 className="display-4">First Choice For Online Education Anywhere</h1>
                    </div>
                    <p>Established back in 2007 by DR.Yasir Masood. UKCELL is founded on the ideals of inclusivity, diversity and collaboration, with a passion of  increasing access to education, healthy learning and delivering social good.

                      Grounded by a sense of community and the notion that collective expertise and power can transform people’s lives, what makes us unique is our ability to impart the power of learning, sharing and connection by sitting at home in just one click</p>
                    <div className="row pt-3 mx-0">
                        <div className="col-3 px-0">
                            <div className="bg-success text-center p-4">
                                <h1 className="text-white" data-toggle="counter-up">15</h1>
                                <h6 className="text-uppercase text-white">Available<span className="d-block">Subjects</span></h6>
                            </div>
                        </div>
                        <div className="col-3 px-0">
                            <div className="bg-primary text-center p-4">
                                <h1 className="text-white" data-toggle="counter-up">12</h1>
                                <h6 className="text-uppercase text-white">Online<span className="d-block">Courses</span></h6>
                            </div>
                        </div>
                        <div className="col-3 px-0">
                            <div className="bg-secondary text-center p-4">
                                <h1 className="text-white" data-toggle="counter-up">10</h1>
                                <h6 className="text-uppercase text-white">Skilled<span className="d-block">Instructors</span></h6>
                            </div>
                        </div>
                        <div className="col-3 px-0">
                            <div className="bg-warning text-center p-4">
                                <h1 className="text-white" data-toggle="counter-up">500+</h1>
                                <h6 className="text-uppercase text-white">Happy<span className="d-block">Students</span></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
   
    {/* <!-- About End --> */}
        </>
    )
};
export default AboutUs;