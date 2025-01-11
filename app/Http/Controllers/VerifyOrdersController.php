<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Mail\VerifyOrders;
class VerifyOrdersController extends Controller
{
    public function index(){
        $invoices = Invoice::with(['order','user', 'userverify'])->get();
        return response()->json($invoices);
    }

    public function update($id){
        $status = request()->input('value');
        $updateOrderStatus = Invoice::find($id);
        
        if($updateOrderStatus){
            $updateOrderStatus->update([
                'status' => $status,
            ]);

            if($updateOrderStatus->status === 'accept'){
                $userMail = DB::table('user_verify_addresses')->where('id', $updateOrderStatus->userverify_id)->first();
                Mail::to($userMail->email)->send(new VerifyOrders());
            }

            if($updateOrderStatus->status === 'shipping'){
                $updateOrderStatus->update([
                    'shipping_location' => $updateOrderStatus->userverify->description,
                ]);
                return response()->json($updateOrderStatus);
            }

            return response()->json(['message' => 'update successfully']);
        }
        return response()->json(['message' => 'update error']);
    }

    public function updateLocation(Request $request, $id){
        $order = Invoice::find($id);
        if ($order) {
            $order->update(['shipping_location' => $request->input('location')]);
    
            return response()->json(['message' => 'Location updated successfully']);
        }
    
        return response()->json(['message' => 'Order not found'], 404);
    }

    public function invoiceforuser(){
        $userId = Auth::id();
        $invoices = Invoice::with(['order','user', 'userverify', 'order.product'])->where('user_id', $userId)->get();
        return response()->json($invoices);
    }

    public function show($id){
        $invoices = Invoice::find($id);
        return response()->json($invoices);
    }
}
