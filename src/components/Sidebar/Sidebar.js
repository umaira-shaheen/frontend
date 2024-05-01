/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

var ps;

const Sidebar = (props) => {
  const storedUser = localStorage.getItem('user');
  const user_info = JSON.parse(storedUser);
  const [collapseOpen, setCollapseOpen] = useState();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    
    const filteredRoutes = props.routes.filter(
      // (route) => (!(route.name === "Users" && user_info.Role === "Teacher")&& !(route.name === "Attempt Assignment" && user_info.Role === "Teacher")  && !(route.name === "Users"  && user_info.Role === "Student" )&& !(route.name === "Quiz"  && user_info.Role === "Student" )&& !(route.name === "Assignment"  && user_info.Role === "Student" ) && !(route.name === "Quiz Questions"  && user_info.Role === "Student" ) && (route.name !== "Login" && route.name !== "Register"))
     (route)=>
     {
      if (user_info.Role === "Teacher" && route.name === "Users") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Teacher" && route.name === "My Assignments") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Teacher" && route.name === "My Quizes") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Teacher" && route.name === "My Courses") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Student" && route.name === "Users") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Student" && route.name === "Quiz") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Student" && route.name === "Assignment") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Student" && route.name === "Quiz Questions") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Student" && route.name === "Courses") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Admin" && route.name === "Quiz") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Admin" && route.name === "Assignment") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Admin" && route.name === "Quiz Questions") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Admin" && route.name === "My Assignments") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Student" && route.name === "Submitted Quizes") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Admin" && route.name === "Submitted Quizes") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Student" && route.name === "Submitted Assignments") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Admin" && route.name === "Submitted Assignments") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Admin" && route.name === "My Quizes") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Admin" && route.name === "My Courses") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Student" && route.name === "Feedbacks") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Teacher" && route.name === "Feedbacks") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Student" && route.name === "Messeges") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Teacher" && route.name === "Messeges") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Teacher" && route.name === "Lectures") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Admin" && route.name === "Lectures") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Admin" && route.name === "Manage Lectures") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Teacher" && route.name === "Feedback Form") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Admin" && route.name === "Feedback Form") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Student" && route.name === "Manage Lectures") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Student" && route.name === "Reports") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Teacher" && route.name === "Reports") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Teacher" && route.name === "Certificates") {
        return false; // Exclude the route for Teacher role
      }
      if (user_info.Role === "Student" && route.name === "Certificates") {
        return false; // Exclude the route for Teacher role
      }
      if (route.name === "Login" || route.name === "Register" || route.name == "FogotPassword" || route.name=="Lectures" || route.name=="Reset Password") {
        return false; // Exclude the Login and Register routes
      }
      return true; // Include all other routes

     }
       
    );
    
    return (
      <nav>
        {/* Always show these routes */}
        
        {filteredRoutes.map((prop, key) => (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
              activeClassName="active"
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        ))}
       
        {/* Conditionally show the "Users" route if the user role is "admin" */}
        {/* {user_info.Role === 'Teacher' ? null : (
          <NavItem>
            <NavLink
              to="/admin/users"
              tag={NavLinkRRD}
              onClick={closeCollapse}
              activeClassName="active"
            >
              <i className="ni ni-single-02 text-yellow" />
              Users
            </NavLink>
          </NavItem>
        )} */}
      </nav>
    );

      //   <NavItem key={key}>
      //     <NavLink
      //       to={prop.layout + prop.path}
      //       tag={NavLinkRRD}
      //       onClick={closeCollapse}
      //       activeClassName="active"
      //     >
      //       <i className={prop.icon} />
      //       {prop.name}
      //     </NavLink>
          
      //   { user_info.Role === 'Admin'&&
          
      //     <NavLink
      //       to="/admin/users"
      //       tag={NavLinkRRD}
      //       onClick={closeCollapse}
      //       activeClassName="active"
      //     >
      //       <i className="ni ni-single-02 text-yellow" />
      //       Users
      //     </NavLink>
      //    }
      //    </NavItem>
      
      // );
    // });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank"
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/theme/team-1-800x800.jpg")}
                  />
                </span>
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
              <DropdownItem to="/admin/user-profile" tag={Link}>
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
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      {/* <img alt={logo.imgAlt} src={logo.imgSrc} /> */}
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
          <hr className="my-3" />
          {/* Heading */}
          {/* <h6 className="navbar-heading text-muted">Documentation</h6> */}
          {/* Navigation */}
          <Nav className="mb-md-3" navbar>
            {/* <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar"> */}
                {/* <i className="ni ni-spaceship" />
                Getting started */}
            {/* </NavLink>
            </NavItem> */} 
            <NavItem>
            {/* <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar"> */}
                {/* <i className="ni ni-spaceship" />
                Manage Courses */}
              {/* </NavLink> */}
            </NavItem>
            <NavItem>
              {/* <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/colors?ref=adr-admin-sidebar"> */}
                {/* <i className="ni ni-palette" /> */}
                {/* Foundation */}
              {/* </NavLink> */}
            </NavItem>
            <NavItem>
              {/* <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar"> */}
                {/* <i className="ni ni-ui-04" /> */}
                {/* Components */}
              {/* </NavLink> */}
            </NavItem>
          </Nav>
          <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              {/* <NavLink href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adr-admin-sidebar"> */}
                {/* <i className="ni ni-spaceship" /> */}
                {/* Upgrade to PRO */}
              {/* </NavLink> */}
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
