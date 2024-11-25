<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TestController extends Controller
{
     public function index()
{
    // Return a sample JSON response
    return response()->json([
        'success' => true,
        'message' => 'API is working!',
        'data' => [
            ['id' => 1, 'title' => 'First Post', 'content' => 'This is the first post.'],
            ['id' => 2, 'title' => 'Second Post', 'content' => 'This is the second post.'],
            ['id' => 3, 'title' => 'Third Post', 'content' => 'This is the third post.'],
        ],
    ], 200);

}

}