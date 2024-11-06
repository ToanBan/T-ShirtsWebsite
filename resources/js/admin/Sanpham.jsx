// Sanpham.js
import React, { useEffect, useState } from "react";

export default function Sanpham() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const imgPath = "http://127.0.0.1:8000/storage/temp_images";

    // Fetch Categories
    const fetchCategories = () => {
        fetch('/categories')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(err => console.log(err));
    };

    // Fetch Products
    const fetchProducts = () => {
        fetch('/products')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProducts(data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault(); 
        const formData = new FormData(e.target);
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        if (!csrfTokenMeta) {
            console.error("CSRF token not found!");
            return; 
        }
    
        fetch('/admin/sanpham', {
            method: 'POST', 
            body: formData,
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
            alert("Sản Phẩm Được Thêm Thành Công");
            fetchProducts();  
            e.target.reset();
        })
        .catch(err => console.error("Thêm dữ liệu thất bại:", err));
    };
  

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
            const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
            if (!csrfTokenMeta) {
                console.error("CSRF token not found!");
                return;
            }

            fetch(`/products/${id}`, {
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
                fetchProducts();
            })
            .catch(err => console.error("Xoá sản phẩm thất bại:", err));
        }
    }

    // Add this function to handle edit button click
    const handleEditClick = (product) => {
        setEditingProduct(product);
    };

    // Add this function to handle update submission
    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        if (!csrfTokenMeta) {
            console.error("CSRF token not found!");
            return;
        }

        fetch(`/products/${editingProduct.product_id}`, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': csrfTokenMeta.content,
                'X-HTTP-Method-Override': 'PUT'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert("Sản phẩm đã được cập nhật thành công.");
            fetchProducts();
            const modal = document.getElementById('modalEdit');
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            bootstrapModal.hide();
        })
        .catch(err => console.error("Cập nhật sản phẩm thất bại:", err));
    };

    return (
        <>
            <div className="container">
                <h3 className="mb-4">Thêm Sản Phẩm</h3>
                <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data"> 
                    <div className="d-flex">
                        <label className="col-2" htmlFor="idproduct">ID Sản Phẩm</label>
                        <input name="idproduct" id="idproduct" type="text" placeholder="Nhập Mã Sản Phẩm" className="form-control" required />
                    </div>

                    <div className="d-flex mt-3">
                        <label className="col-2" htmlFor="nameproduct">Tên Sản Phẩm</label>
                        <input name="nameproduct" id="nameproduct" type="text" placeholder="Nhập Tên Sản Phẩm" className="form-control" required />
                    </div>

                    <div className="d-flex mt-3">
                        <label className="col-2" htmlFor="priceproduct">Giá Sản Phẩm</label>
                        <input name="priceproduct" id="priceproduct" type="text" placeholder="Nhập Giá Sản Phẩm" className="form-control" required />
                    </div>

                    <div className="d-flex mt-3">
                        <label className="col-2" htmlFor="imageproduct">Hình Ảnh Sản Phẩm</label>
                        <input name="imageproduct" id="imageproduct" type="file" className="form-control" required />
                    </div>

                    <div className="d-flex mt-3">
                        <label htmlFor="selected" className="col-2">Chọn Loại Sản Phẩm</label>
                        <select className="form-control" name="selected" id="selected" required>
                            <option value="">Chọn loại sản phẩm</option>
                            {categories.map(cate => (
                                <option key={cate.category_id} value={cate.category_id}>{cate.category_name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="d-flex mt-3">
                        <label className="col-2" htmlFor="desproduct">Mô Tả Sản Phẩm</label>
                        <textarea name="desproduct" id="desproduct" cols="30" rows="10" className="form-control" required></textarea>
                    </div>
                    
                    <div className="d-flex mt-3 justify-content-end">
                        <button name="submitsp" className="btn btn-dark" type="submit">SEND</button>
                    </div>
                </form>

                <table className="table table-bordered mt-5">
                    <thead>
                        <tr className="border"> 
                            <th className="border col-2" style={{ padding: "8px 16px" }}>Mã Sản Phẩm</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Giá Sản Phẩm</th>
                            <th>Hình Ảnh Sản Phẩm</th>
                            <th>Mô Tả Sản Phẩm</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr className="border" key={product.product_id}> 
                                <td className="border" style={{ padding: "8px 16px" }}>{product.product_id}</td>
                                <td>{product.product_name}</td>
                                <td>{product.product_price}</td>
                                <td>
                                    <img 
                                        src={`${imgPath}/${product.product_image.replace('temp_image/', '')}`} 
                                        alt={product.product_name} 
                                        style={{ width: '100px', height: 'auto' }}
                                    />
                                </td>

                                <td>{product.product_description}</td>
                                <td>
                                    <button 
                                        className="btn btn-light text-primary me-2"
                                        data-bs-toggle="modal" 
                                        data-bs-target="#modalEdit"
                                        onClick={() => handleEditClick(product)} // Thiết lập sản phẩm hiện tại
                                    >
                                        EDIT
                                    </button>
                                    <button 
                                        className="btn btn-light text-danger"
                                        onClick={() => handleDelete(product.product_id)}
                                    >
                                        XOÁ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal Edit Product */}
                <div className="modal fade" id="modalEdit" tabIndex="-1" aria-labelledby="modalEditLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="modalEditLabel">Sửa Sản Phẩm</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                {editingProduct && (
                                    <form onSubmit={handleUpdate} method="POST" encType="multipart/form-data">
                                        <div className="mb-3">
                                            <label htmlFor="nameproduct" className="form-label">Tên Sản Phẩm</label>
                                            <input type="text" className="form-control" id="nameproduct" name="nameproduct" defaultValue={editingProduct.product_name} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="priceproduct" className="form-label">Giá Sản Phẩm</label>
                                            <input type="number" className="form-control" id="priceproduct" name="priceproduct" defaultValue={editingProduct.product_price} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="imageproduct" className="form-label">Hình Ảnh Sản Phẩm</label>
                                            <input type="file" className="form-control" id="imageproduct" name="imageproduct" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="selectedEdit" className="form-label">Loại Sản Phẩm</label>
                                            <select className="form-control" name="selectedEdit" id="selectedEdit" defaultValue={editingProduct.category_id} required>
                                                {categories.map(cate => (
                                                    <option key={cate.category_id} value={cate.category_id}>{cate.category_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="desproduct" className="form-label">Mô Tả Sản Phẩm</label>
                                            <textarea className="form-control" id="desproduct" name="desproduct" rows="3" defaultValue={editingProduct.product_description}></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Cập nhật</button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
