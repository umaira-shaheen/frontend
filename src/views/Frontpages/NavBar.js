import { Link, useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from '../../assets/img/theme/UKCELL.png'
import axios from 'axios';
import { useState, useEffect } from "react";
import "./front.scss"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
const NavBar = () => {
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const storedUser = localStorage.getItem('user');
    const user_info = JSON.parse(storedUser)
    const [isloggedout, setloggedOut] = useState(false);
    const [error, setError] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        axios.post("http://localhost:8000/auth/logout")
            .then(res => {
                if (res.data === "success") {
                    localStorage.clear(); // Clear local storage
                    // <Redirect to="/auth/login" />; 
                    history.push('/auth/login');
                } else {
                    setError(true);
                }
            })
            .catch(error => {
                setError(true);
            });
    }
    useEffect(() => {
        // Check if the user exists in local storage
        const user = localStorage.getItem('user');

        // Update the isLoggedIn state based on whether the user exists
        setIsLoggedIn(!!user);
    }, []);
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
                        {isLoggedIn ? (
                            // User is logged in, show the dashboard button
                            <Link to={"/auth/index"} className="btn btn-primary py-2 px-4">Dashboard</Link>
                        ) : (
                            // User is not logged in, show the login button
                            <Link to={"/auth/login"} className="btn btn-primary py-2 px-4">Login</Link>
                        )}
                        {isLoggedIn ? (
                            // User is logged in, show the logout button
                            <Link to={"/auth/login"} className="btn btn-primary py-2 px-4 d-none d-lg-block" onClick={handleSubmit}>Logout</Link>

                        ) : (
                            // User is not logged in, show the register button
                            <Link to={"/auth/register"} className="btn btn-primary py-2 px-4 d-none d-lg-block">
                                Register
                            </Link>
                        )}

                    </div>
                </nav>
            </div>
        </div>
    );




};
export default NavBar;
