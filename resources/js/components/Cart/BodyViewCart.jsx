import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import BtnGroup from "../BtnGroup";
import { Outlet, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
export default function BodyViewCart() {
    const imgPath = "http://127.0.0.1:8000/storage/temp_images";
    const [cartItems, setCartItems] = useState([]);
    const [dataOrder, setDataOrder] = useState([]);
    const navigate = useNavigate();
    const ChooseDataOrder = (item) => {
        setDataOrder((prev) => {
            return [...prev, item];
        })
    }

    const fetchCaritem = () => {
        fetch('/cart')
            .then(response => response.json())
            .then(data => setCartItems(data))
            .catch(error => console.error('Error fetching cart items:', error));
    }

    useEffect(() => {
        fetchCaritem();
    }, []);

    const handleIncrement = (productId) => {
        setCartItems(prevProducts => 
            prevProducts.map(item => 
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }

    const handleDecrement = (productId) => {
        setCartItems(prevProducts => 
            prevProducts.map(item => 
                item.id === productId && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    }

    const handleDeletee = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
            const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
            if (!csrfTokenMeta) {
                console.error("CSRF token not found!");
                return;
            }

            fetch(`/cart/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfTokenMeta.content
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert("Sản phẩm đã được xoá thành công.");
                fetchCaritem();
            })
            .catch(err => console.error("Xoá sản phẩm thất bại:", err));
        }
    }

    const VerifyAddress = () => {
        navigate('/cart/checkout', {state:{dataOrder}})
    }

    const handleCheckboxChange = (productId) => {
        setCartItems(prevProducts => 
            prevProducts.map(item => 
                item.id === productId ? { ...item, selected: !item.selected } : item
            )
        );
    }

    console.log(dataOrder);

    const totalPrice = cartItems.reduce((total, item) => {
        return item.selected ? total + (item.product.product_price * item.quantity) : total;
    }, 0);
    
    return (
        <div className="container mt-5">
            <h1 className="fw-100">Cart</h1>
          

            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <div>
                                    <img className="me-3" src={`${imgPath}/${item.product.product_image.replace('temp_image/', '')}`} alt={item.product.product_name} style={{ width: '70px', height: 'auto' }} />
                                    {item.product.product_name}
                                </div>
                            </td>
                            <td className="align-middle">{item.product.product_price}</td>
                            <td>
                                <BtnGroup 
                                    count={item.quantity} 
                                    Increment={() => handleIncrement(item.id)} 
                                    Descrement={() => handleDecrement(item.id)}
                                />
                            </td>
                            <td className="align-middle">{item.product.product_price * item.quantity}</td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={item.selected || false}
                                    onChange={() => handleCheckboxChange(item.id)} 
                                    onClick={()=>ChooseDataOrder(item)}
                                />
                            </td>
                            <td>
                                <button className="btn-close" width="20px" height="20px" onClick={() => handleDeletee(item.id)}></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="row mt-5">
                <div className="col d-flex justify-content-end align-items-center">
                    <strong className="fs-200fw-semibold me-3">Tổng Giá Tiền Sản Phẩm: {totalPrice} VND</strong>
                    <button className="btn btn-primary" onClick={VerifyAddress}>Mua Hàng</button> 
                </div>
            </div>
        </div>
    );
}
