import  ReactDOM  from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MainAdmin from './components/MainAdmin';
import Dashboard from './admin/dashboard';
import Danhmuc from './admin/Danhmuc';
import Sanpham from './admin/Sanpham';
import Taikhoan from './admin/Taikhoan';
import Orders from './admin/Orders';
export function Admin(){
    return (
        <BrowserRouter>
          <Routes>
            <Route path="admin" element={<MainAdmin/>}>
              <Route index element ={<Dashboard/>} />
              <Route path="danhmuc" element = {<Danhmuc/>}/>
              <Route path="sanpham" element={<Sanpham/>}/>
              <Route path="taikhoan" element={<Taikhoan/>}/>
              <Route path='orders' element={<Orders/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      );
}

const containerAdmin = document.querySelector('.admin');
const root = ReactDOM.createRoot(containerAdmin);
root.render(<Admin/>)
