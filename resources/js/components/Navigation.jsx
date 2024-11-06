import React, { useState, useEffect } from "react";
import ButtonSearch from "./ButtonSearch"; 
import ButtonCart from "./ButtonCart";
import BtnGroup from "./BtnGroup";
function Navigation() {
    const [user, setUser] = useState(null); 
    const [username, setUsername] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [product, setProduct] = useState([]);
    
    const imgPath = "http://127.0.0.1:8000/storage/temp_images";
    const fetchCart = () => {
        fetch('/cart')
            .then(response => {
                if(!response.ok){
                    throw new Error('Failed to fetch cart items');
                }
                return response.json();
            })
            .then(data => {
                setProduct(data);
            })
            .catch(err => console.log(err));
    }


    useEffect(() => {
        fetch('/auth/check')
            .then(response => response.json())
            .then(data => {
                setUser(data.authenticated);
                if (data.authenticated) {
                    setUsername(data.user.name); 
                }
            })
            .catch(err => console.log(err));

        fetchCart();
    }, []);

    const handleLogout = () => {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                setUser(false); 
                setUsername('');
                window.location.href = '/'; 
            }
        })
        .catch(err => console.log(err));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
            setSearchQuery('');
            const modal = document.getElementById('modal');
            if (modal) {
                modal.classList.remove('show');
                modal.style.display = 'none';
            }
            document.body.classList.remove('modal-open');
            document.body.style.removeProperty('padding-right');
            const modalBackdrop = document.querySelector('.modal-backdrop');
            if (modalBackdrop) {
                modalBackdrop.remove();
            }
        }
    };
   
    return (
        <>
            <nav className="navbar navbar-expand-sm bg-light navbar-light" style={{ height: '80px' }}>
                <div className="container-fluid">
                    <a href="/" className="navbar-brand">T-SHIRT SHOP</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a style={{ fontSize: '15px' }} href="t-shirt-store" className="nav-link text-dark">BUY T-SHIRTS</a>
                            </li>
                            <li className="nav-item">
                                <a style={{ fontSize: '15px' }} href="women-shirt" className="nav-link text-dark">WOMEN</a>
                            </li>
                            <li className="nav-item">
                                <a style={{ fontSize: '15px' }} href="men-shirt" className="nav-link text-dark">MEN</a>
                            </li>
                            <li className="nav-item">
                                <a style={{ fontSize: '15px' }} href="about" className="nav-link text-dark">ABOUT</a>
                            </li>
                            <li className="nav-item">
                                <a style={{ fontSize: '15px' }} href="contact" className="nav-link text-dark">CONTACT</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item me-4">
                                <a style={{ fontSize: '15px' }} href="#" className="nav-link" data-bs-toggle="modal" 
                                data-bs-target="#modal"><ButtonSearch/></a>
                            </li>

                            <li className="nav-item me-4">
                                <a style={{ fontSize: '15px' }} href="#" className="nav-link" data-bs-toggle="offcanvas" 
                                    data-bs-target="#offcanvas"><ButtonCart /></a>
                            </li>

                            {user ? (
                                <li className="nav-item me-4 dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{username}</a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button onClick={handleLogout} className="dropdown-item" style={{ fontSize: '15px' }}>Logout</button>
                                        </li>
                                    </ul>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item me-4">
                                        <a style={{ fontSize: '15px' }} href="/login" className="nav-link text-primary">Login</a>
                                    </li>

                                    <li className="nav-item me-4">
                                        <a style={{ fontSize: '15px' }} href="/register" className="nav-link text-primary">Register</a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="offcanvas offcanvas-end" id="offcanvas">
                <div className="offcanvas-header" style={{borderBottom:"1px solid #efefef"}}>
                    <p id="offcanvasLabel" style={{fontSize:"15px", fontWeight:"600"}} className="m-0">Shopping Cart</p>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                {product.length > 0 ? 
                (<>
                    <div className="offcanvas-body">
                        {product.map((item) => (
                                <div key={item.id} className="d-flex align-items-center justify-content-around mb-3 position-relative">
                                   
                                    <button 
                                        className="btn-close position-absolute" 
                                        style={{ top: 0, right: 0, width: '5px', height: '5px' }}
                                        aria-label="Close"
                                        onClick={() => handleRemove(item.id)}
                                    ></button>
                                    <img 
                                        src={`${imgPath}/${item.product.product_image.replace('temp_image/', '')}`} 
                                        alt="product" 
                                        style={{width:"60px", height:"60px", marginRight: "10px"}}
                                    />
                                    <p className="m-0 me-2">{item.product.product_name}</p>
                                    <p className="m-0">Total: {item.product.product_price * item.quantity}
                                    </p>
                                </div>
                            ))}
                    </div>

                <div className="offcanvas-footer text-center">
                    <div><strong>Total</strong>: {product.reduce((total, item) => total + item.product.product_price * item.quantity, 0)}</div>
                    <a href="/cart/view" className="btn btn-dark text-white w-100 m-3">View Cart</a>
                </div>
                </>)
                :(
                    <>
                    <div className="offcanvas-body d-flex justify-content-center align-items-center">
                        <p>Your cart items will appear here.</p>
                    </div>

                    <div className="offcanvas-footer d-flex justify-content-center align-items-center">
                        <button className="btn btn-dark text-white w-100 m-3">Continue Shopping</button>
                    </div>
                    </>

                )}
                
            </div>

            <div className="modal fade" id="modal">
                <div className="modal-dialog modal-lg d-flex justify-content-center align-items-center" style={{height:"90vh"}}>
                    <div className="modal-content justify-content-center border-0" style={{backgroundColor:"transparent"}}>
                        <div className="modal-header justify-content-center border-0">
                            <p className="m-0 fs-5 text-white">Start typing and press enter to search</p>
                        </div>
                        <div className="modal-body" style={{borderBottom:"1px solid white"}}>
                            <form onSubmit={handleSearch}>
                                <div className="input-group mt-3">
                                    <input 
                                        style={{backgroundColor:"transparent", fontSize:"2rem", outline:"none", boxShadow:"none"}} 
                                        className="form-control border-0 text-white" 
                                        type="text" 
                                        placeholder="Search..." 
                                        name="search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button style={{backgroundColor:"transparent"}} type="submit" className="input-group-text border-0">
                                        <ButtonSearch />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navigation;
