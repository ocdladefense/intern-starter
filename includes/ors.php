<?php

use SalesForce\RestApiRequest;
use SalesForce\RestApiResponse;
use SalesForce\OAuthRequest;
use Salesforce\OAuthException;
use SalesForce\OAuth;
use Http\Http;
use Http\HttpRequest;





function getOrsUrl($chapter, $section = null, $vol = null){
    $baseUrl = "https://www.oregonlegislature.gov/bills_laws/ors/ors%s.html";

    if($chapter < 1 || $chapter > 838){
        throw new Exception("Invalid Chapter Number");
    }


    if($chapter < 10){
        $chapter = '00'.$chapter;
    }
    elseif($chapter < 100){
        $chapter = '0'.$chapter;
    }
    
    $url = sprintf($baseUrl, $chapter);

    return $url;
}



function send($reqUrl)
{
    //need a number variable as a string from the onclick event to capture
    //desired stature for parsing


    //configuring the request 
    $config = array(
        "returntransfer"         => true,
        "useragent"             => "Mozilla/5.0",
        "followlocation"         => true,
        "ssl_verifyhost"         => false,
        "ssl_verifypeer"         => false
    );

    

    $http = new Http($config);
    $req = new HttpRequest($reqUrl);
    $resp = $http->send($req, true);

    return $resp;
}


function parseResponse($resp){

    //parse the response for the desired html element 
    //$spans =  $resp->getElementByTagName('span');

    //unsure if this will work, but we want to search all the span elements for 
    //the one conaining our desired statute number
    //$statue = $spans->innerHtml->contains($statuteNum);

    return $resp->getBody();

}


// // https://www.php.net/manual/en/function.getopt.php
function getParams() {
    $isCli = PHP_SAPI === "cli";

    $params = $isCli ? array_slice($_SERVER['argv'],1) : array($_GET["chapter"],$_GET["section"]);

    return $params;
}



/*$Api = loadApi();
$result = $Api->query("select id,name from contact limit 25");
var_dump($result);
echo "hello world!";*/


// PHP_SAPI


