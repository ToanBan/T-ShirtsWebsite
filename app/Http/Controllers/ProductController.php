<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Categories;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
class ProductController extends Controller
{
    public function getCategories(){
        $categorries = DB::table('categories')->get();
        return response()->json($categorries);
    }

    public function store(Request $request){

        $data = $request->all();
        
        $request->validate([
            'idproduct' => 'required', 
            'nameproduct' => 'required',
            'priceproduct' => 'required',
            'imageproduct' => 'required',
            'desproduct' => 'required',
            'selected' => 'required'
        ]);

        $image = $request->file('imageproduct');
        $imageName = time() . '-' . $image->getClientOriginalName();
        $tempImagePath = 'temp_image/' . $imageName;
        $imagePath = storage_path('app/public/' . $tempImagePath);
        $image->move(storage_path('app/public/temp_images'), $imageName);
        

        $product = Product::create([
            'product_id' => $data['idproduct'],
            'product_name' => $data['nameproduct'],
            'product_price' => $data['priceproduct'],
            'product_image' => $tempImagePath,
            'product_description' => $data['desproduct'],
            'category_id' => $data['selected']
            
        ]);
        
        

        return response()->json($product, 201);
    }

    public function show(){
        $products = DB::table('products')->get();
        return response()->json($products);
    }

    public function destroy($id){
        $product = Product::find($id);
        if(!$product){
            return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
        }

        if($product->product_image){
            Storage::delete('pubic/temp_images/' . $product->product_image);
        }

        $product->delete();
        return response()->json(['message'=>'Sản Phẩm được xoá thành công']);
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $request->validate([
            'nameproduct' => 'required|string|max:255',
            'priceproduct' => 'required|numeric',
            'imageproduct' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'desproduct' => 'nullable|string',
            'selectedEdit' => 'required|exists:categories,category_id'
        ]);

        $product = Product::findOrFail($id);

        if ($request->hasFile('imageproduct')) {
            if ($product->product_image) {
                Storage::delete('public/temp_images/' . basename($product->product_image));
            }
            $image = $request->file('imageproduct');
            $imageName = time() . '-' . $image->getClientOriginalName();
            $tempImagePath = 'temp_image/' . $imageName;
            $image->move(storage_path('app/public/temp_images'), $imageName);
        } else {
            $tempImagePath = $product->product_image;
        }

        $product->update([
            'product_name' => $data['nameproduct'],
            'product_price' => $data['priceproduct'],
            'product_image' => $tempImagePath,
            'product_description' => $data['desproduct'],
            'category_id' => $data['selectedEdit']
        ]);

        return response()->json($product, 200);
    }

    public function showPopularTshirts(){
        $products = DB::table('products')->limit(4)->get();
        return response()->json($products);
    }  
    
    public function showBuyProductMen(){
        $products = DB::table('products')->where('category_id', 1)->get();
        return response()->json($products);
    }

    public function showBuyProductWomen(){
        $products = DB::table('products')->where('category_id', 2)->get();
        return response()->json($products);
    }

    public function showProductDetail($id){
        $product = DB::table('products')->where('product_id', $id)->get();
        return response()->json($product);
    }

    public function search(Request $request)
    {
        $query = $request->input('q');
        
        $products = Product::where('product_name', 'LIKE', "%{$query}%")
                           ->orWhere('product_description', 'LIKE', "%{$query}%")
                           ->get();
        
        return response()->json($products);
    }

}
