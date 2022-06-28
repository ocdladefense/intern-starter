<?php


use Salesforce\RestApiRequest;
use Salesforce\OAuthRequest;
use Salesforce\RestApiResponse;
use Salesforce\OAuth;

// These are really connected applications
$oauth_config = array(
	"ocdla-sandbox" => array(
		"default" => true,
		"sandbox" => true, // Might be used to determine domain for urls
		"client_id" => "3MVG9Fy_1ZngbXqO6ZyUdcmUe1ZwB2D7S.yI4FRa1f6ZAi29qwAecOQvkCkiQVbfDAi8LLwzOCzz4CrJxVqrm",
		"client_secret" => "BF08B4242E0BB3EA18A13F58E2D176303604A64CCCDD05AAC0F3CE338A145CFA",
		"auth" => array(
			"saml" => array(),
			"oauth" => array(
				"usernamepassword" => array(
					"token_url" => "https://test.salesforce.com/services/oauth2/token",
					"username" => "membernation@ocdla.com.ocdpartial",
					"password" => "asdi49ir4",
					"security_token" => "X76nCkoSRNplskzZ5lOLjwcTN",
					"cache" => "application"
				),
				"webserver" => array(
					"token_url" => "https://ocdpartial-ocdla.cs198.force.com/services/oauth2/token",
					"auth_url" => "https://ocdpartial-ocdla.cs198.force.com/services/oauth2/authorize",
					"redirect_url" => "https://appdev.ocdla.org/oauth/api/request",
					"callback_url" => "https://appdev.ocdla.org/jobs",
					"cache" => "session"
				)
			)
		)
	)
);




function loadApi() {

    $config = get_oauth_config();

    // If a OAuth flow is set on the route get that flow, and get the
    // access token that is stored in at the index of the flow for the connected app.
    // Refresh token does not work with the username password flow.

    //$config = get_oauth_config($value);
    $flow = "usernamepassword";

    $httpMessage = OAuth::start($config, $flow);

    $Resp = $httpMessage->authorize();

    if(!$Resp->isSuccess()) throw new OAuthException($Resp->getErrorMessage());


    // $accessToken = Session::get($config->getName(), $flow, "access_token");
    // $instanceUrl = Session::get($config->getName(), $flow, "instance_url");
    //$instanceUrl = cache_get("instance_url");
    //$accessToken = cache_get("access_token");

    return new RestApiRequest($Resp->getInstanceUrl(), $Resp->getAccessToken());
}



function get_oauth_config($key = null) {

	global $oauth_config;

	if(null == $key || $key == "default") {

		$defaultConfigs = array();

		foreach($oauth_config as $key => $connectedApp) {

			$connectedApp["name"] = $key;

			if($connectedApp["default"]) {

				$defaultConfigs[] = $connectedApp;
			}
		}

        //if(count($defaultConfigs) > 1) throw new Exception("CONFIG_ERROR: Only one connected app can be set to default in you configuration.");
        if(count($defaultConfigs) == 0) throw new Exception("CONFIG_ERROR: No connected app is set to default in your configuration, and no connected app is set on the module.");

        return new Salesforce\OAuthConfig($defaultConfigs[0]);

		
	} else {

		$config = $oauth_config[$key];
		$config["name"] = $key;

		return new Salesforce\OAuthConfig($config);
	}
	
	throw new Exception("HTTP_INIT_ERROR: No default Connected App / Org.  Check your configuration.");
}