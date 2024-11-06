import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import BtnGroup from "../BtnGroup";
import { Outlet, Link } from 'react-router-dom';

export default function BodyViewCart() {
    const imgPath = "http://127.0.0.1:8000/storage/temp_images";
    const [cartItems, setCartItems] = useState([]);

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

    const handleCheckboxChange = (productId) => {
        setCartItems(prevProducts => 
            prevProducts.map(item => 
                item.id === productId ? { ...item, selected: !item.selected } : item
            )
        );
    }

    const handleOrder = (e) => {
        e.preventDefault();
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        
        const selectedItems = cartItems.filter(item => item.selected).map(item => ({
            id: item.id,
            quantity: item.quantity,
            
        }));

        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để đặt hàng.");
            return;
        }

        fetch('/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfTokenMeta.content,
                'Accept': 'application/json' // Thêm dòng này để yêu cầu JSON response
            },
            body: JSON.stringify({ items: selectedItems })
        })
        .then(response => {
            if (!response.ok) {
                // Kiểm tra nếu phản hồi không phải là JSON
                return response.text().then(text => { 
                    throw new Error(`Lỗi khi đặt hàng: ${text}`); 
                });
            }
            return response.json();
        })
        .then(data => {
            window.location.href = data.url;
        })
        .catch(err => console.error('Lỗi đặt hàng:', err.message));
        
    }

    const totalPrice = cartItems.reduce((total, item) => {
        return item.selected ? total + (item.product.product_price * item.quantity) : total;
    }, 0);
    
    return (
        <div className="container mt-5">
            <h1 className="fw-100">Cart</h1>
            {/* <div className="process d-flex justify-content-center">
                <Link to='/cart/view' className="d-flex me-4 align-items-center justify-content-center text-decoration-none"> 
                    <div className="circle text-white">1</div>
                    <div className="text-dark">SHOPPING CART</div>
                </Link>
                <FontAwesomeIcon icon={faChevronRight} className="align-self-center" />
                <Link to='/checkoutcart' className="d-flex ms-4 me-4 align-items-center justify-content-center text-decoration-none"> 
                    <div className="circle text-white">2</div>
                    <div className="text-dark">CHECKOUT</div>
                </Link>
                <FontAwesomeIcon icon={faChevronRight} className="align-self-center" />
                <Link to='/ordercompleted' className="d-flex ms-4 me-4 align-items-center justify-content-center text-decoration-none"> 
                    <div className="circle text-white">3</div>
                    <div className="text-dark">ORDER COMPLETE</div>
                </Link>
            </div> */}

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
                    <button className="btn btn-primary" onClick={handleOrder}>Mua Hàng</button> {/* Gọi hàm handleOrder */}
                </div>
            </div>
        </div>
    );
}
