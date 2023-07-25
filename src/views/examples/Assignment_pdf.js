import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFViewer, Document, Page, Text, Image, StyleSheet } from '@react-pdf/renderer';
import UKCELLLogo from './UKCELL.png';
import {  useHistory} from 'react-router-dom';
import Html from 'react-pdf-html';

// const query = new URLSearchParams(this.props.location.search);
const search = window.location.search;
const params = new URLSearchParams(search);
const assignment_id = params.get('assignment_id');
const MyPDFDocument = () => {
  // call API to get quiz data
  var moment = require('moment');
  const history = useHistory();
  const [assignmentname, setAssignmentName] = useState(null);
  const [assignmentcourse,  setAssignmentCourse] = useState(null);
  const [assignmentquestions, setAssignmentQuestions] = useState('');
  const [assignmentdate, setAssignmentdate] = useState(null);
  const [marks, setTotalMarks] = useState(null);
   var date= moment(assignmentdate).format('DD-MM-YYYY')

  
  useEffect(() => {

    axios({     //FindOneCourse on the base of id API Calling
        method: 'get',
        withCredentials: true,
        sameSite: 'none',
        url: "http://localhost:8000/Assignment/SearchAssignment?temp_id=" + assignment_id
      }).
        then(res => {
          setAssignmentName(res.data.data.Assignment_title);
          setAssignmentCourse(res.data.data.Assignment_Course);
          setAssignmentdate(res.data.data.Date);
         
          setTotalMarks(res.data.data.Total_marks)
          setAssignmentQuestions(res.data.data.description);
        })
    
    
        .catch(error => {
    
          if (error.response.data.message == "Not logged in") {
            localStorage.clear(); // Clear local storage
            history.push('/auth/login');
          }
    
        })

  }, []);


  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image
          src={UKCELLLogo}
          style={styles.logo}
        />
        <Text style={styles.header}> Course : {assignmentcourse}</Text>
        <Text style={styles.header}> Asignment Title : {assignmentname}</Text>
        <Text style={styles.header}> Due Date : {date}</Text>
      
        <Text style={styles.header}> Total Marks : {marks}</Text>
        <Text style={styles.header}> Here are the Questions you need to attempt before due date</Text>
        <Html style={styles.Questions}>{ assignmentquestions }</Html>
      </Page>
    </Document>
  );
};
const styles = {
  logo: {
    width: 100, // Set the desired width of the image
    height: 80, // Set the desired height of the image
    marginBottom: 20,
    marginLeft: 220
  },
  page: {
    padding: 30,
  },
  header: {

    marginBottom: 20,
    textAlign: 'center',
    fontSize: '17px',
  },
  Questions: {
    fontSize: 14,
    marginTop: 30, // Add some space between the header and question

  },
  Options:
  {
    fontSize: 12,
    marginTop: 30,
    marginLeft: 30,
  }
};
const MyAssignmentPDF = () => {
  return (
    <PDFViewer style={{ width: '100%', height: '500px' }}>
      <MyPDFDocument />
     
    </PDFViewer>
  );
};

export default MyAssignmentPDF;