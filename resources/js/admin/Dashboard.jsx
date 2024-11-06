import React from "react"

export default function Dashboard(){
    return (
        <>
            <div >
                <h3>Dashboard</h3>
                <div 
                    className="container-fluid mt-5 d-flex align-items-center justify-content-center" 
                    style={{ height: "calc(100vh - 100px)" }} 
                >
                    <div className="row w-100 justify-content-around">
                        <div 
                            className="col-md-5 bg-primary rounded d-flex align-items-center justify-content-center mb-3" 
                            style={{ height: "130px" }}
                        >
                            <p className="text-white">Đơn Hàng Gần Nhất</p>
                        </div>
                        <div 
                            className="col-md-5 bg-danger rounded d-flex align-items-center justify-content-center mb-3" 
                            style={{ height: "130px" }}
                        >
                            <p className="text-white">Tổng Doanh Thu</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
