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

            // Prevent access to editor page if not signed in or no little guy was passed in to be edited 
            if (!isset($logged_in)) {
                header("location: " . $sign_in_page);
            }
            if(!isset($_POST["littleguyid"])){
                header("location: home.php");
            }

            echo "You are logged in as user: " . $user;

            // Get the ID of the appropriate little guy
            $littleguyid = $_POST["littleguyid"];
            
            // Find that guy in the database from logged-in user
            $query = "SELECT * FROM `little-guys` WHERE id = ? AND username = ?;";
            $stmt = mysqli_prepare($db,$query);
            mysqli_stmt_bind_param($stmt,"is",$littleguyid, $user);
            mysqli_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            // Go back to the home page if guy is not found
            if ($result == false) { 
                header("location: home.php");
            }

            $row = mysqli_fetch_array($result);
            $currentname = $row[2];
            $currentvariant = $row[3];
            $currentname = str_replace('"', "'", $currentname);

        ?>
        <!-- Log out + Exit links -->
        <br>
        <a href="logout.php">Log Out</a>
        <br>
        <br>
        <a href="home.php">< Leave without Saving</a>
        <br>

        <h1>Little Guy Editor</h1>
        <h2>Change Your Little Guy!</h2>

        <!-- Form to edit little guy 
        (PHP fills in current settings for this specific little guy) -->
        <form action="editguyhelper.php" method="post">
            <div>
                <label>Name: </label>
                <input type="text" name="name" <?php echo "value = \"".$currentname."\""?>>
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
                <!-- passes on ID to helper file -->
                <input type="hidden" name="littleguyid" <?php echo "value = ".$littleguyid?> /> 
            </div>
            <br>
            <input type="submit" value="Save changes">
        </form>
        <br>

        <!-- Delete button -->
        <button id="deleteButton">Delete little guy</button>

        <!-- Hidden form to send info to delete.php -->
        <form name="infoForm" action="delete.php" method="post">
            <input type="hidden" name="littleguyid" <?php echo "value = ".$littleguyid?> /> 
        </form>
        
        <!-- Confirm alert pops up on button click -->
        <script>
            const deleteButton = document.querySelector("#deleteButton");

            deleteButton.addEventListener("click", () => {
            if (window.confirm("Are you sure you want to delete this little guy?")) {
                document.infoForm.submit();
            }
            });
        </script>
    </body>
</html>

