import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFViewer, Document, Page, Text, Image, StyleSheet } from '@react-pdf/renderer';
import UKCELLLogo from './UKCELL.png';
import {  useHistory} from 'react-router-dom';
// const query = new URLSearchParams(this.props.location.search);
const search = window.location.search;
const params = new URLSearchParams(search);
const quiz_id = params.get('quiz_id');
const MyPDFDocument = () => {
  // call API to get quiz data
  const history = useHistory();
  const [quizname, setQuizName] = useState(null);
  const [quizcourse, setQuizCourse] = useState(null);
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
    url: "http://localhost:8000/Quiz/SearchQuiz?temp_id=" + quiz_id
  }).
    then(res => {
      setQuizName(res.data.data.Quiz_title);
      setQuizCourse(res.data.data.Quiz_Course);
      setQuizQuestions(res.data.data.Questions);
    })


    .catch(error => {

      if (error.response.data.message == "Not logged in") {
        localStorage.clear(); // Clear local storage
        history.push('/auth/login');
      }

    })

  function QuizQuestions() {
    axios({
      method: 'get',
      withCredentials: true,
      sameSite: 'none',
      url: "http://localhost:8000/Question/QuizQuestions?temp_id=" + quiz_id
    })
    .then(res => {
      if (res.data.data && res.data.message == "success") 
      {
        setQuestions(res.data.data);
        setQuestion_title(res.data.data.Question);
        setQuestion_type(res.data.data.questions_type);
        setMarks(res.data.data.marks);
        setoptions(res.data.data.options);
      }

      
    })
      .catch(error => {
        if (error.response.data.message == "Not logged in") {
          localStorage.clear(); // Clear local storage
          history.push('/auth/login');
        }
      })
  }
  useEffect(() => {

    QuizQuestions();

  }, []);


  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image
          src={UKCELLLogo}
          style={styles.logo}
        />
        <Text style={styles.header}> Course : {quizcourse}</Text>
        <Text style={styles.header}> Total Questions : {quizquestions}</Text>
        {questions ? (
        questions.map((question, index) => (
          <React.Fragment key={index}>
            <Text style={styles.Questions}>Question {index + 1}: {question.Question}</Text>
            {question.questions_type === 'Multichoice' && question.options ? (
              question.options.split('\n').map((option, optionIndex) => (
                <Text key={optionIndex} style={styles.Options}>
                   {optionIndex + 1}: {option}
                </Text>
              ))
            ) : null}
          </React.Fragment>
        ))
      ) : (
        <Text>No questions</Text>
      )}
        
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
const MyPDFViewer = () => {
  return (
    <PDFViewer style={{ width: '100%', height: '500px' }}>
      <MyPDFDocument />
    </PDFViewer>
  );
};

export default MyPDFViewer;