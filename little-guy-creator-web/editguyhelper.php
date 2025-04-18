<?php
    /*
    editguyhelper.php: Directed here from editor.php. Function: takes the features specified in 
    the editor and updates the same little guy to have those features in the database, and then 
    redirects to home.php.
    */

    require_once("config.php");

    $sign_in_page = "signin.php";

    // Continue session
    session_start();

    // Current user credentials
    $user = $_SESSION["user"];
    $logged_in = $_SESSION["loggedin"];
    
    if (!isset($logged_in)) {
        header("location: " . $sign_in_page);
    }

    // Get info on little guy to change
    $guyname = $_POST['name'];
    $guyvariant = $_POST['variant'];
    $guyid = $_POST['littleguyid'];

    // Create statement to find and update that guy
    $sql = "UPDATE `little-guys` SET name = ?, variant = ? WHERE id = ? AND username = ?;";
    $stmt = mysqli_prepare($db,$sql);
    mysqli_stmt_bind_param($stmt,"siis", $guyname, $guyvariant, $guyid, $user);
    mysqli_stmt_execute($stmt);

    // Redirect to the home page
    header("location: home.php");
?>