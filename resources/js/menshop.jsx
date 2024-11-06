import  ReactDOM  from 'react-dom/client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navigation from './components/Navigation';
import MenShirt from './components/MenShirt';
import Footer from './components/footer';

export function MenShop(){
    return(
        <>
            <Navigation/>
            <MenShirt/>
            <Footer/>
        </>
    )
}

const containerMenShop = document.querySelector('.men-shirt');
const root = ReactDOM.createRoot(containerMenShop);
root.render(<MenShop/>)