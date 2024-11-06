import  ReactDOM  from 'react-dom/client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navigation from './components/Navigation';
import DetailProduct from './components/DetailProduct';
import Footer from './components/footer';
export default function ProductDetail(){
    return (
        <>
            <Navigation/>
            <DetailProduct/>
            <Footer/>
        </>
    )
}

const containerProductDetail = document.querySelector('.product-detail');
const root = ReactDOM.createRoot(containerProductDetail);
root.render(<ProductDetail/>)