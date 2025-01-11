import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FollowCart(){
    const [itemActive, setItemActive] = useState(null);
    const {id} = useParams();
    const [statusOrder, setStatusOrder] = useState(null);

    const fetchOrderDetail = () => {
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        fetch(`/detailorder/${id}`, {
            method:'POST',
            headers: {
                'X-CSRF-TOKEN' : csrfTokenMeta.content,
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setStatusOrder(data.status);
        })
    }


    useEffect(()=>{
        fetchOrderDetail();
    }, []);

    return(
        <>
            <div className="container">
                <p className="mt-5 fst-italic" style={{fontSize:"40px"}}>Theo Dõi Đơn Hàng</p>
                <div className="border shadow mt-5" style={{borderRadius:"30px"}}>
                    <div className="p-5">
                        <div className={`d-flex align-items-center mb-4 border ${statusOrder === 'pending' ? 'active' : ''}`} style={{borderRadius:"30px"}}>
                            <img style={{width:"100px", margin:"8px", mixBlendMode:"multiply"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN5A6RU9eGjayEqNyISvSYgytJlSHanF_bZw&s" alt="" />
                            <p>Bạn Đã Đặt Hàng Thành Công</p>
                        </div>

                        <div className={`d-flex align-items-center mb-4 border ${statusOrder === 'accept' ? 'active' : ''}`} style={{borderRadius:"30px"}}>
                            <img style={{width:"100px", margin:"8px", mixBlendMode:"multiply"}} src="https://i.pinimg.com/1200x/2e/f2/f3/2ef2f3289430a49cfbd483bf44dd2f17.jpg" alt="" />
                            <p>Đơn Hàng Đang Được Giao Đến Bạn</p>
                        </div>

                        <div  className={`d-flex align-items-center mb-4 border ${statusOrder === 'shipped' ? 'active' : ''}`} style={{borderRadius:"30px"}}>
                            <img style={{width:"100px", margin:"8px", mixBlendMode:"multiply"}} src="https://img.freepik.com/premium-vector/completed-order-icon-with-shopping-cart-vector_116137-6586.jpg" alt="" />
                            <p>Bạn Đã Hoàn Thành Đơn Hàng</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}