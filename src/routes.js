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
import Index from "views/Index.js";
import Course from "views/examples/Course";
import User from "views/examples/User";
import Question from "views/examples/Question";
import View_Assignment from "views/examples/View_Assignment";
import Attempt_Quiz from "views/examples/Attempt_Quiz";
import Quiz from "views/examples/Quiz";
import Assignment from "views/examples/Assignment";
import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
import Forgot_password from "views/examples/Forgot_password";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
// import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Student_Courses from "views/examples/Student_Courses";
var routes = [
 
  // {
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: Index,
  //   layout: "/admin"
  // },
  {
    path: "/courses",
    name: "Courses",
    icon: "ni ni-book-bookmark text-blue",
    component: Course,
    layout: "/admin"
  },

  
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-single-02 text-yellow",
    component: User,
    layout: "/admin"
  },

  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin"
  // },

  {
    path: "/user-profile",
    name: "My Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/quiz",
    name: "Quiz",
    icon: "ni ni-books text-blue",
    component: Quiz,
    layout: "/admin"
  },
  {
    path: "/assignments",
    name: "Assignment",
    icon: "ni ni-books text-blue",
    component: Assignment,
    layout: "/admin"
  },
  {
    path: "/questions",
    name: "Quiz Questions",
    icon: "ni ni-book-bookmark",
    component: Question,
    layout: "/admin"
  },
  {
    path: "/Attempt Assignment",
    name: "My Assignments",
    icon: "ni ni-collection text-yellow",
    component: View_Assignment,
    layout: "/admin"
  },
  {
    path: "/Attempt Quiz",
    name: "My Quizes",
    icon: "ni ni-collection text-yellow",
    component: Attempt_Quiz,
    layout: "/admin"
  },
  {
    path: "/My Courses",
    name: "My Courses",
    icon: "ni ni-collection text-yellow",
    component: Student_Courses,
    layout: "/admin"
  },
  
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin"
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  // {
  //   path: "/ForgotPassword",
  //   name: "Forgotpassword",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Forgot_password,
  //   layout: "/auth"
  // }
];
export default routes;
