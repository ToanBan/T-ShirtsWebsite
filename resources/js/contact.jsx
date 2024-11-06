import  ReactDOM  from 'react-dom/client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navigation from './components/Navigation';
import Footer from './components/footer';
import BodyContact from './components/BodyContact';
export function Contact(){
    return(
        <>
            <Navigation/>
            <BodyContact/>
            <Footer/>
        </>
    )
}

const containerContact = document.querySelector('.contact');
const root = ReactDOM.createRoot(containerContact);
root.render(<Contact/>)