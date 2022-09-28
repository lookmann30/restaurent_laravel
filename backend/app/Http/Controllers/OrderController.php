<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }
    
    public function index($id){
        $orders = Order::select('orders.*', 'users.name')
        ->join('users', 'orders.users_id', '=', 'users.id')
        ->where('orders.users_id',$id)
        ->get();
        return response()->json([
            'status' => 'success',
            'orders' => $orders,
        ]);
    }

    public function show($id){
        $orders = Order::select('orders.*', 'users.name')
        ->join('users', 'orders.users_id', '=', 'users.id')
        ->where('orders.id',$id)
        ->get();
        return response()->json([
            'status' => 'success',
            'orders' => $orders,
        ]);
    }

    public function store(Request $request)
    {

        $orders = Order::create([
            'detail' => json_encode($request->orders_detail),
            'status' => $request->orders_status,
            'total_price' => $request->orders_total_price,
            'users_id' => $request->users_id,
            'cooking_status' => $request->orders_cooking_status
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Order created successfully',
            'orders' => $orders,
        ]);
    }

    public function update(Request $request, $id)
    {

        $orders = Order::find($id);
        $orders->detail = $request->orders_detail;
        $orders->total_price = $request->orders_total_price;
        $orders->status = $request->orders_status;
        $orders->cooking_status = $request->orders_cooking_status;
        $orders->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Order updated successfully',
            'orders' => $orders,
        ]);
    }

    public function destroy(Request $request,$id)
    {
        $orders = Order::find($id);
        $orders->status = $request->orders_status;
        $orders->cooking_status = $request->orders_cooking_status;
        $orders->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Order Cancel successfully',
            'orders' => $orders,
        ]);
    }

    
}
