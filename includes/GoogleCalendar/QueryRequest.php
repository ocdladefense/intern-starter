<?php

namespace GoogleCalendar;


use Http\HttpMessage;
use Http\HttpRequest;
use Http\Url;
use \DateTime as DateTime;




/**
 * @class GoogleCalendar\QueryRequest
 * 
 * This class correctly formats POST parameters
 */
class QueryRequest extends HttpRequest {

    protected $params = array();  



    public function __construct($url) {
        $this->url = $url;

        $today = explode("T",date('c'))[0];
        $this->addParam("timeMin", $today);
    }


    public function setCalendarId($calId) {
        $this->calendarId = $calId;
    }


    public function setDate($date) {
        $this->addParam("timeMin", $date);
    }


    public function setRange($days) {
        $range = "+".$days." day";
        $today = explode("T",date('c'))[0];
        $todayDay = date('l');
        $timeMax = (new DateTime($today))->modify($range);
        $end = explode("T",date_format($timeMax,'c'))[0];

        $this->addParam("timeMax", $end);
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


    public function end() {

    }

    public function limit() {


    }
}