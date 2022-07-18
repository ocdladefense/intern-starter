<?php


use Salesforce\RestApiRequest;
use Salesforce\OAuthRequest;
use Salesforce\RestApiResponse;
use Salesforce\OAuth;
use Http\Http;
use Http\HttpRequest;





function loadApi()
{

    $config = get_oauth_config();

    // If a OAuth flow is set on the route get that flow, and get the
    // access token that is stored in at the index of the flow for the connected app.
    // Refresh token does not work with the username password flow.

    //$config = get_oauth_config($value);
    $flow = "usernamepassword";

    $httpMessage = OAuth::start($config, $flow);

    $Resp = $httpMessage->authorize();

    if (!$Resp->isSuccess()) throw new OAuthException($Resp->getErrorMessage());


    // $accessToken = Session::get($config->getName(), $flow, "access_token");
    // $instanceUrl = Session::get($config->getName(), $flow, "instance_url");
    //$instanceUrl = cache_get("instance_url");
    //$accessToken = cache_get("access_token");

    return new RestApiRequest($Resp->getInstanceUrl(), $Resp->getAccessToken());
}



function get_oauth_config($key = null)
{

    global $oauth_config;

    if (null == $key || $key == "default") {

        $defaultConfigs = array();

        foreach ($oauth_config as $key => $connectedApp) {

            $connectedApp["name"] = $key;

            if ($connectedApp["default"]) {

                $defaultConfigs[] = $connectedApp;
            }
        }

        //if(count($defaultConfigs) > 1) throw new Exception("CONFIG_ERROR: Only one connected app can be set to default in you configuration.");
        if (count($defaultConfigs) == 0) throw new Exception("CONFIG_ERROR: No connected app is set to default in your configuration, and no connected app is set on the module.");

        return new Salesforce\OAuthConfig($defaultConfigs[0]);
    } else {

        $config = $oauth_config[$key];
        $config["name"] = $key;

        return new Salesforce\OAuthConfig($config);
    }

    throw new Exception("HTTP_INIT_ERROR: No default Connected App / Org.  Check your configuration.");
}
