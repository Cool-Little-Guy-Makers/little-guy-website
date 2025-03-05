<?php
    require_once("config.php");

    // Get info on little guy to change
    $guyname = $_POST['name'];
    $guyvariant = $_POST['variant'];
    $guyid = $_POST['littleguyid'];

    // Create statement to find and update that guy
    $sql = "UPDATE `little-guys` SET name = ?, variant = ? WHERE id = ?;";
    $stmt = mysqli_prepare($db,$sql);
    mysqli_stmt_bind_param($stmt,"sii", $guyname, $guyvariant, $guyid);
    mysqli_stmt_execute($stmt);

    // Redirect to the home page
    header("location: home.php");
?>