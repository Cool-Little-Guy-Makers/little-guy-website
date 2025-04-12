<?php
require __DIR__ . "/inc/bootstrap.php";
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );
if ((isset($uri[3]) && $uri[3] != 'user' && $uri[3] != 'guy') || !isset($uri[4])) {
    header("HTTP/1.1 402 Not Found");
    exit();
}
require PROJECT_ROOT_PATH . "/Controller/Api/LittleGuyController.php";
$objFeedController = new LittleGuyController();

if ($uri[3] == 'guy') {
    $strMethodName = $uri[4] . 'Guys';
    $objFeedController->{$strMethodName}();
}
else {
    $strMethodName = $uri[4] . 'User';
}
$objFeedController->{$strMethodName}();

?>