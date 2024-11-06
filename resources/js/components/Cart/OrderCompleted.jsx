import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function OrderCompleted(){
    return (
        <div className="container mt-5">
            <h1 className="fw-100">Cart</h1>
            <div className="process d-flex justify-content-center">
                <Link to='/cart/view' className="d-flex me-4 align-items-center justify-content-center text-decoration-none"> 
                    <div className="circle text-white">1</div>
                    <div className="text-dark">SHOPPING CART</div>
                </Link>
                <FontAwesomeIcon icon={faChevronRight} className="align-self-center" />
                <Link to='/checkoutcart' className="d-flex ms-4 me-4 align-items-center justify-content-center text-decoration-none"> 
                    <div className="circle text-white">2</div>
                    <div className="text-dark">CHECKOUT</div>
                </Link>
                <FontAwesomeIcon icon={faChevronRight} className="align-self-center" />
                <Link to='/ordercompleted' className="d-flex ms-4 me-4 align-items-center justify-content-center text-decoration-none"> 
                    <div className="circle text-white">3</div>
                    <div className="text-dark">ORDER COMPLETE</div>
                </Link>
            </div>
        </div>
    );
}