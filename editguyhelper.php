<?php
    require_once("config.php");

    $guyname = $_POST['name'];
    $guyvariant = $_POST['variant'];
    $guyid = $_POST['littleguyid'];

    $sql = "UPDATE `little-guys` SET name = ?, variant = ? WHERE id = ?;";
    $stmt = mysqli_prepare($db,$sql);
    mysqli_stmt_bind_param($stmt,"sii", $guyname, $guyvariant, $guyid);
    mysqli_stmt_execute($stmt);

    header("location: home.php");
?>