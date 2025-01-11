import React, { useEffect, useState } from "react";
import Map from "./Map";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [address, setAdress] = useState(null);
    const [desMarker, setDesMarket] = useState(null);
    const [ship, setShip] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const init = { lat: 10.8231, lng: 106.6297 };

    const ChooseCheck = (value, id) => {
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        fetch(`/verifyorders/${id}`, {
            method: "POST",
            body: JSON.stringify({ value }),
            headers: {
                'X-CSRF-TOKEN': csrfTokenMeta.content,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-HTTP-Method-Override': 'PUT',
            }
        })
            .then(response => response.json())
            .then(data => {
                alert('Update Status Successfully');
                fetchOrder();
                setAdress(data.shipping_location);
                setOrderId(data.id);
            })
            .catch(err => console.error(err));
    }

    const fetchOrder = async () => {
        try {
            const response = await fetch('/verifyorders');
            const data = await response.json();
            setOrders(data);
        } catch (err) {
            console.error(err);
        }
    }

    const getCoordinates = async (address) => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                return { lat: parseFloat(lat), lng: parseFloat(lon) };
            } else {
                alert('Không tìm thấy địa chỉ. Vui lòng kiểm tra lại!');
                return null;
            }
        } catch (err) {
            console.error(err);
        }
    }




    useEffect(() => {
        fetchOrder();
    }, []);

    useEffect(() => {
        if (address) {
            getCoordinates(address).then((coordes) => {
                if (coordes) {
                    setDesMarket(coordes);
                    setShip(true);
                }
            });
        }
    }, [address]);

    return (
        <div className="container">
            <h3>Quản Lý Đơn Hàng</h3>
            <div className="mt-5" style={{ borderRadius: "30px" }}>
                <div className="pb-5 border shadow">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Tên Khách Hàng</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th>Địa Chỉ</th>
                                <th>Tổng Tiền</th>
                                <th>Trạng Thái</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.userverify.name}</td>
                                    <td>{item.userverify.email}</td>
                                    <td>{item.userverify.phone}</td>
                                    <td>{item.userverify.description}</td>
                                    <td>{item.total_price}</td>
                                    <td>{item.status}</td>
                                    <td><button onClick={() => ChooseCheck('accept', item.id)} className="btn btn-primary">Accept</button></td>
                                    <td><button onClick={() => ChooseCheck('shipping', item.id)} className="btn btn-primary">Shipping</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-5">
                {ship && (<Map init={init} des={desMarker} ChooseCheck={ChooseCheck} orderId={orderId}/>)}
            </div>
        </div>
    )
}
