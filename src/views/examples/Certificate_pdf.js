// import "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"
import "./Certificate.scss";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { PDFViewer, Document, Page, Text, Image, StyleSheet } from '@react-pdf/renderer';

import UKCELLLogo from './UKCELL.png';
import {  useHistory} from 'react-router-dom';
import Generate_Certificate from "./Generate_Certificate";
// const query = new URLSearchParams(this.props.location.search);
const search = window.location.search;
const params = new URLSearchParams(search);
const course_id = params.get('course_id');
console.log("course id"+ course_id);
const Certificate_pdf=()=>{
  const history = useHistory();
  const [studentfirstname, setStudentFirstName] = useState(null);
  const [studentlastname, setStudentLastName] = useState(null);

  const [coursename, setCoursename] = useState(null);
  const [quizquestions, setQuizQuestions] = useState(null);
  const [questions, setQuestions] = useState(null)
  const [question_title, setQuestion_title] = useState(null)
  const [marks, setMarks] = useState(null)
  const [question_type, setQuestion_type] = useState(null)
  const [options, setoptions] = useState(null)
  axios({     //FindOneCourse on the base of id API Calling
    method: 'get',
    withCredentials: true,
    sameSite: 'none',
    url: "http://localhost:8000/Certificate/SearchCertificate?temp_id=" + course_id
  }).
    then(res => {
      if(res.data.message==="Success")
      {
        console.log(res.data.data);

        // Assuming you have only one student in the array
        const firstStudent = res.data.data[0].Students[0];
        
        console.log("first name" + firstStudent.Student_First_name);
        console.log("course name" + res.data.data[0].Course_name);
    
        setStudentFirstName(firstStudent.Student_First_name);
        setStudentLastName(firstStudent.Student_Last_name);
        setCoursename(res.data.data[0].Course_name);
      }
    

    })


    .catch(error => {

      if (error.response.data.message == "Not logged in") {
        localStorage.clear(); // Clear local storage
        history.push('/auth/login');
      }

    })
    return(
     
       <>
      <div className="cert-custom-parent">
  <div className="container pm-certificate-container">
    <div className="outer-border"></div>
    <div className="inner-border"></div>
    
    <div className="pm-certificate-border col-xs-12">
      <div className="row pm-certificate-header">
        <div className="pm-certificate-title cursive col-xs-12 text-center">
          <h2>Uk College of English Language</h2>
        </div>
      </div>

      <div className="row pm-certificate-body">
        
        <div className="pm-certificate-block">
            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-2"> </div>
                <div className="pm-certificate-name underline margin-0 col-xs-8 text-center">
                <span className="pm-name-text bold">{studentfirstname} {studentlastname}</span>
                </div>
                <div className="col-xs-2"> </div>
              </div>
            </div>          

            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-2"> </div>
                <div className="pm-earned col-xs-8 text-center">
                  <span className="pm-earned-text padding-0 block cursive">has earned the certificate</span>
                  <span className="pm-credits-text block bold sans"></span>
                </div>
                <div className="col-xs-2"> </div>
                <div className="col-xs-12"></div>
              </div>
            </div>
            
            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-2"> </div>
                <div className="pm-course-title col-xs-8 text-center">
                  <span className="pm-earned-text block cursive">while completing the training course entitled</span>
                </div>
                <div className="col-xs-2"></div>
              </div>
            </div>

            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-2"> </div>
                <div className="pm-course-title underline col-xs-8 text-center">
                  <span className="pm-credits-text block bold sans"><strong style={{color:"darkblue" , fontSize:"15px"}}><i>{coursename}</i></strong></span>
                </div>
                <div className="col-xs-2"> </div>
              </div>
            </div>
        </div>       
        
        <div className="col-xs-12">
          <div className="row">
            <div className="pm-certificate-footer">
                <div className="col-xs-4 pm-certified col-xs-4 text-center">
                  <span className="pm-credits-text block sans"></span>
                  <span className="pm-empty-space block underline">Dr. Yasir Masood</span>
                  <span className="bold block">Founder and CEO of UKCELL</span>
                </div>
                <div className="col-xs-4">
                   
                </div>
                <div className="col-xs-4 pm-certified col-xs-4 text-center">
                <img src={UKCELLLogo} alt="" style={{marginLeft:'100px'}} />

                  {/* <span className="pm-credits-text block sans">Date Completed</span>
                  <span className="pm-empty-space block underline"></span>
                  <span className="bold block">DOB: </span>
                  <span className="bold block">Social Security # (last 4 digits)</span> */}
                </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
  </div>
  </>
    
    )
   
}
// const styles = {
//   logo: {
//     width: 100, // Set the desired width of the image
//     height: 80, // Set the desired height of the image
//     marginBottom: 20,
//     marginLeft: 220
//   },
//   page: {
//     padding: 30,
//   },
 
// };
// const MyCertificatePDFViewer = () => {
//   return (
//     <PDFViewer style={{ width: '100%', height: '500px' }}>
//       <Certificate_pdf />
//     </PDFViewer>
//   );
// };
export default Certificate_pdf;