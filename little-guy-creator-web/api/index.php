<?php
require __DIR__ . "/inc/bootstrap.php";
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );
if ((isset($uri[5]) && $uri[5] != 'user' && $uri[5] != 'guy') || !isset($uri[6])) {
    header("HTTP/1.1 402 Not Found");
    exit();
}
require PROJECT_ROOT_PATH . "/Controller/Api/LittleGuyController.php";
$objFeedController = new LittleGuyController();

if ($uri[5] == 'guy') {
    $strMethodName = $uri[6] . 'Guys';
}
else {
    $strMethodName = $uri[6] . 'Action';
}
$objFeedController->{$strMethodName}();

?>