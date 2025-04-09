<?php
    // Log Out functionality
    
    $logout_page = "index.php"; // Page to go to after logging out

    session_start();

    $_SESSION = array();
    session_destroy();

    header("location:" . $logout_page);
?>