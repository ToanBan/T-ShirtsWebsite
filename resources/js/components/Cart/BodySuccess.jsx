import React from "react";
import { Link } from 'react-router-dom';
export default function BodySuccess(){
    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-5">
                        <img src="https://img.freepik.com/premium-vector/successful-purchase-by-card-concept-vector-illustration_929545-175.jpg?w=740" 
                        alt="" />
                    </div>

                    <div className="col-7 text-center">
                        <div className="mt-5">
                            <h3 className="fw-semibold text-danger">Your order is completed</h3>
                            <p style={{color:"#77838F"}}>Thank you for your order! <br />
                            Your order is being processed and will be completed within 3-6 hours. <br />
                            You will receive an email confirmation when your order is completed.</p>
                            
                                <a href="/" className="btn btn-primary rounded mt-3">Continue Shopping</a>
                                
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}