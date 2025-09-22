<?php

require_once "./app/Support/Response.php";

class Model
{
    protected static $db;

    public function __construct()
    {
        if (!self::$db) {
            try {
                $dsn = "mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_DATABASE']};charset=utf8";

                self::$db = new PDO($dsn, $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD']);

                self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            } catch (\PDOException $err) {
                Response::json(500, [
                    'error' => 'Internal server error.',
                    'message' => $err->getMessage()
                ]);
            }
        }
    }

    protected static function db(): PDO
    {
        if (!self::$db) new self();
        return self::$db;
    }
}
