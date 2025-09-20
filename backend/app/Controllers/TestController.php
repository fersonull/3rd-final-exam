<?php

require_once "./app/Support/Response.php";

class TestController
{
    public function index()
    {
        echo "Hello World!";
    }

    public function get($id)
    {
        Response::json(200, ["test id" => $id]);
    }
}
