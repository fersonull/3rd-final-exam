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

    public function session()
    {
        $auth = Session::get("auth");

        Response::json(200, $auth);
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

        if (!$result) {
            return Response::json(404, [
                'errors' => ['email' => 'Email not found']
            ]);
        }

        if (!password_verify($request['password'], $result['password'])) {
            return Response::json(401, [
                'errors' => ['password' => 'Incorrect password']
            ]);
        }

        $token = AuthService::generateToken([
            'user_id' => $result['id'],
            'email' => $result['email'],
            'iat' => time(),
        ]);

        $user = [
            'id' => $result['id'],
            'name' => $result['name'],
            'email' => $result['email'],
        ];

        Session::store('auth', [
            'user' => $user,
            'token' => $token,
        ]);

        return Response::json(200, [
            'success' => true,
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function signup()
    {
        $request = $_POST;

        $validator = Validate::make($request, [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            return Response::json(400, [
                'errors' => $validator->errors()
            ]);
        }

        $result = $this->userModel->findByEmail($request['email']);

        if ($result) {
            return Response::json(409, ["errors" => [
                "email" => "Email already taken"
            ]]);
        }

        $hashedPass = password_hash($request["password"], PASSWORD_DEFAULT);

        $user = [
            "email" => $request["email"],
            "name" => $request["name"],
            "password" => $hashedPass,
        ];

        $result = $this->userModel->create($user);

        return Response::json(201, [
            "success" => true,
            "message" => "Signed up succesfully",
            "user" => $result
        ]);
    }

    public function logout()
    {
        Session::destroy();

        return ["success" => true, "message" => "You've logged out successfuly."];
    }
}
