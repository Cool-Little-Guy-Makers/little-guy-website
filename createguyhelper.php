<?php
    require_once("config.php");

    // Get info entered for little guy
    $user = "USERTEMPLATE"; //$_SESSION['user'];
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