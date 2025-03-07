<?php
    /*
    createguyhelper.php: Directed here from creator.php. Function: takes the features specified in 
    the creator and adds a little guy with those features to the database, and then redirects to 
    home.php.
    */
    
    require_once("config.php");
    session_start();

    $user = $_SESSION['user'];
    $guyname = $_POST['name'];
    $guyvariant = $_POST['variant'];

    // Insert the little guy into the database
    $sql = "INSERT INTO `little-guys` (username,name,variant) VALUES (?,?,?); ";
    $stmt = mysqli_prepare($db,$sql);
    mysqli_stmt_bind_param($stmt,"ssi", $user, $guyname, $guyvariant);
    mysqli_stmt_execute($stmt);

    // Redirect to home page
    header("location: home.php");
?>