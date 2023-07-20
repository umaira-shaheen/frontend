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

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import { Redirect, Link,useHistory } from 'react-router-dom';


const UserHeader = () => {
  // const history = useHistory();
  // const handleRedirect = () => {
  //   history.push('http://localhost:3000');
  // };
  const storedUser = localStorage.getItem('user');
  const user_info = JSON.parse(storedUser);
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/institute.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-5" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hello {user_info.First_name}</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see the progress you've made
                with your work and manage your projects or assigned tasks

              </p>

              {/* <Col xs="6">
                <a href="http://localhost:3000" className="btn btn-primary" style={{ marginTop: '-10px' }}>
                  Go to Website
                </a>
              </Col> */}
              <Col xs="6">
                <Link
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('http://localhost:3000', '_blank');               
                     }}
                  className="btn btn-primary"
                  style={{ marginTop: '-10px' }}
                >
                  Go to Website
                </Link>
              </Col>



            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
