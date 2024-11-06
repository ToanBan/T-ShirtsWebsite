<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;
class CartItemController extends Controller
{
    public function AddItem(Request $request){
        $userID = Auth::user()->id;
        $productID = $request->input('product_id');
        $quantity = $request->input('quantity');

        $cartItem = CartItem::where('user_id', $userID)->where('product_id', $productID)->first();
        if($cartItem){
            $cartItem->quantity += $quantity;
            $cartItem->save();
        }else{
            CartItem::create(['user_id' => $userID, 'product_id' => $productID, 'quantity' => $quantity]);
        }
        return response()->json(['message' => 'Item added to cart successfully']);
    }


    public function showCart(){
        $userID = Auth::user()->id;
        $cartItems = CartItem::with('product')->where('user_id', Auth::user()->id)->get();
        return response()->json($cartItems);
    }

    public function viewCart(){
        $userId = Auth::user()->id;
        $cartItems = CartItem::with('product')->where('user_id', $userId)->get();
        return view('cartview', compact('cartItems'));
    }

    public function RemoveItem($id){
        $cartItem = CartItem::find($id);
        if(!$cartItem){
            return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
        }
        $cartItem->delete();
        return response()->json(['message'=>'Sản Phẩm được xoá thành công']);
    }
}
