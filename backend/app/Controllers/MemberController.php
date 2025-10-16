<?php

require_once "./app/Models/Member.php";
require_once "./app/Support/Response.php";
require_once "./app/Support/Validate.php";

class MemberController
{
    private ?Member $memberModel;

    public function __construct()
    {
        $this->memberModel = new Member;
    }

    public function store()
    {
        $validator = Validate::make($request, [
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'role' => 'required|string|in:admin,member',
        ]);

        if ($validator->fails()) {
            return Response::json(400, ['errors' => $validator->errors()]);
        }
    }

    public function all($projectId)
    {
        $members = $this->memberModel->all($projectId);
        Response::json(200, $members);
    }
}