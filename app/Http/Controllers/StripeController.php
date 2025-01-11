<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session as StripeSession;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\Invoice;
use Illuminate\Support\Facades\DB;
class StripeController extends Controller
{
    public function session(Request $request){
        $data = $request->input('dataOrder');
        $lineItems = [];
        $userVerify = $request->input('userVerifyId');
        $totalPrice = 0;       
        foreach($data as $item){
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $item['product']['product_name'],
                    ], 
                    'unit_amount' => $item['product']['product_price'],
                ],
                'quantity' => $item['quantity']
            ];
            $totalPrice += $item['quantity'] * $item['product']['product_price'];
        }

        Stripe::setApiKey(env('STRIPE_SECRET'));
        $session = StripeSession::create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('success'),
        ]);

        session(['order_completed' => true, 'data' => $data, 'totalprice' => $totalPrice, 'userverifyid' => $userVerify]);
        return response()->json(['url' => $session->url]);
    }   

    public function success(){
        $data = session()->get('data');
        $totalPrice = session()->get('totalprice');
        $userverifyId = session()->get('userverifyid');
        $userId = Auth::id();
        if($data){
            $invoices = Invoice::updateOrCreate([
                'user_id' => $userId,
                'total_price' => $totalPrice,
                'status' => 'pending',
                'userverify_id' => $userverifyId,
            ]);

            if($invoices){
                foreach($data as $item){
                    Order::updateOrCreate([
                        'invoice_id' => $invoices->id,
                        'product_id' => $item['product_id'],
                        'price' => $item['product']['product_price'],
                        'quantity' => $item['quantity']
                    ]);
                }
                session()->forget('data');
                return view('cartview');
            }
        }
    }

    public function calculatedMonth(){
        $data = DB::table('invoices')
        ->select(DB::raw('MONTH(created_at) as month'), DB::raw('SUM(total_price) as total'))
        ->groupBy(DB::raw('MONTH(created_at)'))
        ->get();
        return response()->json($data);
    }
}
