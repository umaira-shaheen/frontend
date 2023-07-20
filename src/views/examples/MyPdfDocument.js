import React from 'react';
import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';
const MyPDFDocument = () => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.header}>Hello, this is a PDF document generated in React!</Text>
          <Text>This is some content in the PDF.</Text>
        </Page>
      </Document>
    );
  };
  const styles = {
    page: {
      padding: 30,
    },
    header: {
      fontSize: 24,
      marginBottom: 20,
    },
  };
  const MyPDFViewer = () => {
    return (
      <PDFViewer style={{ width: '100%', height: '500px' }}>
        <MyPDFDocument />
      </PDFViewer>
    );
  };
  
  export default MyPDFViewer;