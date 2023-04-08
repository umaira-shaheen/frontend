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
import Contact from "views/Frontpages/Contact";
import Courses from "views/Frontpages/Courses";
import Feature from "views/Frontpages/Feature";
import Team from "views/Frontpages/Team";
import Testimonial from "views/Frontpages/Testimonial";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      {/* <Route path="/" render={(props) => <AuthLayout {...props} />} /> */}
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route path="/about-us" render={(props) => <About {...props} />} />
      <Route path="/contact-us" render={(props) => <Contact {...props} />} />
      <Route path="/courses" render={(props) => <Courses {...props} />} />
      <Route path="/team" render={(props) => <Team {...props} />} />
      <Route path="/features" render={(props) => <Feature {...props} />} />
      <Route path="/testimonial" render={(props) => <Testimonial {...props} />} />
      {/* <Redirect from="/" to="/admin/index" /> */}
    </Switch>
  </BrowserRouter>
);
