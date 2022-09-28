<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;
    protected $fillable = ['menus_id', 'menus_nameen', 'menus_nameth', 'menus_image_type', 'menus_price', 'menus_status'];
}
