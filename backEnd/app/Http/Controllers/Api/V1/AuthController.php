<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
  /**
   * @OA\Post(
   ** path="/api/v1/register_user",
   *  tags={"Auth Api"},
   *  description="use for register user to database",
   * @OA\RequestBody(
   *    required=true,
   * *         @OA\MediaType(
   *           mediaType="multipart/form-data",
   *           @OA\Schema(
   *           @OA\Property(
   *                  property="name",
   *                  description="Enter your name",
   *                  type="string",),
   *           @OA\Property(
   *                  property="email",
   *                  description="Enter your email",
   *                  type="string",),
   *           @OA\Property(
   *                  property="password",
   *                  description="Enter your password",
   *                  type="string",
   *               ),
   *     )
   *   )
   * ),
   *   @OA\Response(
   *      response=200,
   *      description="Its Ok",
   *      @OA\MediaType(
   *           mediaType="application/json",
   *      )
   *   )
   *)
   **/
  public function RegisterUser(Request $request)
  {
    if ($request != null) {
      $name = $request->input('name');
      $email = $request->input('email');
      $password = $request->input('password');
      User::query()->create([
        'name' => $name,
        'email' => $email,
        'password' => $password
      ]);

      return Response()->json([
        'result' => true,
        'message' => "user have inserted",
        'data' => [
          'name' => $name,
          'email' => $email,
          'password' => $password
        ]
      ], 200);
    } else {
      return Response()->json([
        'result' => false,
        'message' => "access denied",
        'data' => []
      ], 403);
    }
  }
  /**
   * @OA\Post(
   ** path="/api/v1/login_user",
   *  tags={"Auth Api"},
   *  description="use for login user ",
   * @OA\RequestBody(
   *    required=true,
   * *         @OA\MediaType(
   *           mediaType="multipart/form-data",
   *           @OA\Schema(
   *           @OA\Property(
   *                  property="email",
   *                  description="Enter your email",
   *                  type="string",),
   *           @OA\Property(
   *                  property="password",
   *                  description="Enter your password",
   *                  type="string",),
   *     )
   *   )
   * ),
   *   @OA\Response(
   *      response=200,
   *      description="Its Ok",
   *      @OA\MediaType(
   *           mediaType="application/json",
   *      )
   *   )
   *)
   **/
  public function LoginUser(Request $request)
  {
    $credentials = $request->validate([
      'email' => 'required|email',
      'password' => 'required',
    ]);
    if (Auth::attempt($credentials)) {
      $user = Auth::user();
      $token = $user->createToken('AuthToken')->plainTextToken;
      return response()->json([
        'result'=>true,
        'message' => 'Login successful',
        'data'=>[
          'token' => $token,
        ]
      ], 200);
    } else {
      return response()->json([
        'message' => 'Invalid credentials'
      ], 401);
    }
  }
}
