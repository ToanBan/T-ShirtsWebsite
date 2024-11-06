import  ReactDOM  from 'react-dom/client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navigation from './components/Navigation';

import Footer from './components/footer';
import BodyAbout from './components/BodyAbout';

export function About(){
    return(
        <>
            <Navigation/>
            <BodyAbout/>
            <Footer/>
        </>
    )
}

const containerAbout = document.querySelector('.about');
const root = ReactDOM.createRoot(containerAbout);
root.render(<About/>)