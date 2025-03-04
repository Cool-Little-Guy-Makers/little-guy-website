<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!--
            The description is a tag for displaying a summary (155-160 characters) 
            describing the content of a web page, e.g., for search engines to show 
            in search results.
        -->
        <meta name="description" 
        content="The Little Guy Website is the website users use to make Little Guys, socialize with friends, design fun characters, and have a great time." /> 
        <title>Little Guy Creator</title>
        <link rel="icon" type="image/x-icon" href="favicon.ico">
    </head>
    <body>

        <?php
            // Base page top functionality: config SQL, verify if logged in, etc.

            require_once("config.php");

            $sign_in_page = "index.html"; // change to "sign-in.php" or equivalent

            // Continue session
            session_start();

            // Current user credentials
            $user = "USERTEMPLATE"; // change to $_SESSION["user"]; or equivalent
            $logged_in = 1; // change to $_SESSION["loggedin"]; or equivalent

            // Prevent access to home page if not signed in
            if (!isset($logged_in)) {
                header("location: " . $sign_in_page);
            }

            echo "You are logged in as user: " . $user;

        ?>
        <br>
        <a href="logout.php">Log Out</a>
        <br>


        <h1>Little Guy Creator</h1>
        <h2>New Little Guy!</h2>
        <form action="createguyhelper.php" method="post">
            <div>
                <label>Name: </label>
                <input type="text" name="name">
            </div>
            <br>
            <div>
                <label>Style: </label>
                <input type="radio" name="variant" value="0">Blue and Pink</input>
                <input type="radio" name="variant" value="1">Purple and Yellow</input>
                <input type="radio" name="variant" value="2">Green</input>
            </div>
            <br>
            <input type="submit" value="Submit">
        </form>
    </body>
</html>

