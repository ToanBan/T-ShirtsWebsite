<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categories;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CategoriesController extends Controller
{
    public function store(Request $request){

        $data = $request->all();
        
        $request->validate([
            'iddanhmuc' => 'required', 
            'danhmuc' => 'required'
        ]);

       
        $category = Categories::create([
            'category_id' => $data['iddanhmuc'],
            'category_name' => $data['danhmuc']
        ]);
        
        

        return response()->json($category, 201);
    }

    public function show(){
        $categorries = DB::table('categories')->get();
        return response()->json($categorries);
    }
    
}
