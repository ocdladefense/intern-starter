<?php
require "bootstrap.php";



$req = getRequest();

$default_callback = function($req) {
    return render($req);
};


$event_callback = function($req) {
    // var_dump($req);exit;
    $params = explode("/", $req->path);
    $date = $params[1];
    $name = $params[2];
    $name = preg_replace("/[\s\:\(\)\-]+/mis", " ", $name);
    $name = preg_replace("/[\!\']+/mis", "", $name);
    $vars = array("date" => $date, "event" => $name);
    return render($req, "event-details", $vars);
};

$dummy_callback = function($req) {
    return "This is the event callback.";
};


$router = new Router();
$router->addRoute(new WildcardRoute($default_callback));
$router->addRoute(new Route("event/%date/%name", $event_callback));
$route = $router->getMatchingRoute($req->path);

if($route === false) {
    print "No route found.";
}


$callback = $route->getCallback();


$out = call_user_func($callback, $req);


$themed = theme($req, $out);



header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
print $themed;


