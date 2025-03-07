<?php
    require_once("config.php");

    $sign_in_page = "signin.html";

    // Continue session
    session_start();

    // Current user credentials
    $user = $_SESSION["user"];
    $logged_in = $_SESSION["loggedin"];
    
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
