import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
export default function(){

    const [invoices, setInvoices] = useState([]);

    const fetchInvoicesForUser = () => {
        fetch('/invoiceforuser')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setInvoices(data);
            })
    }

    useEffect(()=>{
        fetchInvoicesForUser();
    }, []);

    return(
        <>
            <div className="container">
                <p className="mt-5 fst-italic" style={{fontSize:"40px"}}>Đơn Hàng Của Bạn</p>

                <div className="border shadow mt-5" style={{borderRadius:"30px"}}>
                        <div className="p-5">
                            {invoices.map((item) => (
                                <div className="border mb-4" style={{borderRadius:"30px"}}>
                                    <Link to={`/myinvoices/${item.id}`} className="text-decoration-none text-dark">
                                        <div className="m-4">
                                            <div>
                                                <p>Đơn Hàng Tổng Trị Giá: {item.total_price}</p>
                                            </div>

                                            <div>
                                                <p>{item.order.map((item) => item.product.product_name).join(', ')}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>  
                            ))}
                        </div>
                </div>
            </div>
        </>
    )
}