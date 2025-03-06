<?php
    require_once("config.php");
    session_start();

    $user = $_SESSION['user'];
    $guyname = $_POST['name'];
    $guyvariant = $_POST['variant'];

    $sql = "INSERT INTO `little-guys` (username,name,variant) VALUES (?,?,?); ";
    $stmt = mysqli_prepare($db,$sql);
    mysqli_stmt_bind_param($stmt,"ssi", $user, $guyname, $guyvariant);
    mysqli_stmt_execute($stmt);
?>