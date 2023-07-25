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
import React from "react";
import ReactDOM from "react-dom/client";
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/css/styles.css"

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Home from "views/Frontpages/Homepage";
import About from "views/Frontpages/About";
import  MyPDFViewer from "views/examples/MyPdfDocument";
import  MyAssignmentPDF from "views/examples/Assignment_pdf";

import Contact from "views/Frontpages/Contact";
import ContactUs from "views/Frontpages/ContactUs";
import CoursesList from "views/Frontpages/CoursesList";
import Our_features from "views/Frontpages/Our_features";
import Detail from "views/Frontpages/Detail";
import Forgot_password from "views/examples/Forgot_password";
import Feature from "views/Frontpages/Feature";
import Team from "views/Frontpages/Our_team";
import Testimonial from "views/Frontpages/Testimonial";
import AboutUs from "views/Frontpages/AboutUS";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      {/* <Route path="/" render={(props) => <AuthLayout {...props} />} /> */}
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route path="/about-us" render={(props) => <About {...props} />} />
      <Route path="/AboutUs" render={(props) => <AboutUs {...props} />} />
      <Route path="/contact-us" render={(props) => <ContactUs {...props} />} />
      <Route path="/coursesList" render={(props) => <CoursesList {...props} />} />
      <Route path="/Our_team" render={(props) => <Team {...props} />} />
      <Route path="/Our_features" render={(props) => <Our_features {...props} />} />
      <Route path="/testimonial" render={(props) => <Testimonial {...props} />} />
      <Route path="/detail" render={(props) => <Detail {...props} />} />
      <Route path="/QuizPdf" render={(props) => <MyPDFViewer {...props} />} />
      <Route path="/AssignmentPdf" render={(props) => <MyAssignmentPDF {...props} />} />
      {/* <Redirect from="/" to="/admin/index" /> */}
    </Switch>
  </BrowserRouter>
);
