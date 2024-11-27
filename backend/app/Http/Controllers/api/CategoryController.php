<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Categorie;
use App\Models\Produit;
use App\Models\Sous_categorie;
use App\Models\Ssous_categories;
use App\Models\Sssous_categories;
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
    public function ssscat(){
        $categories = Sssous_categories::all();
        return response()->json($categories);
    }
    public function produit(){
        $produit =  Produit::all();
        return response()->json($produit);

    }
}