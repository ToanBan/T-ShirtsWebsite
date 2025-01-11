import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function MainAdmin() {
    return (
        <div className="container-fluid min-vh-100 d-flex">
            <div className="row flex-fill w-100 m-0">
                <div className="col-3 p-4" style={{borderRight:"1px solid #00000099"}}>
                    <div className="d-flex align-items-center mb-4">
                        <NavLink to="/admin">
                            <img 
                                src="https://demos.themeselection.com/chameleon-free-bootstrap-admin-template/theme-assets/images/logo/logo.png" 
                                alt="Logo" 
                                style={{width:"40px"}} 
                            />
                        </NavLink>
                        <p className="m-0 ms-3">T-Shirt Store</p>
                    </div>

                    <nav className="nav flex-column">
                        <NavLink 
                            to="" 
                            end
                            className={({ isActive }) => 
                                "nav-link mt-5 " + (isActive ? "text-primary" : "text-dark")
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink 
                            to="danhmuc" 
                            className={({ isActive }) => 
                                "nav-link mt-5 " + (isActive ? "text-primary" : "text-dark")
                            }
                        >
                            Quản Lý Danh Mục Sản Phẩm
                        </NavLink>
                        <NavLink 
                            to="sanpham" 
                            className={({ isActive }) => 
                                "nav-link mt-5 " + (isActive ? "text-primary" : "text-dark")
                            }
                        >
                            Quản Lý Sản Phẩm
                        </NavLink>
                        <NavLink 
                            to="taikhoan" 
                            className={({ isActive }) => 
                                "nav-link mt-5 " + (isActive ? "text-primary" : "text-dark")
                            }
                        >
                            Quản Lý Tài Khoản
                        </NavLink>

                        <NavLink 
                            to="orders" 
                            className={({ isActive }) => 
                                "nav-link mt-5 " + (isActive ? "text-primary" : "text-dark")
                            }
                        >
                            Quản Lý Đơn Hàng
                        </NavLink>

                        <a 
                            href="/" 
                            className="btn btn-danger mt-5"   
                        >
                            Close
                        </a>
                    </nav>
                </div>
                
                <div className="col-9 p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
