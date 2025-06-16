<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

class UserController extends Controller
{
    // ✅ Register a new user
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'viewer', // default role
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'User registered successfully',
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'User registration failed',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    // ✅ Login existing user
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ]);
    }

    // ✅ Logout the user
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Successfully logged out']);
    }

    // 🔜 Google Login (to be implemented)
    public function googleAuth(Request $request)
{
    $token = $request->input('access_token');

    // Fetch Google user profile
    $googleUser = Http::withHeaders([
        'Authorization' => "Bearer $token"
    ])->get('https://www.googleapis.com/oauth2/v2/userinfo');

    if ($googleUser->failed()) {
        return response()->json(['error' => 'Invalid Google token'], 401);
    }

    $data = $googleUser->json();

    // Create or find the user
    $user = User::firstOrCreate(
        ['email' => $data['email']],
        [
            'name' => $data['name'] ?? 'Google User',
            'password' => Hash::make(Str::random(24)),
        ]
    );

    Auth::login($user);

    return response()->json([
        'message' => 'Google login successful',
        'user' => $user
    ]);
}
}
