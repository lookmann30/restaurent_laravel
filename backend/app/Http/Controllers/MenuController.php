<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;

class MenuController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    
    public function index()
    {
        $menus = Menu::all();
        return response()->json([
            'status' => 'success',
            'menus' => $menus,
        ]);
    }
}
