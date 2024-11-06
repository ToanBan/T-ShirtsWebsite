export default function AddCart(productID, quantity){
    fetch("/cart/add", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body:JSON.stringify({product_id:productID, quantity:quantity})
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        alert("Thêm vào giỏ hàng thành công");
        console.log(data);
    }).catch(error => {
        console.error('Error:', error);
        alert("Thêm vào giỏ hàng thất bại");
    }) 
}
