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
        <h1>Sign In</h1>

        <form action="checksignin.php" method="post">
        
            <label>Username: </label>
            <input type="text" name="username">
            <p></p>
            <label>Password: </label>
            <input type="password" name="password">
            <p></p>
            <input type="submit" value="its little guy time">

        </form>
    </body>
</html>

