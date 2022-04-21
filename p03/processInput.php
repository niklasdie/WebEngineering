<?php
require './mustache.php-2.14.1/src/Mustache/Autoloader.php';
Mustache_Autoloader::register();

if ($_GET) {
    $request = $_GET;
} else {
    $request = $_POST;
}

if (!filter_input(INPUT_POST, "mail", FILTER_VALIDATE_EMAIL) === true) {
    $request['mail'] = "E-Mail invalid!";
    error_reporting(E_WARNING);
    ini_set('display_errors', 'On');
}

if (!filter_input(INPUT_POST, "status", FILTER_SANITIZE_FULL_SPECIAL_CHARS) === true) { // Klappt irgendwie nicht
    $request['status'] = "Status invalid!";
}

$template = file_get_contents("./templates/beispiel.tpl.html");
$mustache = new Mustache_Engine();
echo $mustache->render($template, array(
    'title' => "WebEng-PHP",
    'mail' => $request['mail'],
    'password' => $request['password'],
    'status' => $request['status'],
    'lastVisit' => $_COOKIE["lastVisit"]
));

setcookie("lastVisit", date("H:i:s"));

//print_r($_GET);
//print_r($_POST);
?>
