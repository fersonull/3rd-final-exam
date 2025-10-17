<?php

require_once "./app/Models/User.php";
require_once "./app/Support/Response.php";

class UserController
{
    protected ?User $userModel;

    public function __construct()
    {
        $this->userModel = new User;
    }

    public function index()
    {
        $data = $this->userModel->all();

        return Response::json(
            $data ? 200 : 404,
            $data ? ['data' => $data] : ['error' => "Could not find any users"]
        );
    }

    public function findById($id)
    {
        $data = $this->userModel->find($id);

        return Response::json(
            $data ? 200 : 404,
            $data ? ['data' => $data] : ['error' => "User with ID $id not found"]
        );
    }

    public function search()
    {
        $query = $_GET['q'] ?? '';
        
        if (empty($query)) {
            return Response::json(400, [
                'error' => 'Search query is required'
            ]);
        }

        $users = $this->userModel->search($query);

        return Response::json(200, [
            'success' => true,
            'data' => $users ?: []
        ]);
    }
}
