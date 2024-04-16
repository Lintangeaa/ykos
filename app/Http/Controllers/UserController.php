<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function getAll(Request $request): Response 
    {
        $users = User::all();    
        return Inertia::render('User/All', [
            'users' => new UserCollection($users)
        ]);
    }
    

    public function create(): Response  {
        return Inertia::render('User/Create');
    }

    public function store(CreateUserRequest $request): RedirectResponse {
        $data = $request->validated();
    
        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role' => $data['role'], // Assuming 'role' is part of the validated data
        ]);
    
        return Redirect::to('/users')->with('success', 'User created successfully.');
    }
    
    public function update(Request $request, $id) {
        $user = User::findOrFail($id);
    
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'password' => 'nullable|string|min:8',
            'role' => ['required', 'string', 'max:255', Rule::in(['siswa', 'guru', 'admin'])],
            // Add other fields validation as needed
        ]);
    
        $data = $request->only(['name', 'email', 'role']);
    
        if ($request->has('password')) {
            $data['password'] = bcrypt($request->password);
        }
    
        $user->update($data);
    
        return Redirect::to('/users')->with('success', 'User updated successfully.');
    }
    
    public function edit($id): Response  {
        $user = User::findOrFail($id);
        return Inertia::render('User/Edit', [
            'user' => $user
        ]);
    }

    public function delete($id): RedirectResponse {
        $user = User::findOrFail($id);
        $user->delete();
        return Redirect::to('/users');
    }
}
