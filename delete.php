<?php
    require_once("config.php");

    $sign_in_page = "index.html"; // change to "sign-in.php" or equivalent

    // Continue session
    session_start();

    // Current user credentials
    $user = "USERTEMPLATE"; // change to $_SESSION["user"]; or equivalent
    $logged_in = 1; // change to $_SESSION["loggedin"]; or equivalent
    
    if (!isset($logged_in)) {
        header("location: " . $sign_in_page);
    }
    if(!isset($_POST["littleguyid"])){
        header("location: home.php");
    }

    // Get ID from form in editor
    $guyid = $_POST["littleguyid"];

    // Create statement to find and delete that guy
    $sql = "DELETE FROM `little-guys` WHERE id = ? AND username = ?;";
    $stmt = mysqli_prepare($db,$sql);
    mysqli_stmt_bind_param($stmt,"is", $guyid, $user);
    mysqli_stmt_execute($stmt);
    
    // Redirect to the home page
    header("location: home.php");
?>
