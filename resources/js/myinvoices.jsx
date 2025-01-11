import  ReactDOM  from 'react-dom/client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navigation from './components/Navigation';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AllInvoices from './components/AllInvoices';
import FollowCart from './components/Cart/FollowCart';
import '../css/app.css'
export default function ProductDetail(){
    return (
        <>
            <Router>
                <Navigation/>
                <Routes>
                    <Route path='myinvoices' element={<AllInvoices/>}></Route>
                    <Route path='myinvoices/:id' element={<FollowCart/>}></Route>
                </Routes>
                
            </Router>
        </>
    )
}

const containerProductDetail = document.querySelector('.myinvoices');
const root = ReactDOM.createRoot(containerProductDetail);
root.render(<ProductDetail/>)