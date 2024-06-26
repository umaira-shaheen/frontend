import { Redirect,Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";

const AdminNavbar = (props) => {
  const history = useHistory();
  const storedUser = localStorage.getItem('user');
  const user_info = JSON.parse(storedUser);
  localStorage.setItem('user', JSON.stringify(user_info));
  var user_image = ""
  if(user_info.User_img)
  {
    user_image = user_info.User_img.replace('public/', '')
  }
  else{
    user_image = "uploads/avater.png";
  }
    const [isloggedout, setloggedOut]=useState(false);
   //  useState for error message. initially error message will be false
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
  var user_image = ""
  if (user_info.User_img) {
    user_image = user_info.User_img.replace('public/', '')
  }
  else {
    user_image = "uploads/avater.png";
  }
 
  return(

 
   
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              {/* <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup> */}
            </FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={`http://localhost:8000/${user_image}`}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {user_info.First_name} {user_info.Last_name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem> */}
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={handleSubmit}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
