import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./front.scss"
const NavBar=()=>{
    return(
        <div className="my-front-css-custom">
        <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
            <a href="index.html" className="navbar-brand ml-lg-3">
                <h1 className="m-0 text-uppercase text-primary"><i className="fa fa-book-reader mr-3"></i>UKCELL</h1>
            </a>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">
                <div className="navbar-nav mx-auto py-0">
                    <Link to={"/"} className="nav-item nav-link active">Home</Link> 
                    <Link to={"/about-us"} className="nav-item nav-link active">About</Link> 
                    <Link to={"/courses"} className="nav-item nav-link active">Courses</Link> 
                    
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Pages</a>
                        <div className="dropdown-menu m-0">
                        <Link to={"/courses"} className="nav-item nav-link active">Courses</Link> 
                        <Link to={"/features"} className="nav-item nav-link active">Features</Link> 
                        <Link to={"/team"} className="nav-item nav-link active">Team</Link> 
                        <Link to={"/testimonial"} className="nav-item nav-link active">Testimonial</Link> 
                        </div>
                    </div>
                    <a href="contact.html" className="nav-item nav-link">Contact</a>
                </div>
                <a href="" className="btn btn-primary py-2 px-4 d-none d-lg-block">Join Us</a>
            </div>
        </nav>
    </div>
    </div>
    );
//     <div classNameName="my-front-css-custom">
//    <div classNameName="container-fluid p-0">
//         <nav classNameName="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
//             <a href="index.html" classNameName="navbar-brand ml-lg-3">
//                 <h1 classNameName="m-0 text-uppercase text-primary"><i classNameName="fa fa-book-reader mr-3"></i>Edukate</h1>
//             </a>
//             <button type="button" classNameName="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
//                 <span classNameName="navbar-toggler-icon"></span>
//             </button>
//             <div classNameName="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">
//                 <div classNameName="navbar-nav mx-auto py-0">
//                     <NavLink to="/">Home</NavLink>
//                     <NavLink to="/about-us">About Us</NavLink>
//                     <NavLink to="/courses">Courses</NavLink>
                
//                     <div classNameName="nav-item dropdown">
//                         <a href="#" classNameName="nav-link dropdown-toggle" data-toggle="dropdown">Pages</a>
//                         <div classNameName="dropdown-menu m-0">
//                         <NavLink to="/courses">Course Details</NavLink>
//                             <NavLink to="/features">Our Features</NavLink>
//                             <NavLink to="/team">Instructors</NavLink>
//                             <NavLink to="/testimonial">Testimonial</NavLink>
//                         </div>
//                     </div>
//                     <NavLink to="/contact-us">Contact</NavLink>
//                 </div>
//                 <a href="" classNameName="btn btn-primary py-2 px-4 d-none d-lg-block">Join Us</a>
//             </div>
//         </nav>
//     </div>
//     </div>
    
   

};
export default NavBar;
