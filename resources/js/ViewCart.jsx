import ReactDOM from 'react-dom/client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navigation from './components/Navigation';
import Footer from './components/footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BodyViewCart from './components/Cart/BodyViewCart';
import CheckoutCart from './components/Cart/CheckoutCart';
import BodySuccess from './components/Cart/BodySuccess';

export function ViewCart() {
    return (
        <>
            <Navigation />
            <Router>
                <Routes>
                    <Route path='/cart/view' element={<BodyViewCart />} />
                    <Route path='/cart/checkout' element={<CheckoutCart />} />
                    <Route path='/success' element={<BodySuccess/>}></Route>
                    
                </Routes>
            </Router>
            <Footer />
        </>
    );
}

const containerCart = document.querySelector('.view-cart');
const root = ReactDOM.createRoot(containerCart);
root.render(<ViewCart />);