<?php
    include "config.php";
    $username = $_POST['username'];
    $password = $_POST['password'];
    $sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    $stmt = mysqli_prepare($db, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $username, $password);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $num = mysqli_fetch_array($result);

    if ($num > 0) {

        session_start();

        $_SESSION['user'] = $username;
        $_SESSION['loggedin'] = true;

        echo "Now logged in as $username!";
        echo "
            <form action='home.php' method='post'>
            <input type='submit' value='take me to the little guys.'>
            </form>";
    }
    else {
        echo "Wrong. stupod.";
    }
?>