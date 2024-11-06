import React from "react";

export default function BgImageMovation() {
  return (
    <>
      <div className="container-fluid">
        <div className="image-container">
          <img
            className="rounded image-section"
            src="https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/bg-01.jpg"
            alt=""
            style={{ width: "100%", marginTop: "80px" }}
          />
          <div className="content">
            <p className="text-dark" style={{fontSize:"15px", fontWeight:"600"}}>New Collection</p>
            <h3 className="mb-3 text-dark" style={{fontSize:"36px", fontWeight:"600"}}>Be different in your own way!</h3>
            <p className="mt-3 text-dark" style={{fontWeight:"600"}} >Find your unique style.</p>
            <a className="btn btn-dark btn-lg" href="">
              Shop Collection
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
