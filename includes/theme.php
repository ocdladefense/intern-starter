<?php 



function render($req, $tpl = null, $vars = array()) {

    $themeUrl = getThemeUrl();
    $contentPath = getContentPath();
    // $title = getTitle($route);
    
    extract($vars);

    $route = $req->path;
    $tpl = $tpl ?? $route;
    $page = getThemePath() . "/{$tpl}.tpl.php";
    $not_found = false;
    
    if(!file_exists($page)) {
        $page = getThemePath() . "/page.tpl.php";
        // Assume this means page not found.
        $not_found = true;
    }
    
    ob_start();
    require $page;
    $out = ob_get_contents();
    ob_end_clean();

    return $out;
}




function theme($req, $out = "") {

    $route = $req->path;
    $tpl = $tpl ?? $route;
    $page = getThemePath() . "/{$tpl}.tpl.php";
    $not_found = false;
    
    if(!file_exists($page)) {
        $page = getThemePath() . "/page.tpl.php";
        // Assume this means page not found.
        $not_found = true;
    }

    $themeUrl = getThemeUrl();
    $contentPath = getContentPath();
    $title = getTitle($route);
    $meta = getMetaTags($route);

    
    $meta = null == $meta ? "" : implode("\n", $meta);
    
    $vars = array(
        "route" => $route,
        "not_found" => $not_found,
        "body_class" => $not_found ? "not-found" : $route
    );

    if(function_exists("preprocess")) {
        preprocess($vars);
    }
    
    extract($vars);

    ob_start();
    require getThemePath() . "/footer.tpl.php";
    $footer = ob_get_contents();
    ob_end_clean();

    


    ob_start();
    require getThemePath() . "/body.tpl.php";
    $body = ob_get_contents();
    ob_end_clean();

    ob_start();
    require getThemePath() . "/html.tpl.php";
    $html = ob_get_contents();
    ob_end_clean();

    return $html;
}




/*
function render($req, $tpl = null) {

    $route = $req->path;
    $tpl = $tpl ?? $route;
    $page = getThemePath() . "/{$tpl}.tpl.php";
    $not_found = false;
    
    if(!file_exists($page)) {
        $page = getThemePath() . "/page.tpl.php";
        // Assume this means page not found.
        $not_found = true;
    }

    $themeUrl = getThemeUrl();
    $contentPath = getContentPath();
    $title = getTitle($route);
    
    $vars = array(
        "route" => $route,
        "not_found" => $not_found,
        "body_class" => $not_found ? "not-found" : $route
    );

    if(function_exists("preprocess")) {
        preprocess($vars);
    }
    
    extract($vars);

    ob_start();
    require getThemePath() . "/footer.tpl.php";
    $footer = ob_get_contents();
    ob_end_clean();

    
    ob_start();
    require $page;
    $out = ob_get_contents();
    ob_end_clean();

    ob_start();
    require getThemePath() . "/body.tpl.php";
    $body = ob_get_contents();
    ob_end_clean();

    ob_start();
    require getThemePath() . "/html.tpl.php";
    $html = ob_get_contents();
    ob_end_clean();

    return $html;
}*/