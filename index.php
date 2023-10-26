<?php
require "bootstrap.php";



loadEnv();

// $route = getRoute();
// $out = render($route);
$req = getRequest();

$default_callback = function($req) {
    return render($req);
};


$router = new Router();
$router->addRoute(new WildCardRoute($default_callback));
$route = $router->getRouteMatchingRequest($req);
$callback = $route->getCallback();


$out = call_user_func("render",$req->path);

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
print $out;


