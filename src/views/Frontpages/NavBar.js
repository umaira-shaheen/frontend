import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from '../../assets/img/theme/UKCELL.png'
import "./front.scss"
const NavBar=()=>{
    return(
        <div className="my-front-css-custom">
        <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
            <a href="index.html" className="navbar-brand ml-lg-3">
            
                <h1 className="m-0 text-uppercase text-primary"><img className="logo" src={logo} alt="UKCELL logo"/></h1>
            </a>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">
                <div className="navbar-nav  py-0" style={{marginLeft:"510px"}}>
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

    
   

};
export default NavBar;
