import React, { useState, useEffect } from "react";

export default function SearchBody() {
    const imgPath = "http://127.0.0.1:8000/storage/temp_images";
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleSearch = () => {
            const searchParams = new URLSearchParams(window.location.search);
            const query = searchParams.get('q');
            setSearchQuery(query);
            if (query) {
                fetchSearch(query);
            }
        }
        handleSearch();
        window.addEventListener('popstate', handleSearch);

        return () => {
            window.removeEventListener('popstate', handleSearch);
        }
    }, []);

    const fetchSearch = async (query) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSearchResults(data);
            setLoading(false);
        } catch (err) {
            setError('An error occurred while fetching search results.');
            setLoading(false);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Search Results for "{searchQuery}"</h2>
            {searchResults.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <div className="row">
                    {searchResults.map(product => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img 
                                    className="card-img-top" 
                                    src={product.product_image 
                                        ? `${imgPath}/${product.product_image.toString().replace('temp_image/', '')}` 
                                        : ''
                                    }   
                                    alt={product.product_name} 
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.product_name}</h5>
                                    <p className="card-text">{product.category_id == 1 ? "MEN" : "WOMEN"}</p>
                                    <p className="card-text"><strong>${product.product_price}</strong></p>
                                    <p className="card-text">{product.product_description}</p>
                                    <a href={`/productdetail/${product.id}`} className="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
