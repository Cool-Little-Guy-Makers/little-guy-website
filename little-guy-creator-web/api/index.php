<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');
header('Access-Control-Allow-Credentials: true');

require __DIR__ . "/inc/bootstrap.php";
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );
if ((isset($uri[4]) && $uri[4] != 'user' && $uri[4] != 'guy') || !isset($uri[5])) {
    header("HTTP/1.1 402 Not Found");
    exit();
}
require PROJECT_ROOT_PATH . "/Controller/Api/LittleGuyController.php";
$objFeedController = new LittleGuyController();

if ($uri[4] == 'guy') {
    $strMethodName = $uri[5] . 'Guys';
    $objFeedController->{$strMethodName}();
}
else {
    $strMethodName = $uri[5] . 'User';
}
$objFeedController->{$strMethodName}();

?>