import React from "react";
import "../../css/app.css"

export default function BodyAbout(){
    const imageUrl = "http://127.0.0.1:8000/storage/image/hinhanh.jpg";
    const imageUrl1 = "http://127.0.0.1:8000/storage/image/hinhanh2.jpg";
    return (
        <>
            <div className="d-flex align-items-center justify-content-center">
                <div className="container">
                    <h4 className="text-center" style={{fontSize:"55px", fontWeight:"600", marginTop:"60px"}}>ABOUT</h4>
                    <p style={{fontWeight:"600"}} className="text-center">Welcome to T-Shirts Store</p>
                    <div>
                    <p style={{fontSize:"15px", color:"#00000099"}} className="text-center">At T-Shirts Shop, we are passionate about bringing you the best quality t-shirts that blend comfort, style, and creativity. <br />
                    Whether you're looking for something casual, fun, or unique, we have something for everyone. <br />
                    Our mission is to inspire self-expression through fashion by offering a wide range of designs that suit all tastes and preferences.!</p>
                    </div>
                </div>
            </div>

            <div className="mt-5 image-container">
                <div className="image-wrapper">
                    <img className="image-about rounded" style={{width:"100%"}} src={imageUrl} alt="" />
                    <div className="overlay"></div> 
                        <div className="total-content ms-auto">
                            <div className="content-overall d-flex">
                                <div className="content-left col-4 text-white ms-5">
                                    <p style={{fontSize:"15px", fontWeight:"600"}}>The Mission</p>
                                    <h3 style={{fontSize:"36px", fontWeight:"600"}}>At the heart of <br />
                                    everything, we set out to <br /> offer the best quality.</h3>
                                </div>

                                <div className="content-right col-8 text-white">
                                    <p style={{fontSize:"24px", fontWeight:"600"}}>Quality is at the heart of everything we do. <br />
                                    From selecting premium materials to meticulous production processes,
                                    <br />we ensure that each product not only meets but exceeds customer expectations.</p>
                                    <p style={{fontSize:"24px", fontWeight:"600"}}>Every piece of clothing is crafted with care from design to finish, <br />
                                    providing comfort, durability, and style for you. <br />
                                    Customer satisfaction is our driving force to continuously improve and strive for excellence.</p>
                                </div>
                            </div>
                        </div>
                 </div>
            </div>

            <div className="container">
                <h4 className="text-center" style={{fontSize:"40px", fontWeight:"600", marginTop:"60px"}}>How it Started</h4>
                <p className="text-center" style={{fontSize:"15px", fontWeight:"400", marginTop:"30px", color:"#00000099"}}>We started with the desire to bring simple, comfortable, yet stylish T-shirts that suit every personality.</p>
                <div>
                    <div className="d-flex">
                        <div className="col-6 d-flex align-items-center justify-content-center" style={{
                        backgroundColor: "#faedeb",
                        height: "432px",
                        width:"570px"
                        }}>
                        <div className="ms-5">
                        <h2 style={{fontSize:"29px"}}>The Story Behind Our Brand</h2>
                        <strong>Our Journey Begins with Passion</strong>
                        <p className="description" style={{color:"#00000099"}}>
                            Our journey began with a deep passion for fashion and comfort.
                             We realized that a T-shirt is not just an everyday garment; 
                             it’s a canvas for self-expression. With this insight, we set out to create T-shirts that combine style with high quality, catering to diverse tastes and occasions. From our humble beginnings, we have remained dedicated to providing comfort, durability, and fashion to our customers.
                        </p>
                        </div>

                        </div>

                        <div className="col-6" style={{
                        height: "432px", 
                        width: "570px" 
                        }}>
                        <img src={imageUrl1} alt="" style={{
                        width: "100%", 
                        height: "100%",  
                        objectFit: "cover" 
                        }} />
                    </div>
                </div>
            </div>

            </div>

        </>
    )
}