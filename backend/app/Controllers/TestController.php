<?php

class TestController
{
    public function index()
    {
        echo "Hello World!";
    }

    public function get($id)
    {
        echo "test id: $id";
    }
}
