import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import AddCart from "./Cart/AddCart";
import BtnGroup from "./BtnGroup";
export default function DetailProduct(){

    const imgPath = "http://127.0.0.1:8000/storage/temp_images";
    const [productDetail, setProductDetail] = useState({});
    const [count, setCount] = useState(1);

    const Increment = () => {
        setCount(count=>count + 1)
    }

    const Descrement = () => {
        if(count < 1){
            setCount(0);
        }else{
            setCount(count=>count - 1)

        }
    }
    useEffect(() => {
        const pathSegments = window.location.pathname.split('/');
        const productId = pathSegments[pathSegments.length - 1];
        fetch(`/product-detail/${productId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setProductDetail(Array.isArray(data) ? data[0] : data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);         
            });
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="d-flex">
                    <img 
                        className="col-6" 
                        src={productDetail.product_image 
                            ? `${imgPath}/${productDetail.product_image.toString().replace('temp_image/', '')}` 
                            : ''
                        }   
                        alt="" 
                    />
                    <div className="description col-6 ms-5">
                        <div>
                            <p className="gender">{productDetail.category_id == 1 ? "MEN" : "WOMEN"}</p>
                            <h4>{productDetail?.product_name}</h4>
                            <strong className="price">{productDetail.product_price}</strong>
                            <p className="des">{productDetail.product_description}</p>
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

                        <div className="d-flex mt-4" style={{borderTop:"1px solid #00000099", borderBottom:"1px solid #00000099"}}>
                            <BtnGroup count={count} Increment={Increment} Descrement={Descrement}/>

                            <div className="div mt-4 ms-4">
                                <button onClick={() => AddCart(productDetail.id, count)} className="btn btn-dark">Add to cart</button>
                            </div>
                        </div>

                        <div style={{borderBottom:"1px solid #00000099"}}>
                            <div className="mt-2 mb-3 d-flex align-items-center justify-content-between">
                                <h5 className="m-0">Desciption</h5>
                                <button className="btn btn-light border" data-bs-toggle="collapse" data-bs-target="#collapsedes">+</button>
                            </div>

                            <div id="collapsedes" className="collapse show">
                                <p>About the product</p>
                                <p>{productDetail.product_description}</p>
                            </div>
                        </div>

                        <div style={{borderBottom:"1px solid #00000099"}}>
                            <div className="mt-2 mb-3 d-flex align-items-center justify-content-between">
                                <h5 className="m-0">Additional information</h5>
                                <button className="btn btn-light border" data-bs-toggle="collapse" data-bs-target="#collapseadd">+</button>
                            </div>

                            <div id="collapseadd" className="collapse show">
                                <table className="table table-bordered">
                                    <tr className="border">
                                        <td className="border p-2">Color</td>
                                        <td>Black, Orange, White</td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border p-2">Size</td>
                                        <td>XL, L, M, S</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
