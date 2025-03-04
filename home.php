<!DOCTYPE html>
<html>
    <head></head>
    <body>

        <?php
            // Base page top functionality: config SQL, verify if logged in, etc.

            require_once("config.php");

            $sign_in_page = "index.html"; // change to "sign-in.php" or equivalent

            session_start();

            // Current user credentials
            $username = "USERTEMPLATE"; // change to $_SESSION["username"]; or equivalent
            $logged_in = 1; // change to $_SESSION["loggedin"]; or equivalent
            
            // Prevent access to home page if not signed in
            if (!isset($logged_in)) {
                header("location: " . $sign_in_page);
            }

            echo "You are logged in as user: " . $username;

            /*if ($_SESSION["boop"] == "me") {
                $_SESSION["boop"] = "Sssandra";
            }

            if ($_SESSION["boop"] == "it's") {
                $_SESSION["boop"] = "me";
            }

            if ($_SESSION["boop"] == "hello") {
                $_SESSION["boop"] = "it's";
            }

            if ($_SESSION["boop"] == "there") {
                $_SESSION["boop"] = "hello";
            }

            if ($_SESSION["boop"] == "hi") {
                $_SESSION["boop"] = "there";
            }

            if (!isset($_SESSION["boop"])) {
                $_SESSION["boop"] = "hi";
            }

            echo "<br>";
            echo $_SESSION["boop"];*/

        ?>

        <br>

        <a href="logout.php">Log Out</a>

        <br>

    </body>
</html>