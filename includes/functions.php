<?php



function getSite() {
    global $hostdata;
    $host = $_GET["host"] ?? $_SERVER["HTTP_HOST"];

    return $hostdata[$host] ?? $hostdata["default"];
}



function getTitle($route = null) {

    global $meta;
    
    $NO_TITLE = "";
    $DEFAULT_TITLE = "The Bière Library";

    if(null == $route) {
        return $NO_TITLE;
    }


    if(!isset($meta[$route])) {
        return $NO_TITLE;
    }

    return $meta[$route]["title"] ?? $DEFAULT_TITLE;
}


function getMetaTags($route = null) {

    global $meta;
    
    $NO_META = null;

    if(null == $route) {
        return $NO_META;
    }


    if(!isset($meta[$route]) || !isset($meta[$route]["meta"])) {
        return $NO_META;
    }

    return array_map(function($tag) { return Html\HtmlMeta($tag); }, $meta[$route]["meta"]);
}




function getGaProperyId() {
    global $ga_property_id;

    return $ga_property_id;
}



function getSitePath() {

    global $hostdata;

    $site = getSite();
    $host = $_GET["host"] ?? $_SERVER["HTTP_HOST"];
    $host = isset($hostdata[$host]) ? $host : "default";

    return BASE_PATH . "/sites/" . $host;
}


function getThemePath() {
    $site = getSite();
    return THEME_PATH . "/" . $site["theme"];
}

function getContentPath() {
    $host = $_GET["host"] ?? $_SERVER["HTTP_HOST"];
    return BASE_PATH . "/sites/" . $host;
}

function getThemeUrl() {
    $site = getSite();
    return "/themes/" . $site["theme"];
}

function getContentUrl() {
    $host = $_GET["host"] ?? $_SERVER["HTTP_HOST"];
    return "/sites/" . $host;
}

// This function is deprecated.
function loadEnv() {
    $configPath = getSitePath() . "/config.php";
    $funcPath = getSitePath() . "/functions.php";
  
    if(true || file_exists($configPath)) {
        require($configPath);
    }

    if(true || file_exists($funcPath)) {
        require($funcPath);
    }
}


// A wildcard route.
function getRequest() {
    $requestUri = $_SERVER["REQUEST_URI"];


    $requestPath = explode("?",$requestUri)[0];
    $basePath = substr($_SERVER["SCRIPT_NAME"],0,strlen($_SERVER["SCRIPT_NAME"])-9);
    $length = strlen($basePath);
    $path = substr($requestPath,$length);

    $req = new stdClass();
    $req->path = $path;

    return $req;
}


function getRoute() {
    $requestUri = $_SERVER["REQUEST_URI"];


    $requestPath = explode("?",$requestUri)[0];
    $basePath = substr($_SERVER["SCRIPT_NAME"],0,strlen($_SERVER["SCRIPT_NAME"])-9);
    $length = strlen($basePath);
    $route = substr($requestPath,$length);

    return $route;
}



