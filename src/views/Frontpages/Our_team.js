import Navbar from "./NavBar";
import Footer from "./Footer";
import Header from "./Header";
import team1 from "assets/img/landing_images/team-1.jpeg";
import team2 from "assets/img/landing_images/team-2.jpeg";
import team3 from "assets/img/landing_images/team-3.jpg";
import team4 from "assets/img/landing_images/team-4.jpg";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Topbar from "./Topbar";
const Team=()=>{
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
      
    return(
        <>
        <Topbar/>
        <Navbar/>

        <div className="my-front-css-custom">
       <div className="container-fluid py-5">
        <div className="container py-5" >
            <div className="section-title text-center position-relative mb-5">
                <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">Instructors</h6>
                <h1 className="display-4">Meet Our Instructors</h1>
            </div>
         
     <Carousel 
     responsive={responsive}
     swipeable={false}
    draggable={false}
    showDots={true}>
        
          <div className="team-item" style={{padding: "15px"}}>
                    <img className="img-fluid w-100" src={team1} alt=""/>
                    <div className="bg-light text-center p-4">
                        <h5 className="mb-3">Iram Fatima</h5>
                        <p className="mb-2">M.Phil English</p>
                        <div className="d-flex justify-content-center">
                            <a className="mx-1 p-1" href="#"><i className="fab fa-twitter"></i></a>
                            <a className="mx-1 p-1" href="#"><i className="fab fa-facebook-f"></i></a>
                            <a className="mx-1 p-1" href="#"><i className="fab fa-linkedin-in"></i></a>
                            <a className="mx-1 p-1" href="#"><i className="fab fa-instagram"></i></a>
                            <a className="mx-1 p-1" href="#"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <div className="team-item" style={{padding: "15px"}}>
                    <img className="img-fluid w-100" src={team2} alt=""/>
                    <div className="bg-light text-center p-4">
                        <h5 className="mb-3">Umaira Shaheen</h5>
                        <p className="mb-2">Software Engineer</p>
                        <div className="d-flex justify-content-center">
                            <a className="mx-1 p-1" href="#"><i className="fab fa-twitter"></i></a>
                            <a className="mx-1 p-1" href="#"><i className="fab fa-facebook-f"></i></a>
                            <a className="mx-1 p-1" href="#"><i className="fab fa-linkedin-in"></i></a>
                            <a className="mx-1 p-1" href="#"><i className="fab fa-instagram"></i></a>
                            <a className="mx-1 p-1" href="#"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <div className="team-item" style={{padding: "15px"}}>
                    <img className="img-fluid w-100" src={team3} alt=""/>
                    <div className="bg-light text-center p-4">
                        <h5 className="mb-3">Sharjeel Younus</h5>
                        <p className="mb-2">MSC English</p>
                        <div className="d-flex justify-content-center">
                            <a className="mx-1 p-1" href="#"><i className="fab fa-twitter"></i></a>
                            <a className="mx-1 p-1" href="#"><i className="fab fa-facebook-f"></i></a>
                            <a className="mx-1 p-1" href="#"><i className="fab fa-linkedin-in"></i></a>
                            <a className="mx-1 p-1" href="#"><i className="fab fa-instagram"></i></a>
                            <a className="mx-1 p-1" href="#"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <div className="team-item" style={{padding: "15px"}}>
                    <img className="img-fluid w-100" src={team4} alt=""/>
                    <div className="bg-light text-center p-4">
                        <h5 className="mb-3">Saad Aslam</h5>
                        <p className="mb-2">Graphic Designer</p>
                        <div className="d-flex justify-content-center">
                            <a className="mx-1 p-1" href="#"><i className="fab fa-twitter"></i></a>
                            <a className="mx-1 p-1" href="#"><i className="fab fa-facebook-f"></i></a>
                            <a className="mx-1 p-1" href="#"><i className="fab fa-linkedin-in"></i></a>
                            <a className="mx-1 p-1" href="#"><i className="fab fa-instagram"></i></a>
                            <a className="mx-1 p-1" href="#"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                
      </Carousel>;
      </div>
         </div>
         </div>
         <Footer/>
    
        </>
    )
};
export default Team;