<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" 
        content="The Little Guy Website is the website users use to make Little Guys, socialize with friends, design fun characters, and have a great time." /> 
        <title>Little Guy Creator</title>
        <link rel="icon" type="image/x-icon" href="favicon.ico">
    </head>
    <body>

        <?php
            // Base page top functionality: config SQL, verify if logged in, etc.

            require_once("config.php");

            $sign_in_page = "signin.php";

            // Continue session
            session_start();

            // Current user credentials
            $user = $_SESSION["user"];
            $logged_in = $_SESSION["loggedin"];
            
            // Prevent access to home page if not signed in
            if (!isset($logged_in)) {
                header("location: " . $sign_in_page);
            }

            echo "You are logged in as user: " . $user;

            // Guy variants as strings
            $variants[0] = "Blue and Pink";
            $variants[1] = "Purple and Yellow";
            $variants[2] = "Green";

            // Guy variants as images
            $variant_images[0] = "assets/little-guys/little-guy-trans.png";
            $variant_images[1] = "assets/little-guys/little-guy-enby.png";
            $variant_images[2] = "assets/little-guys/little-guy-green.png";

        ?>

        <br>

        <a href="logout.php">Log Out</a>

        <br>

        <!--SECTION: YOUR LITTLE GUYS TABLE-->

        <h1>Your Little Guys</h1>
        
        <a href="creator.php">Create a new Little Guy</a>

        <table>
            <!--COLUMN HEADERS-->
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Variant</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>

            <!--Function to redirect to editor.php-->
            <script>
                function redirectToEditor() {
                    window.location.href="/editor.php";  
                }
            </script>

            <?php

                $edit_guy_page = "editor.php";

                // Get your little guys
                $sql = "SELECT * FROM `little-guys` WHERE `username` = (?)";
                $stmt = mysqli_prepare($db, $sql);
                mysqli_stmt_bind_param($stmt, "s", $user);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if ($result == false) die("Failed to get result");

                $row = mysqli_fetch_array($result);

                // $row will equal null when no more rows left
                while ($row != null) {

                    // Add row as html
                    echo "<tr>";
                    echo "<td>" . $row[0] . "</td>";
                    echo "<td>" . $row[2] . "</td>";
                    echo "<td>" . $variants[$row[3]] . "</td>"; // Variant type as string
                    echo "<td>" . '<img src="' . $variant_images[$row[3]] . '" alt="Picture of Little Guy" width="90" height="100">'. "</td>"; // Variant type as image
                    
                    // Edit button that sends this little guy's ID to editor and redirects there
                    echo "<td>" .   '<form action="editor.php" method="post">
                                        <input type="hidden" name="littleguyid" value = ' . $row[0] . ' /> 
                                        <input type="submit" value="Edit" onClick="redirectToEditor()" />
                                    </form>';
                                    
                    echo "</tr>";

                    // Next row
                    $row = mysqli_fetch_array($result);
                }

            ?>
        </table>

        <hr>

        <!--SECTION: OTHER USERS' GUYS TABLE-->

        <h1>More Little Guys</h1>

        <table>
            <!--COLUMN HEADERS-->
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Variant</th>
                <th>Image</th>
                <th>User</th>
            </tr>

            <?php

                // Get other users' little guys
                $sql = "SELECT * FROM `little-guys` WHERE NOT `username` = (?)";
                $stmt = mysqli_prepare($db, $sql);
                mysqli_stmt_bind_param($stmt, "s", $user);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if ($result == false) die("Failed to get result");

                $row = mysqli_fetch_array($result);

                // $row will equal null when no more rows left
                while ($row != null) {

                    // Add row as html
                    echo "<tr>";
                    echo "<td>" . $row[0] . "</td>";
                    echo "<td>" . $row[2] . "</td>";
                    echo "<td>" . $variants[$row[3]] . "</td>"; // Variant type as string
                    echo "<td>" . '<img src="' . $variant_images[$row[3]] . '" alt="Picture of Little Guy" width="90" height="100">'. "</td>"; // Variant type as image
                    echo "<td>" . $row[1] . "</td>";
                    echo "</tr>";

                    // Next row
                    $row = mysqli_fetch_array($result);
                }

            ?>
        </table>


    </body>
</html>