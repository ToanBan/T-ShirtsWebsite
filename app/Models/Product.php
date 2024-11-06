<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function categories(){
        return $this->belongsTo(Categories::class);
    }

    public function users(){
        return $this->belongsToMany(User::class);
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function orders(){
        return $this->hasMany(Order::class);
    }

}
