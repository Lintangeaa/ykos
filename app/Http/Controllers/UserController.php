<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function getAll(Request $request): Response 
    {
        $users = User::all();    
        return Inertia::render('User/All', [
            'users' => $users
        ]);
    }
    

    public function create(): Response  {
        return Inertia::render('User/Create');
    }
    
    public function edit(): Response  {
        return Inertia::render('User/Edit');
    }

    public function delete($id): RedirectResponse {
        $user = User::findOrFail($id);
        $user->delete();
        return Redirect::to('/users');
    }
}
