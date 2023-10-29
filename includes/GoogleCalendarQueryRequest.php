<?php
use Http\HttpMessage;
use Http\HttpRequest;

class GoogleCalendarQueryRequest extends HttpRequest {

    protected $params = array();  
    /*
    $today = explode("T",date('c'))[0];
    $todayDay = date('l');
    $timeMax = (new DateTime($today))->modify('+3 day');
    $end = explode("T",date_format($timeMax,'c'))[0];

    $params = isset($params) ? $params : array(
        "timeMin" => $today,
        "timeMax" => $end,
        "maxResults" => 5 // Need to accommodate multiple happy hour entries.
    );
    */
    public function setCalendarId($calId) {
        $this->calendarId = $calId;
    }

    public function setRange($days) {
        $range = "+".$days." day";
        $today = explode("T",date('c'))[0];
        $todayDay = date('l');
        $timeMax = (new DateTime($today))->modify($range);
        $end = explode("T",date_format($timeMax,'c'))[0];

        $this->addParam("timeMax", $end);
    }

    public function __construct($url) {
        $this->url = $url;

        $today = explode("T",date('c'))[0];
        $this->addParam("timeMin", $today);
    }


    public function getUrl() {

        $query = Url::formatParams($this->params);
        $url = sprintf($this->url, $this->calendarId);

        return empty($query) ? $url : ($url . "?" . $query);
    }

    public function start() {


    }

    public function query($query) {
        $this->addParam("q", urlencode($query));
    }


    public function addParam($key, $value = null) {
        $this->params[$key] = $value;
    }

    public function getParams() {
        return $this->params;
    }


    /*
    public function getMockUrl() {
        $url = new Url($this->url);

        $params = array(
            "timeMin" => $today,
            "timeMax" => $end,
            "maxResults" => 30 // Need to accommodate multiple happy hour entries.
        );

        if(count($params) > 0) {
            $url->setParams($params);
        }

        $tmp = $this->url . "?timeMin="
    }*/

    public function end() {

    }

    public function limit() {


    }
}