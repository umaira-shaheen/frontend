import Navbar from "./NavBar";
import Footer from "./Footer";
import Header from "./Header";
import testimonial1 from "assets/img/landing_images/testimonial-1.jpg";
import testimonial2 from "assets/img/landing_images/testimonial-2.jpg";
import rida_img from "assets/img/theme/Ridoo.jpeg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const Testimonial = () => {
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
    return (
        <>
            {/* <!-- Testimonial Start --> */}
            <div className="my-front-css-custom">
                <div className="container-fluid bg-image py-5" style={{ margin: "90px 0" }}>
                    <div className="container py-5">
                        <div className="row align-items-center">
                            <div className="col-lg-5 mb-5 mb-lg-0">
                                <div className="section-title position-relative mb-4">
                                    <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">Testimonial</h6>
                                    <h1 className="display-4">What Say Our Students</h1>
                                </div>
                                <p className="m-0">UkCELL aims to provide students with best teaching enviroment.
                                    that donot only make them able to learn and achieve more, but also improving mental Health.
                                    we are offereing flexible learning schedule and fair wage.Student feels homely being at here.</p>
                            </div>
                            <div className="col-lg-7">
                                {/* <div className="owl-carousel testimonial-carousel"> */}
                                <Carousel
                                    responsive={responsive}
                                    swipeable={true}
                                    draggable={false}
                                    showDots={true}>

                                    <div className="bg-white p-5" style={{ padding: "15px", width: "320%" }}>
                                        <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
                                        <p>This institute is supportive in having the resources,
                                            network and different areas of specialities available
                                            to aid individual learning and achievements. I feel
                                            very supported when faced with academical challenges.
                                            There are social activities, best qualified and experienced teachers and facilities to support
                                            physical, social and mental wellbeing as the institute
                                            ensures the academic journey is successfully achieved.</p>
                                        <div className="d-flex flex-shrink-0 align-items-center mt-4">
                                            <img className="img-fluid2 mr-4" src={rida_img} alt="" style={{width: "20%"}}/>
                                            <div>
                                                <h5>Rida Fatima</h5>
                                                <span>Web Designer</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* <div className="bg-white p-5">
                            <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
                            <p>Sed et elitr ipsum labore dolor diam, ipsum duo vero sed sit est est ipsum eos clita est ipsum. Est nonumy tempor at kasd. Sed at dolor duo ut dolor, et justo erat dolor magna sed stet amet elitr duo lorem</p>
                            <div className="d-flex flex-shrink-0 align-items-center mt-4">
                                <img className="img-fluid mr-4" src={testimonial1} alt=""/>
                                <div>
                                    <h5>Student Name</h5>
                                    <span>Web Design</span>
                                </div>
                            </div>
                        </div> */}
                                </Carousel>;
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Testimonial Start --> */}
        </>
    )
};
export default Testimonial;