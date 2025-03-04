<!DOCTYPE html>
<html>
    <head></head>
    <body>

        <?php
        
            require_once("config.php");


            $username = $_SESSION["username"];
            $logged_in = 1;//$_SESSION["loggedin"];
            $sign_in_page = "index.html";

            if (!isset($logged_in)) {
                header("location: " . $sign_in_page);
            }

        ?>

        hello

    </body>
</html>