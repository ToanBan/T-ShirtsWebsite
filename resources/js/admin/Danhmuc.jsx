import React, { useEffect, useState } from "react";

export default function Danhmuc() {
    const [categories, setCategories] = useState([]);

    const fetchCategories = () => {
        fetch('/categories')
            .then(response => response.json())
            .then(data => {
                setCategories(data); 
            })
            .catch(err => alert("Thêm Sản Phẩm Thất Bại"));
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const formData = new FormData(e.target);
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        if (!csrfTokenMeta) {
            console.error("CSRF token not found!");
            return; 
        }

        fetch('/admin/danhmuc', {
            method: 'POST', 
            body: formData,
            headers: {
                'X-CSRF-TOKEN': csrfTokenMeta.content,
                'Accept': 'application/json'
            },
            redirect: 'follow'
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text || 'Network response was not ok');
                });
            }
            return response.json(); 
        })
        .then(data => {
            console.log("Thêm danh mục thành công:", data);
            alert("Danh Mục Được Thêm Thành Công");
            fetchCategories();
            e.target.reset();
        })
        .catch(err => {
            console.error("Thêm dữ liệu thất bại:", err);
            alert("Thêm Danh Mục Thất Bại: " + err.message);
        });
    };

    return (
        <>
            <div className="container">
                <h3 className="mb-4">Thêm Danh Mục Sản Phẩm</h3>
                <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                    <div className="d-flex">
                        <label className="col-2" htmlFor="iddanhmuc">Mã Danh Mục</label>
                        <input name="iddanhmuc" id="iddanhmuc" type="text" placeholder="Mã Danh Mục" className="form-control" />
                    </div>

                    <div className="d-flex">
                        <label className="col-2" htmlFor="danhmuc">Danh Mục</label>
                        <input name="danhmuc" id="danhmuc" type="text" placeholder="Danh Mục" className="form-control" />
                    </div>
                    
                    <div className="d-flex mt-3 justify-content-end">
                        <button name="submitsp" className="btn btn-dark flex-end" type="submit">SEND</button>
                    </div>
                </form>

                <table className="table table-bordered mt-5">
                    <thead>
                        <tr className="border"> 
                            <th className="border col-2" style={{padding:"8px 16px"}}>Mã Danh Mục</th>
                            <th>Tên Danh Mục</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cate => (
                            <tr className="border" key={cate.category_id}> 
                                <td className="border" style={{padding:"8px 16px"}}>{cate.category_id}</td>
                                <td>{cate.category_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
