<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
     /**
     * @OA\Post(
     ** path="/api/v1/insert_user",
     *  tags={"Auth Api"},
     *  description="use for insert user to database",
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
  public function insertUser(Request $request){
    if($request!=null){
    $name= $request->input('name');
    $email=$request->input('email');
    $password=$request->input('password');
      User::query()->create([
          'name'=> $name,
          'email'=>$email,
          'password'=>$password
      ]);

    return Response()->json([
        'result'=>true,
        'message'=>"user have inserted",
        'data'=>[
            'name'=>$name,
            'email'=>$email,
            'password'=>$password
        ]
        ],200);
    }else{
        return Response()->json([
            'result'=>false,
            'message'=>"access denied",
            'data'=>[
            ]
            ],403);
    }

  }
}
