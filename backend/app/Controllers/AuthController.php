<?php

require_once "./app/Models/User.php";
require_once "./app/Services/AuthService.php";
require_once "./app/Core/Session.php";
require_once "./app/Support/Response.php";
require_once "./app/Support/Validate.php";

class AuthController
{
    private ?User $userModel;

    public function __construct()
    {
        $this->userModel = new User;
    }

    public function login()
    {
        $request = $_POST;

        $validator = Validate::make($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return Response::json(400, [
                'errors' => $validator->errors()
            ]);
        }

        $result = $this->userModel->findByEmail($request['email']);

        $passwordMatched = password_verify($request['password'], $result['password']);

        if (!$passwordMatched) {
            return Response::json(400, [
                'errors' => ['password' => 'Incorrect password']
            ]);
        }

        $token = AuthService::generateToken([
            'user_id' => $result['id'],
            'email' => $result['email'],
            'iat' => time()
        ]);

        Session::store('auth', [
            'token' => $token,
        ]);

        Response::json(200, $token);
    }
}
