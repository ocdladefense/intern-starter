<?php

if(!defined("BASE_PATH")) define("BASE_PATH", __DIR__);
require(BASE_PATH . "/vendor/autoload.php");
define("THEME_PATH", BASE_PATH . "/themes");
define("UPLOAD_PATH", BASE_PATH . "/content");

require BASE_PATH . "/sites/sites.php";

function getSite() {
    global $hostdata;
    $host = $_GET["host"] ?? $_SERVER["HTTP_HOST"];
    return $hostdata[$host];
}


function getSitePath() {
    $site = getSite();
    $host = $_GET["host"] ?? $_SERVER["HTTP_HOST"];
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
    return "themes/" . $site["theme"];
}

function getContentUrl() {
    $host = $_GET["host"] ?? $_SERVER["HTTP_HOST"];
    return "sites/" . $host;
}


function loadEnv() {
    $configPath = getSitePath() . "/config.php";
    require($configPath);
}


function getRoute() {
    $requestUri = $_SERVER["REQUEST_URI"];
    $requestPath = explode("?",$requestUri)[0];
    $basePath = substr($_SERVER["SCRIPT_NAME"],0,strlen($_SERVER["SCRIPT_NAME"])-9);
    $length = strlen($basePath);
    $route = substr($requestPath,$length);

    return $route;
}


function render($route) {


    // var_dump($requestPath,$basePath,$route);exit;

    $out = getThemePath() . "/{$route}.tpl.php";

    $themeUrl = getThemeUrl();
    $contentPath = getContentPath();

    
    $vars = array();

    if(function_exists("preprocess")) {
        preprocess($vars);
    }
    
    extract($vars);

    ob_start();
    require getThemePath() . "/footer.tpl.php";
    $footer = ob_get_contents();
    ob_end_clean();


    ob_start();
    require getThemePath() . "/body.tpl.php";
    $body = ob_get_contents();
    ob_end_clean();

    ob_start();
    require getThemePath() . "/html.tpl.php";
    $html = ob_get_contents();
    ob_end_clean();

    return $html;
}