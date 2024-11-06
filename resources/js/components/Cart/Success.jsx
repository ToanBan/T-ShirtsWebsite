import  ReactDOM  from 'react-dom/client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navigation from '../Navigation';
import Footer from '../footer';
import BodySuccess from './BodySuccess';
export function Success(){
    return (
        <>
            <Navigation/>
            <BodySuccess/>
            <Footer/>
        </>
    )
}

const containerSuccess = document.querySelector('.success');
const root = ReactDOM.createRoot(containerSuccess);
root.render(<Success/>)