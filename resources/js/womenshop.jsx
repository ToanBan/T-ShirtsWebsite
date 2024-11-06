import  ReactDOM  from 'react-dom/client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navigation from './components/Navigation';
import WomenShirt from './components/WomenShirt';
import Footer from './components/footer';

export function WomenShop(){
    return(
        <>
            <Navigation/>
            <WomenShirt/>
            <Footer/>
        </>
    )
}

const containerWomenShop = document.querySelector('.women-shirt');
const root = ReactDOM.createRoot(containerWomenShop);
root.render(<WomenShop/>)