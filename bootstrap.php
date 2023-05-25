<?php

if(!defined("BASE_PATH")) define("BASE_PATH", __DIR__);
require(BASE_PATH . "/config.php");
require(BASE_PATH . "/vendor/autoload.php");
define("THEME_PATH", BASE_PATH . "/themes");
define("UPLOAD_PATH", BASE_PATH . "/content");


function getSite() {
    global $hostdata;
    $host = $_GET["host"] ?? $_SERVER["HTTP_HOST"];
    return $hostdata[$host];
}


function getThemePath() {
    $site = getSite();
    return THEME_PATH . "/" . $site["theme"];
}

function getContentPath() {
    $site = getSite();
    return BASE_PATH . "/sites/" . $site["theme"];
}

function getThemeUrl() {
    $site = getSite();
    return "themes/" . $site["theme"];
}

function getContentUrl() {
    $site = getSite();
    return "sites/" . $site["theme"];
}

function render() {

    $requestUri = $_SERVER["REQUEST_URI"];
    $requestPath = explode("?",$requestUri)[0];
    $basePath = substr($_SERVER["SCRIPT_NAME"],0,strlen($_SERVER["SCRIPT_NAME"])-9);
    $length = strlen($basePath);
    $request = substr($requestPath,$length);
    // var_dump($requestPath,$basePath,$request);exit;


    $themeUrl = getThemeUrl();
    $contentPath = getContentPath();

    ob_start();
    require getThemePath() . "/body.tpl.php";
    $body = ob_get_contents();
    ob_end_clean();

    ob_start();
    require getThemePath() . "/html.tpl.php";
    $content = ob_get_contents();
    ob_end_clean();

    return $content;
}