<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\Auth; 

class OrderController extends Controller
{
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $userId = Auth::user()->id;
        $validatedData = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:products,id', 
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        foreach ($validatedData['items'] as $item) {
            $product = Product::find($item['id']);
            if (!$product) {
                return response()->json(['message' => 'Product not found'], 404);
            }
            Order::create([
                'user_id' => $userId,
                'product_id' => $item['id'],
                'price' => $item['quantity'] * $product->product_price, 
            ]);
        }

        return response()->json(['message' => 'Đặt hàng thành công'], 201);
    }

    public function show(){
        $userId = Auth::user()->id;
        $productOrder = Order::with('product')->where('user_id', $userId)->get();
        return response()->json($productOrder);
    }

    public function destroy($id){
        $orderProduct = Order::find($id);
        $orderProduct->delete();
        return response()->json(['message' => 'Xoá Thành Công']);
    }
}
