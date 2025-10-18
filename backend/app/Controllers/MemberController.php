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
        $request = $_POST;
        
        $validator = Validate::make($request, [
            'user_id' => 'required|string|max:32',
            'project_id' => 'required|string|max:32',
            'role' => 'string|in:admin,member',
        ]);

        if ($validator->fails()) {
            return Response::json(400, [
                'success' => false,
                'errors' => $validator->errors()
            ]);
        }

        $result = $this->memberModel->invite($request);
        
        if ($result['success']) {
            return Response::json(201, $result);
        } else {
            $statusCode = isset($result['error']) && strpos($result['error'], 'already a member') !== false ? 409 : 500;
            return Response::json($statusCode, $result);
        }
    }

    public function all($projectId)
    {
        $members = $this->memberModel->all($projectId);
        Response::json(200, $members);
    }

    public function delete($memberId)
    {
        try {
            $result = $this->memberModel->delete($memberId);
            
            if ($result['success']) {
                return Response::json(200, $result);
            } else {
                return Response::json(500, $result);
            }
        } catch (Exception $e) {
            return Response::json(500, [
                'success' => false,
                'error' => 'Failed to delete member: ' . $e->getMessage()
            ]);
        }
    }
}