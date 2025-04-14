<?php

    require_once("./api/inc/config.php");

    // CHANGE THESE FIELDS
    $hostname = DB_HOST; // replace with MySQL hostname on control panel
    $username = DB_USERNAME; // replace with MySQL username on control panel
    $password = DB_PASSWORD; // replace with password

    $db = mysqli_connect($hostname,$username,$password,DB_DATABASE_NAME);    

    if (mysqli_connect_errno()) {
        echo "<h1>ERROR: Failed to connect to MySQL: " . mysqli_connect_error() . "<h1>";

        exit("Connection failed: " . mysqli_connect_error());
    }

?>