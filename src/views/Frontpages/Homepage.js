import Footer from "./Footer";
import Header from "./Header";
import About from "./About";
import Topbar from "./Topbar";
import Navbar from "./NavBar";
import Feature from "./Feature";
 import Courses from "./Courses";
 import Team from "./Team";
import Testimonial from "./Testimonial";
import Contact from "./Contact";
const Homepage=()=>{
    return(
        <>
        <Topbar/>
        <Navbar/>
        <Header/>
        <About/>
        <Feature/>
         <Courses/>
         <Team/>
         <Testimonial/> 
        <Contact/>
        <Footer/>    
        
   
        </>
    )
}
export default Homepage;