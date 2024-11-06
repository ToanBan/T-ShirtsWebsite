<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\CartItem;
use App\Models\Product;
use Stripe\Stripe;
use Stripe\Checkout\Session as StripeSession;

class StripeController extends Controller
{
    public function session(Request $request){
        $items = $request->input('items');
        $lineItems = [];
        $userId = auth()->user()->id;
        foreach ($items as $item) {
            $product = Product::find($item['id']);
            if (!$product) {
                return response()->json(['error' => 'Product not found.'], 404);
            }

            $lineItems[] = [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $product->product_name,
                    ],
                    'unit_amount' => $product->product_price * 100, // Chuyển sang cents
                ],
                'quantity' => $item['quantity'],
            ];

            Order::create([
                'user_id' => $userId,
                'product_id' => $product->product_id,
                'price' => $product->product_price * $item['quantity'],
            ]);
        }

        try {
            Stripe::setApiKey(env('STRIPE_SECRET'));
            $session = StripeSession::create([
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => route('success'),
                'cancel_url' => route('cart-view')
            ]);

            session(['order_successful' => true]);
            return response()->json(['url' => $session->url]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error creating Stripe session: ' . $e->getMessage()], 500);
        }

    }

    public function success(){
        session()->forget('order_successful');
        return view('pages.success');
    }
}
