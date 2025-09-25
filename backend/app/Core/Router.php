<?php

require_once "./app/Support/Response.php";

class Router
{
    private static $routes = ['GET' => [], 'POST' => []];

    public static function get($path, $callback, $middleware = [])
    {
        self::addRoute('GET', $path, $callback, $middleware);
    }

    public static function post($path, $callback, $middleware = [])
    {
        self::addRoute('POST', $path, $callback, $middleware);
    }

    private static function addRoute($method, $path, $callback, $middleware)
    {
        $regex = preg_replace('/\{([^}]+)\}/', '([^/]+)', $path);
        $regex = "#^$regex$#";
        self::$routes[$method][] = [
            'regex'      => $regex,
            'callback'   => $callback,
            'middleware' => $middleware,
        ];
    }

    public static function dispatch()
    {
        $method = $_SERVER['REQUEST_METHOD'];

        $path   = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        foreach (self::$routes[$method] as $route) {
            if (preg_match($route['regex'], $path, $matches)) {
                array_shift($matches);
                $callback = $route['callback'];

                // run middleware
                foreach ($route['middleware'] as $mw) {
                    require_once "./app/Middlewares/$mw.php";
                    $mwInstance = new $mw();
                    $result = $mwInstance->handle();
                    if ($result === false) {
                        return; // stop request if middleware blocks it
                    }
                }

                // run controller or closure
                if (is_callable($callback)) {
                    $result = call_user_func_array($callback, $matches);
                } elseif (is_string($callback) && strpos($callback, '@')) {
                    [$controller, $methodName] = explode('@', $callback);
                    require_once "./app/Controllers/$controller.php";
                    $ctrl = new $controller();
                    $result = call_user_func_array([$ctrl, $methodName], $matches);
                }

                if (is_array($result) || is_object($result)) {
                    header('Content-Type: application/json');
                    echo json_encode($result);
                } elseif (is_string($result)) {
                    echo $result;
                }

                return;
            }
        }

        Response::json(404, ["error" => "Route not found"]);
    }
}
