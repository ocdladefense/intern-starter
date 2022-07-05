<?php
error_reporting(E_ERROR | E_WARNING | E_PARSE);
var_dump($_SERVER['argv']);
//exit;
include "vendor/autoload.php";
//include "sample.php";
include "response.php";

/*$Api = loadApi();
$result = $Api->query("select id,name from contact limit 25");
var_dump($result);
echo "hello world!";*/
$chapter = $_SERVER['argv'][1];
$url = getOrsUrl($chapter);
$resp = send($url);
$statute = parseResponse($resp);

echo $statute;

?>