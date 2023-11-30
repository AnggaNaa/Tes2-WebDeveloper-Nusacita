<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;
use Tymon\JWTAuth\Facades\JWTAuth;


class UserController extends Controller
{
    public function signIn(Request $request)
    {
        try {
            $credentials = $request->only('email', 'password');

            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $user = Auth::user();

            $userData = User::find($user->id);

            $customClaims = ['user' => $userData];

            $token = JWTAuth::claims($customClaims)->attempt($credentials);

            return $this->respondWithToken($token);
        } catch (\Throwable $th) {
            return 'Error Signin in: ' . $th->getMessage();
        }
    }

    public function signUp(Request $request)
    {
        try {
            $uuid = Uuid::uuid4()->toString();

            $validatedData = $request->validate([
                'username' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8',
            ]);

            $password = Hash::make($validatedData['password']);

            $data = [
                'id' => $uuid,
                'email' => $validatedData['email'],
                'username' => $validatedData['username'],
                'password' => $password,

            ];

            User::create($data);

            if (!$token = JWTAuth::attempt($validatedData)) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Get the authenticated user
            $user = Auth::user();

            // Add custom claims to the token payload
            $customClaims = ['user' => $user];

            // Extend the token with custom claims
            $token = JWTAuth::claims($customClaims)->attempt($validatedData);

            return $this->respondWithToken($token);
        } catch (\Throwable $th) {
            return response()->json([
                 $th->getMessage()], 500);

        }
    }

    protected function respondWithToken($token)
    {
        // Retrieve the authenticated user
        $user = Auth::user();

        // Add any additional user data you want to include in the response
        $userData = [
            'id' => $user->id,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->role,
            // Add more fields as needed
        ];

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => $userData, // Include additional user data in the response
        ]);
    }

    public function getUsers() {
        try{
            $users = User::all();
            return $users;
        } catch (\Throwable $th) {
            return response()->json([
                 $th->getMessage()], 500);
        }
    }

    public function getDetailUser($id) {
        try{
            $user = User::find($id);
            return $user;
        } catch (\Throwable $th) {
            return response()->json([
                 $th->getMessage()], 500);
        }
    }

    public function update(Request $request, $id) {
    try{
        $user = User::find($id);
        $user->update($request->all());
        return $user;
    } catch (\Throwable $th) {
        return response()->json([
             $th->getMessage()], 500);
    }
    }

    public function delete($id) {
        try{
            $user = User::find($id);
            $user->delete();
            return $user;
        } catch (\Throwable $th) {
            return response()->json([
                 $th->getMessage()], 500);
        }
    }
}