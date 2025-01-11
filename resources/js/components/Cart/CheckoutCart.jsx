import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';


export default function CheckoutCart(){
    const location = useLocation();
    const dataOrder = location.state?.dataOrder || [];
    const [userVerifyId, setUserVerifyId] = useState(null);
    const totalPrice = dataOrder.reduce((start, value) => {
        return (value.product.product_price * value.quantity)  + start
    }, 0);

    console.log(dataOrder);

    const VerifyAddress = (e) => {
        e.preventDefault();
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        const formData = new FormData(e.target);
        fetch('/cart/checkout', {
            method : "POST",
            body: formData,
            headers: {
                'X-CSRF-TOKEN' : csrfTokenMeta.content,
            }
        })
        .then(response => response.json())
        .then(data => {
            setUserVerifyId(data.message);
            return data.message;
        })
        .then(userVerifyId => {
            return fetch('/cart/order', {
                method : "POST",
                body: JSON.stringify({dataOrder, userVerifyId}),
                headers: {
                    'X-CSRF-TOKEN' : csrfTokenMeta.content,
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                }
            })
        })
        .then(response => response.json())
        .then(confirmdata => {
            window.location.href = confirmdata.url;
        })
        .catch(err => console.error(err));
    }


    return (
        <div className="container mt-5">
            <h1 className="fw-100">Checkout</h1>
        
           <div className='mt-5'>
                <form onSubmit={VerifyAddress}>
                    <div className="row">
                    <div className="col-6">
                        <h4>Customer information</h4>
                        <input name="email" id="email" type="text" className='mt-3 form-control' placeholder='Email'/>
                        <h4 className='mt-3'>Billing details</h4>
                        <div className='mt-3 d-flex'>
                            <input type="text" name="firstname" id="firstname" placeholder='First Name' className='mt-3 me-2 form-control' />
                            <input type="text" name="lastname" id="lastname" placeholder='Last Name' className='mt-3 form-control' />
                        </div>
                        <input name="phone" id="phone" type="text" placeholder='Phone' className='mt-3 form-control' />
                        <h4 className='mt-3'>Additional information</h4>
                        <textarea className='form-control' name="description" id="description" cols='85' placeholder='Nhập Địa Chỉ Của Bạn'></textarea>
                        <input type="hidden" value={totalPrice} name="totalprice" />
                        <select name="paymentMethod" id="" className="mt-3 form-control mb-3">
                            <option value="default">
                                Chọn Phương Thức Thanh Toán
                            </option>
                            <option value="paypal">STRIPE</option>
                            <option value="cod">COD</option>
                        </select>
                        <button type='submit' className='btn btn-dark w-100'>Place Order </button>
                    </div>
                    <div className="mt-3 col-6">
                        <h4>Your order</h4>
                        <div className='border rounded'>
                            <div className='m-4'>
                                <div className='d-flex justify-content-between'>
                                    <p>Product</p>
                                    <p>Subtotal</p>
                                </div>

                                {dataOrder.map((item)=> (
                                    <div className='d-flex justify-content-between'>
                                        <p>Tên Sản Phẩm: {item.product.product_name}</p>
                                        <p>{item.product.product_price * item.quantity}</p>
                                    </div>
                                ))}
                                
                            </div>

                            <div className='ms-4'>
                                <p><strong>Total: </strong>{totalPrice}</p>
                            </div>
                        </div>
                        
                    </div>
                    </div>
                </form> 
           </div>
        </div>
    );
}
