<!DOCTYPE html>
<html>
    <head></head>
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


    </body>
</html>