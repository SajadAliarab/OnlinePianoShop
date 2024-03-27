<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderDetail;

class PaymentController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/v1/payment",
     *     summary="Process payment",
     *     description="Process payment for the items in the request",
     *     tags={"Payment"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *            @OA\Property(property="userId", type="integer"),
     *             @OA\Property(property="items", type="array", @OA\Items(
     *                 @OA\Property(property="product_id", type="integer"),
     *                 @OA\Property(property="quantity", type="integer")
     *             ))
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Payment processed successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="order_id", type="integer"),
     *             @OA\Property(property="total_price", type="number"),
     *             @OA\Property(property="delivery_code", type="integer"),
     *             @OA\Property(property="payment_status", type="string"),
     *             @OA\Property(property="transaction_id", type="string"),
     *             @OA\Property(property="shipping_method", type="string"),
     *             @OA\Property(property="user_id", type="integer"),
     *             @OA\Property(property="order_date", type="string", format="date-time"),
     *             @OA\Property(property="delivery_date", type="string", format="date-time"),
     *             @OA\Property(property="order_details", type="array", @OA\Items(
     *                 @OA\Property(property="order_id", type="integer"),
     *                 @OA\Property(property="product_id", type="integer"),
     *                 @OA\Property(property="quantity", type="integer"),
     *                 @OA\Property(property="price", type="number"),
     *                 @OA\Property(property="discount", type="number"),
     *                 @OA\Property(property="total_price", type="number"),
     *                 @OA\Property(property="order_status", type="string")
     *             ))
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error"
     *     )
     * )
     */

    public function payment(Request $request){
        $total_price =0;

       foreach($request->items as $item){
       $product = Product::find($item['product_id']);
       if($product->discount == 0){
           $total_price += $product->price * $item['quantity'];
       } else{
              $total_price += $product->price - ($product->price * $product->discount / 100) * $item['quantity'];
       }
    }
    $order= Order::create([
        'total_price' => $total_price,
        'delivery_code'=> rand(1000,9999),
        'payment_status'=> 'pending',
        'transaction_id'=> '0',
        'shipping_method'=> '0',
        'user_id'=> $request->userId,
        'order_date'=> now(),
        'delivery_date'=> now()->addDays(7),

    ]);
    foreach($request->items as $item){
        $product = Product::find($item['product_id']);
        $orderdetail=OrderDetail::create([
            'order_id'=> $order->id,
            'product_id'=> $item['product_id'],
            'quantity'=> $item['quantity'],
            'price'=> $product->price,
            'discount'=> $product->discount,
            'total_price'=> $product->price * $item['quantity'],
            'order_status'=> 'pending',
        ]);
    }
}
}
