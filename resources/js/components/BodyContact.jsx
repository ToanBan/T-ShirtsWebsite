import React from "react";
import "../../css/app.css"
import LocationIcon from "./LocationIcon";
import EmailIcon from "./EmailIcon";
import PhoneIcon from "./PhoneIcon";
export default function BodyContact(){
    const $urlMap = "http://127.0.0.1:8000/storage/image/map.jpg";

    return (
        <>
            <div className="container">
                <h4 className="text-center" style={{fontSize:"55px", fontWeight:"600", marginTop:"60px"}}>CONTACT</h4>
                <p style={{color:"#00000099"}} className="text-center">Nếu bạn có thắc mắc về sản phẩm hoặc cần hỗ trợ, hãy liên hệ với chúng tôi.
                <br /> Chúng tôi sẽ phản hồi bạn sớm nhất có thể!</p>

                <div style={{marginTop:"50px"}}>
                    <div className="d-flex">
                    <div className="col-6 d-flex align-items-center justify-content-center" style={{
                        backgroundColor: "#faedeb",
                        height: "432px",
                        width:"570px"
                        }}>
                        <div className="ms-5">
                            <h2 className="mb-3" style={{fontSize:"35px"}}>Get in touch</h2>
                            <strong>Thông Tin Liên Hệ</strong>
                            <div className="mt-3">
                            <div className="d-flex align-items-center ">
                                <LocationIcon/>
                                <p className="m-0 ms-3">123 Fifth Avenue, New York, NY 10160</p>
                            </div>

                            <div className="d-flex align-items-center ">
                                <PhoneIcon/>
                                <p className="m-0 ms-3">Contact@info.com</p>
                            </div>

                            <div className="d-flex align-items-center ">
                                <EmailIcon/>
                                <p className="m-0 ms-3">9-334-7565-9787</p>
                            </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-6" style={{height:"432px"}}>
                        <form style={{padding:"48px 48px", height:"432px", backgroundColor:"cornsilk"}} action="">
                            <div className="d-flex">
                                <input name="firstname" className="form-control me-3" type="text" placeholder="First Name" />
                                <input name="lastname" className="form-control" type="text" placeholder="Last Name" />
                            </div>

                            <input name="email" type="text" placeholder="Your email address"  className="form-control mt-3 mb-3"/>

                            <textarea name="message" id="" cols="50" rows="9" placeholder="Message..." className="form-control"></textarea>
                            <button className="btn btn-dark mt-2" type="submit">SEND</button>
                        </form>
                    </div>

                    </div>
                </div>
            </div>

            <img className="mt-5" src={$urlMap} alt="" style={{width:"100%"}} />
        </>
    )
}