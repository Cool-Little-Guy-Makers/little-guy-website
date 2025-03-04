<!DOCTYPE html>
<html>
    <head></head>
    <body>

        <?php
            // Base page top functionality: config SQL, verify if logged in, etc.

            require_once("config.php");

            $sign_in_page = "index.html"; // change to "sign-in.php" or equivalent

            // Current user credentials
            $username = "USERTEMPLATE"; // change to $_SESSION["username"]; or equivalent
            $logged_in = 1; // change to $_SESSION["loggedin"]; or equivalent
            
            // Prevent access to home page if not signed in
            if (!isset($logged_in)) {
                header("location: " . $sign_in_page);
            }

            echo "You are logged in as user: " . $username;
        ?>

        <br>

        <a href="logout.php">Log Out</a>

        <br>

    </body>
</html>