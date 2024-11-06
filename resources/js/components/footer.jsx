
import React from "react";
import FacebookIcon from "./Facebookicon";
import InstagramIcon from "./Instagramicon";
import TwitterIcon from "./Twittericon";
import "../../css/app.css";

export default function Footer() {
    return (
        <div className="container-fluid mt-5">
            <div
                className="footer-first d-flex align-items-center justify-content-center"
                style={{ height: "381px", backgroundColor: "#faedeb" }}
            >
                <div>
                    <div>
                        <h4
                            className="text-center"
                            style={{ fontSize: "18px", fontWeight: "700" }}
                        >
                            Subscribe To Get Offers In Your Inbox
                        </h4>
                        <p
                            style={{
                                color: "#212529",
                                marginBottom: "16px",
                                fontSize: "14px",
                            }}
                        >
                            Lorem ipsum dolor sit amet, adipiscing elit sed do
                            eiusmod condimentum
                        </p>
                    </div>

                    <div className="d-flex align-items-center justify-content-center">
                        <a href="#" className="text-decoration-none hover-effect">
                            Buy T-Shirts
                        </a>
                        <a href="#" className="text-decoration-none hover-effect">
                            Women
                        </a>
                        <a href="#" className="text-decoration-none hover-effect">
                            Men
                        </a>
                        <a href="#" className="text-decoration-none hover-effect">
                            About
                        </a>
                        <a href="#" className="text-decoration-none hover-effect">
                            Contact
                        </a>
                    </div>

                    <div className="d-flex mt-3 justify-content-center">
                        <FacebookIcon />
                        <TwitterIcon />
                        <InstagramIcon />
                    </div>
                </div>
            </div>

            <div
                className="footer-last bg-dark d-flex align-items-center justify-content-center"
                style={{ height: "121px" }}
            >
                <p className="text-white">
                    Copyright © 2024 T-Shirts Store | Powered by T-Shirts Store
                </p>
            </div>
        </div>
    );
}
