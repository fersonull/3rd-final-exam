<?php
require_once "../../config/cors.php";
require_once "../../app/Support/Response.php";
require_once "../../app/Support/Session.php";

$data = [
    "success" => true,
    "message" => "Signup success",
];

Response::json(200, $data);
