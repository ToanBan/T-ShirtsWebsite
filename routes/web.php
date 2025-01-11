<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\CheckOutVerifyController;
use App\Http\Controllers\VerifyOrdersController;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return view('index');
});

Auth::routes();


Route::get('/auth/check', function(){
    if (Auth::check()) {
        return response()->json([
            'authenticated' => true,
            'user' => Auth::user() 
        ]);
    }
    return response()->json(['authenticated' => false]);
});


Route::get('/t-shirt-store', function () {
    return view("pages.BuyTShirt");
});

Route::get('/women-shirt', function () {
    return view("pages.WomenShirt");
});

Route::get('/men-shirt', function () {
    return view("pages.MenShirt");
});

Route::get('/about', function () {
    return view("pages.about");
});

Route::get('/contact', function () {
    return view("pages.contact");
});

Route::get('/productdetail/{id}', function($id){
    return view("pages.product-detail");
});

Route::get('/admin', function(){
    return view('admin');
});

Route::match(['get', 'post'], '/admin/danhmuc', [CategoriesController::class, 'store']);


Route::get('/categories', [CategoriesController::class, 'show']);

Route::match(['get', 'post'], '/admin/sanpham', [ProductController::class, 'store']);

Route::get('/products', [ProductController::class, 'show']);

Route::delete('/products/{id}', [ProductController::class, 'destroy']);

Route::put('/products/{id}', [ProductController::class, 'update']);

Route::get('/popular-tshirts', [ProductController::class, 'showPopularTshirts']);

Route::get('/shirt-men', [ProductController::class, 'showBuyProductMen']);

Route::get('/shirt-women', [ProductController::class, 'showBuyProductWomen']);

Route::get('/product-detail/{id}', [ProductController::class, 'showProductDetail']);

Route::get('/api/search', [ProductController::class, 'search']);

Route::get('/search', function () {
    return view('pages.search');
});

Route::middleware(['auth', 'admin'])->group(function(){
    Route::get('/admin', [AdminController::class, 'index']);
});

Route::post('/cart/add', [CartItemController::class, 'AddItem']);

Route::get('/cart', [CartItemController::class, 'showCart']);

Route::get('/cart/view', [CartItemController::class, 'viewCart'])->name('cart-view');

Route::delete('/cart/{id}', [CartItemController::class, 'RemoveItem']);


Route::get('/cart/checkout', function(){
    return view('cartview');
});

Route::post('/cart/checkout', [CheckOutVerifyController::class, 'store']);

Route::post('/cart/order', [StripeController::class, 'session']);

Route::get('/success', [StripeController::class, 'success'])->name('success');


Route::get('/verifyorders', [VerifyOrdersController::class, 'index']);

Route::put('/verifyorders/{id}', [VerifyOrdersController::class, 'update']);

Route::get('/email/send', function(){
    return view('mail.verify');
});

Route::post('/orders/{id}/update-location', [VerifyOrdersController::class, 'updateLocation']);
Route::get('/invoiceforuser', [VerifyOrdersController::class, 'invoiceforuser']);


Route::get('/calculate-month', [StripeController::class, 'calculatedMonth']);

Route::get('/myinvoices', function(){
    return view('pages.myinvoices');
});

Route::post('/detailorder/{id}', [VerifyOrdersController::class, 'show']);