<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\UserVerifyAddress;
class CheckOutVerifyController extends Controller
{
    public function store(Request $request){
        $userId = Auth::id();
        $data = $request->all();
        if($data){
            $firstName = $data['firstname'];
            $lastName = $data['lastname'];
            $name = $firstName . ' ' . $lastName;
            $userVerify = UserVerifyAddress::updateOrCreate([
                'user_id' => $userId,
                'name' => $name,
                'phone' => $data['phone'],
                'description' => $data['description'],
                'total_price' => $data['totalprice'],
                'email' => $data['email'],
            ]);
            return response()->json(['message' => $userVerify->id]);
        }
    }
}
