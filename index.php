<?php
require "bootstrap.php";


$host = $_GET["host"] ?? $_SERVER["HTTP_HOST"];


$requestUri = $_SERVER["REQUEST_URI"];
$requestPath = explode("?",$requestUri)[0];
$basePath = $_SERVER["SCRIPT_NAME"];
$length = strlen($basePath);
$request = substr($requestPath,$length);
// var_dump($requestPath,$basePath,$request);exit;




print render();