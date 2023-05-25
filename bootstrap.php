<?php

if(!defined("BASE_PATH")) define("BASE_PATH", __DIR__);
require(BASE_PATH . "/config.php");
require(BASE_PATH . "/vendor/autoload.php");
define("THEME_PATH", BASE_PATH . "/themes");
define("UPLOAD_PATH", BASE_PATH . "/content");


function getThemePath() {
    return THEME_PATH . "/biere-library";
}

function getContentPath() {
    return BASE_PATH . "/sites/biere-library";
}

function getThemeUrl() {
    return "themes/biere-library/";
}

function getContentUrl() {
    return "sites/biere-library/content";
}

function render() {

$themeUrl = getThemeUrl();

    ob_start();
    require getThemePath() . "/body.tpl.php";
    $body = ob_get_contents();
    ob_end_flush();

    ob_start();
    require getThemePath() . "/html.tpl.php";
    $content = ob_get_contents();
    ob_end_flush();

    return $content;
}