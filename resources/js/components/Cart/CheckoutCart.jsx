import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
export default function CheckoutCart(){

    const [cart, setCart] = useState([]);
    const imgPath = "http://127.0.0.1:8000/storage/temp_images";

    const fetchCart = () => {
        fetch('/cart/order')
            .then(response => {
                if(!response.ok){
                    throw new Error("Lỗi");
                }
                return response.json();
            })
            .then(data => setCart(data))
            .catch(err => console.log('Lỗi fetch cart'));
    }

    useEffect(()=>{
        fetchCart();
    }, []);

    const totalPrice = cart.reduce((total, item) => {
        return total + item.price;
    }, 0);

    const handleDeletee = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
            const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
            if (!csrfTokenMeta) {
                console.error("CSRF token not found!");
                return;
            }

            fetch(`/cart/order/${id}`, {
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
                fetchCart();
            })
            .catch(err => console.error("Xoá sản phẩm thất bại:", err));
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="fw-100">Checkout</h1>
            <div className="process d-flex justify-content-center">
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
            </div>

           <div className='mt-5'>
                <form action="">
                    <div className="row">
                    <div className="col-6">
                        <h4>Customer information</h4>
                        <input type="text" className='mt-3 form-control' placeholder='Email'/>
                        <h4 className='mt-3'>Billing details</h4>
                        <div className='mt-3 d-flex'>
                            <input type="text" placeholder='First Name' className='mt-3 me-2 form-control' />
                            <input type="text" placeholder='Last Name' className='mt-3 form-control' />
                        </div>
                        <input type="text" placeholder='Phone' className='mt-3 form-control' />
                        <h4 className='mt-3'>Additional information</h4>
                        <textarea name="descripton" id="" cols='85' placeholder='Text note'></textarea>
                        <select name="paymentMethod" id="" className="mt-3 form-control mb-3">
                            <option value="default">
                                Chọn Phương Thức Thanh Toán
                            </option>
                            <option value="paypal">PAYPAL</option>
                            <option value="cod">COD</option>
                        </select>
                        <button type='submit' className='btn btn-dark w-100'>Place Order {totalPrice}</button>
                    </div>
                    <div className="mt-3 col-6">
                        <h4>Your order</h4>
                        <div className='border rounded'>
                            <div className='m-4'>
                                <div className='d-flex justify-content-between'>
                                    <p>Product</p>
                                    <p>Subtotal</p>
                                </div>
                                {cart.map((item) => (
                                    <div className='border-top border-bottom d-flex mt-3 justify-content-between align-items-center' key={item.id}>
                                        <div className='d-flex align-items-center'>
                                            <img className="me-3" src={`${imgPath}/${item.product.product_image.replace('temp_image/', '')}`} alt={item.product.product_name} style={{ width: '70px', height: 'auto' }} />
                                            <p className='me-3'> {item.product.product_name}</p>
                                        </div>
                                        <p>{item.price}</p>
                                        <button className="btn-close" width="20px" height="20px" onClick={() => handleDeletee(item.id)}></button>
                                    </div>
                                ))}
                                <div className='d-flex justify-content-between align-items-center mt-3'>
                                    <h5>Total: </h5>
                                    <p className='m-0'>{totalPrice}</p>
                                </div>
                            </div>

                        </div>

                    </div>
                    </div>
                </form> 
           </div>
        </div>
    );
}
