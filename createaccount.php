<?php
/* 
Prevent registration:
- passwords don't match
- already signed in
- username exists
- no username/password
*/

    require_once("config.php");
    session_start();

    $username = $_POST['username'];
    $password = $_POST['password'];
    $passwordconf = $_POST['passwordconf'];

    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = mysqli_prepare($db, $sql);
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $num = mysqli_fetch_array($result);

    if ($num > 0) {
        $_SESSION['signuperror'] = 'user';
        header("location:" . "registration.php");
    }
    else if (($password != $passwordconf)) {
        $_SESSION['signuperror'] = 'pass';
        header("location:" . "registration.php");
    }
    else {
        $_SESSION['signuperror'] = 'none';

        $sql = "INSERT INTO `users` VALUES (?,?); ";
        $stmt = mysqli_prepare($db,$sql);
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        mysqli_stmt_bind_param($stmt,"ss", $username, $hashed_password);
        mysqli_stmt_execute($stmt);

        $_SESSION['user'] = $username;
        $_SESSION["loggedin"] = true;

        echo "Registration success! Now logged in as $username.";
        echo "
            <form action='home.php' method='post'>
            <input type='submit' value='Take me to the little guys.'>
            </form>";    
    }
    
?>