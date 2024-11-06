import React from "react";

function BackgroundImageTitle(){
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6 d-flex justify-content-between align-items-center">
                        <div>
                        <strong style={{fontSize:"17px", fontWeight:"600"}} className="text-center">Best Quality Products</strong>
                        <h1 style={{fontSize:"60px", color:"#415161"}}>We Print What <br /> You Want!</h1>
                        <p style={{color:"#415161", marginBottom:"24px"}}>Please click on the button below to navigate to our 
                        online shopping store where <br /> you can browse
                        and purchase a wide variety of products tailored to your preferences.</p>
                        <a href="t-shirt-store" className="btn btn-danger btn-lg"><p className="m-0" style={{fontSize:"15px"}}>GET STARTED</p></a>
                        </div>
                    </div>
                    <div className="col-6">
                    <div id="carousel" className="carousel" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active"></button>
                        <button type="button" data-bs-target="#carousel" data-bs-slide-to="1"></button>
                    </div>

                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="5000">
                            <img src="https://websitedemos.net/custom-printing-02/wp-content/uploads/sites/459/2019/06/image26-free.png" alt=""/>
                        </div>

                        <div className="carousel-item " data-bs-interval="5000">
                            <img src="https://websitedemos.net/custom-printing-04/wp-content/uploads/sites/222/2020/02/boy-t2.png" alt=""/>
                        </div>
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>

                    <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BackgroundImageTitle