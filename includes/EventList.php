<?php

class EventList {


    
    /*
    // The unique event id for this event.
    $event->id;

    // public 'kind' => string 'calendar#event
    $event->kind;

    // The location for the event.
    $event->location;

    // Not sure what this is.
    $event->recurringEventId;

    // Name of the event.
    $event->summary;
    */

    private $events; 

    public function __construct($events) {

        $this->events = $events;
    }


    public function getEvents($limit = null) {
        return null == $limit ? $this->events : array_slice($this->events,0,$limit);
    }


    public function add(EventList $list) {
        $this->events = array_merge($this->events, $list->getEvents());
    }

    public function filter($attr, $query) {

        $events = array_filter($this->events, function($event) use($attr,$query)  {
            return stripos($event->{$attr}, $query) !== false;
        });

        return new EventList($events);
    }

    public function promote($attr, $query) {

        $promoted = array_filter($this->events, function($event) use($attr,$query)  {
            return stripos($event->{$attr}, $query) !== false;
        });

        return new EventList(array_merge($promoted, $this->events));
    }


    public function filterOut($attr, $query) {

        $events = array_filter($this->events, function($event) use($attr,$query)  {
            return stripos($event->{$attr}, $query) === false;
        });

        return new EventList($events);
    }


}