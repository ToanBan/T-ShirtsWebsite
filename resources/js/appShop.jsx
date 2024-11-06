import  ReactDOM  from 'react-dom/client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navigation from './components/Navigation';
import BuyProduct from './components/BuyProduct';
import Footer from './components/footer';

export function AppShop(){
    return(
        <>
            <Navigation/>
            <BuyProduct/>
            <Footer/>
        </>
    )
}

const containerAppShop = document.querySelector('.appshop');
const root = ReactDOM.createRoot(containerAppShop);
root.render(<AppShop/>)