const Topbar=()=>{
return(
    
<div className="container-fluid bg-dark">
        <div className="row py-2 px-lg-5">
            <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
                <div className="d-inline-flex align-items-center text-white">
                    <small><i className="fa fa-phone-alt mr-2"></i>0318-5656084</small>
                    <small className="px-3">|</small>
                    <small><i className="fa fa-envelope mr-2"></i>umairashaheen32@gmail.com</small>
                </div>
            </div>
            <div className="col-lg-6 text-center text-lg-right">
                <div className="d-inline-flex align-items-center">
                    <a className="text-white px-2" href="https://www.facebook.com/profile.php?id=100083973306949&mibextid=ZbWKwL">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a className="text-white px-2" href="https://twitter.com/ShaheenUmaira?t=J_mLCggKoSQHiIU1nG9RUQ&s=09">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a className="text-white px-2" href="https://www.linkedin.com/in/umaira-shaheen-a795ab258/">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a className="text-white px-2" href="https://instagram.com/umairashaheen_1234?igshid=ZGUzMzM3NWJiOQ==">
                        <i className="fab fa-instagram"></i>
                    </a>
                    {/* <a className="text-white pl-2" href="">
                        <i className="fab fa-youtube"></i>
                    </a> */}
                </div>
            </div>
        </div>
    </div>
   
    )
    
}
export default Topbar;