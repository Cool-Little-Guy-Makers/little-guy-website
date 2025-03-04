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

            $littleguyid = 3; // FIGURE OUT HOW TO GET THIS

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


            // Get the appropriate little guy
            $query = "SELECT * FROM `little-guys` WHERE id = ?;";
            $stmt = mysqli_prepare($db,$query);
            mysqli_stmt_bind_param($stmt,"i",$littleguyid);
            mysqli_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            // Quit if not found
            if ($result == false) { 
                die("Failed to get result"); 
            }

            $row = mysqli_fetch_array($result);
            echo "Row: ".$row;
            $currentname = $row[2];
            $currentvariant = $row[3];
        ?>
        
        <h1>Little Guy Editor</h1>
        <h2>Change Your Little Guy!</h2>
        <form action="editguyhelper.php" method="post">
            <div>
                <label>Name: </label>
                <input type="text" name="name" <?php echo "value = ".$currentname?>>
            </div>
            <br>
            <div>
                <label>Style: </label>
                <input type="radio" name="variant" value="0" 
                    <?php if($currentvariant==0) echo "checked = \"checked\""?> >
                    Blue and Pink
                </input>
                <input type="radio" name="variant" value="1" 
                    <?php if($currentvariant==1) echo "checked = \"checked\""?>>
                    Purple and Yellow
                </input>
                <input type="radio" name="variant" value="2" 
                    <?php if($currentvariant==2) echo "checked = \"checked\""?> >
                    Green
                </input>
                <input type="hidden" name="littleguyid" <?php echo "value = ".$littleguyid?> />
            </div>
            <br>
            <input type="submit" value="Submit">
        </form>
    </body>
</html>

