<?php
    // Log Out functionality
    
    $logout_page = "index.html"; // Page to go to after logging out

    $_SESSION = array();
    session_destroy();

    header("location:" . $logout_page);
?>