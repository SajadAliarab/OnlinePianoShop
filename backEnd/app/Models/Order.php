<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'total_price',
        'delivery_code',
        'payment_status',
        'transaction_id',
        'shipping_method',
        'user_id',
        'order_date',
        'delivery_date',
    ];

    public function orderDetails()
    {
        return $this->hasMany(orderDetails::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
