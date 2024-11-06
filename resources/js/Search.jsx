import  ReactDOM  from 'react-dom/client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navigation from './components/Navigation';
import Footer from './components/footer';
import SearchBody from './components/SearchBody';
export function Search(){
    return(
        <>
            <Navigation/>
            <SearchBody/>
            <Footer/>
        </>
    )
}

const containerWomenShop = document.querySelector('.search');
const root = ReactDOM.createRoot(containerWomenShop);
root.render(<Search/>)