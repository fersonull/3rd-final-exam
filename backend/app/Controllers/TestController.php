<?php

require_once "./app/Core/Session.php";
require_once "./app/Support/Response.php";

class TestController
{
    public function index()
    {
        echo "Hello World!";
    }

    public function get($id, $historyID)
    {
        Response::json(200, ["test id" => $id, "history id" => $historyID]);
    }

    public function pageParams()
    {
        Response::json(200, $_GET);
    }

    public function getToken()
    {
        $auth = Session::get("auth");

        Response::json(200, $auth);
    }
}
