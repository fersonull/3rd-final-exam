<?php

class Session
{
    public static function start(): void
    {
        if (PHP_SESSION_NONE === 0) {
            session_start();
        }
    }

    public static function store(string $key, array $value): array
    {
        self::start();

        return $_SESSION[$key] = $value;
    }

    public static function get(string $key): array
    {
        self::start();

        return $_SESSION[$key];
    }

    public function destroy(string $key): void
    {
        self::start();

        $_SESSION[$key] = null;
    }
}
