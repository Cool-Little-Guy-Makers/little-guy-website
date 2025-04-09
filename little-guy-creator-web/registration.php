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
        <h1>Create an account</h1>

        <form action="createaccount.php" method="post">
            <?php 
            session_start();

            // Already logged in users are sent to home page
            if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == true) {
                header("location: home.php");
            }

            /*if there was a sign in error, set back to false*/
            $_SESSION['signinerror'] = false;

            if (isset($_SESSION['signuperror'])) {
                if ($_SESSION['signuperror'] == "user") {
                    echo "USERNAME ALREADY TAKEN.";
                }
                if (($_SESSION['signuperror'] == "pass")) {
                    echo "PASSWORDS DO NOT MATCH.";
                }
                if (($_SESSION['signuperror'] == "password_length")) {
                    echo "PASSWORD MUST BE 10 OR MORE CHARACTERS.";
                }
                if (($_SESSION['signuperror'] == "blank_field")) {
                    echo "FIELDS MAY NOT BE BLANK.";
                }
                unset($_SESSION["signuperror"]);
            }
            ?>
            <div>
                <p></p>
                <label>Username: </label>
                <input type="text" name="username">
                <p></p>
                <label>Password: </label>
                <input type="password" name="password">
                <p></p>
                <label>Confirm Password: </label>
                <input type="password" name="passwordconf">
            </div>
            <br>
            <input type="submit" value="Submit">
        </form>
        <p>Back to <a href="/signin.php">sign in</a>.</p>
    </body>
</html>

