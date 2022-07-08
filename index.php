

<?php
error_reporting(E_ALL & ~E_NOTICE);
header("Content-Type: text/html; charset=windows-1252");
include "vendor/autoload.php";
include "api.php";
include "ors.php";






list($chapter, $section) = getParams();


$url = getOrsUrl($chapter);

$resp = send($url);
$statute = parseResponse($resp);


echo $statute;
