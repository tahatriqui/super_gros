<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Categorie;
use App\Models\Sous_categorie;
use App\Models\Ssous_categories;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(){
        $categories = Categorie::all();
        return response()->json($categories);
    }
    public function scat(){
        $categories = Sous_categorie::all();
        return response()->json($categories);
    }
    public function sscat(){
        $categories = Ssous_categories::all();
        return response()->json($categories);
    }
}