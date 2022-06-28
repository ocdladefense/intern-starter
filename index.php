

<?php
include "vendor/autoload.php";
include "sample.php";

$Api = loadApi();
$result = $Api->query("select id,name from contact limit 25");
var_dump($result);
echo "hello world!";
?>