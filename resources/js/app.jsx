import './components/Navigation'
import  ReactDOM  from 'react-dom/client';
import React from 'react';
import HelloReact from './components/Navigation';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ContentArea from './components/ContentArea';
import Footer from './components/footer';
export function App(){
    return(
        <>
            <Navigation></Navigation>
            <ContentArea></ContentArea>
            <Footer></Footer>
        </>
    )
}

const container = document.querySelector('.root');
const root = ReactDOM.createRoot(container);
root.render(<App/>)
