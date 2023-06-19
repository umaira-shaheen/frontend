import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from '../../assets/img/theme/UKCELL.png'
import { useState } from "react";
import "./front.scss"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
const NavBar = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(!dropdownOpen);
    return (
        <div className="my-front-css-custom">
            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
                  
                    <Link to={"/"} className="navbar-brand ml-lg-3 ">
                        <h1 className="m-0 text-uppercase text-primary"><img className="logo" src={logo} alt="UKCELL logo" /></h1>
                     </Link>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">
                        <div className="navbar-nav  py-0" style={{ marginLeft: "510px" }}>

                            <Link to={"/"} className="nav-item nav-link ">Home</Link>
                            <Link to={"/AboutUs"} className="nav-item nav-link ">About</Link>
                            <Link to={"/coursesList"} className="nav-item nav-link ">Courses</Link>

                            <Dropdown nav isOpen={dropdownOpen} toggle={toggle} >
                                <DropdownToggle nav caret>
                                    Quick Links
                                </DropdownToggle>
                                <DropdownMenu>
                                    
                                    <DropdownItem >
                                    <Link to={"/Our_features"}>Our Features</Link>
                                    </DropdownItem>

                                    <DropdownItem>
                                    <Link to={"/Our_team"}>Our Team</Link>
                                    </DropdownItem>
                                   
                                </DropdownMenu>
                            </Dropdown>
                            {/* <Link to={"/contact-us"} className="nav-item nav-link ">Contact</Link> */}
                        </div>
                        <Link to={"/auth/login"} className="btn btn-primary py-2 px-4 d-none d-lg-block">Login</Link>
                        <Link to={"/auth/register"} className="btn btn-primary py-2 px-4 d-none d-lg-block">Register</Link>

                    </div>
                </nav>
            </div>
        </div>
    );




};
export default NavBar;
