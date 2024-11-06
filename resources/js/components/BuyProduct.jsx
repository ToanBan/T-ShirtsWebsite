import React from "react";
import { useState, useEffect } from "react";

export default function BuyProduct(){
    const [products, setProducts] = useState([]);
    const imgPath = "http://127.0.0.1:8000/storage/temp_images";
    useEffect(() => {
        fetch('/products')
        .then(response => response.json())
        .then(data => {
            setProducts(data);
        })
    }, []);
    return(
        <>
            <div className="container-fluid">
                <h4 style={{fontSize:"55px", fontWeight:"400", color:"#415161", marginTop:"60px"}}>SHOP</h4>
                <div className="row mt-5">
                    {products.map(product=>
                        <div className="col-3 mt-5">
                        <a href={`/productdetail/${product.product_id}`}>
                        <img className="rounded" src={`${imgPath}/${product.product_image.replace('temp_image/', '')}`}  
                        alt="" style={{maxWidth:"260px", maxHeight:"315px"}}/>
                        </a>
                        <div className="info-shirt">
                            <p style={{fontSize:"15px", color:"#ccc", fontWeight:"400", marginBottom:"6px"}} className="gender">Men</p>
                            <h4 style={{fontSize:"18px"}} className="name-shirt">{product.product_name}</h4>
                            <p style={{fontSize:"12px", fontWeight:"600"}} className="price m-0">{product.product_price}</p>
                            <div className="color-shirt d-flex align-items-center mt-2">
                                <div className="me-3" style={{width:"20px", height:"20px", backgroundColor:"black"}}></div>
                                <div className="me-3" style={{width:"20px", height:"20px", backgroundColor:"red"}}></div>
                                <div className="me-3" style={{width:"20px", height:"20px", backgroundColor:"blue"}}></div>
                                <div className="me-3" style={{width:"20px", height:"20px", backgroundColor:"yellow"}}></div>
                            </div>
                            <div className="size-shirt d-flex mt-2">
                                <div className="me-3" style={{width:"20px", height:"20px"}}> <span style={{fontSize:"12px", padding:"5px 10px", border:"1px solid #00000020", borderRadius:"2"}}>XL</span> </div>
                                <div className="me-3" style={{width:"20px", height:"20px"}}><span style={{fontSize:"12px", padding:"5px 10px", border:"1px solid #00000020", borderRadius:"2"}}>L</span></div>
                                <div className="me-3" style={{width:"20px", height:"20px"}}><span style={{fontSize:"12px", padding:"5px 10px", border:"1px solid #00000020", borderRadius:"2"}}>M</span></div>
                                <div className="me-3" style={{width:"20px", height:"20px"}}><span style={{fontSize:"12px", padding:"5px 10px", border:"1px solid #00000020", borderRadius:"2"}}>S</span></div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}