<?php
class Router
{
    private static $routes = [
        'GET' => [],
        'POST' => [],
    ];

    public static function get($path, $callback)
    {
        self::addRoute('GET', $path, $callback);
    }

    public static function post($path, $callback)
    {
        self::addRoute('POST', $path, $callback);
    }

    private static function addRoute($method, $path, $callback)
    {
        $regex = preg_replace('/\{([^}]+)\}/', '([^/]+)', $path);
        $regex = "#^" . $regex . "$#";

        self::$routes[$method][] = [
            'regex'    => $regex,
            'callback' => $callback,
        ];
    }

    public static function dispatch()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $path   = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        foreach (self::$routes[$method] as $route) {
            if (preg_match($route['regex'], $path, $matches)) {
                array_shift($matches); // drop full match
                $callback = $route['callback'];

                // Case 1: Closure
                if (is_callable($callback)) {
                    return call_user_func_array($callback, $matches);
                }

                // Case 2: "Controller@method" string
                if (is_string($callback) && strpos($callback, '@') !== false) {
                    [$controller, $methodName] = explode('@', $callback);
                    require_once "./app/Controllers/$controller.php";
                    $controllerObj = new $controller();
                    return call_user_func_array([$controllerObj, $methodName], $matches);
                }
            }
        }

        http_response_code(404);
        echo "404 - Page Not Found";
    }
}
