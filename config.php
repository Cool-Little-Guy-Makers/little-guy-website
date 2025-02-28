<?php

    // CHANGE THESE FIELDS
    $hostname = "localhost" // replace with MySQL hostname on control panel
    $username = "root" // replace with MySQL username on control panel
    $password = "" // replace with password

    $db = mysqli_connect($hostname,$username,$password,"app-db");

    if (mysqli_connect_errno()) {
        
    echo "<h1>ERROR: Failed to connect to MySQL: "
    . mysqli_connect_error() . "<h1>";

    exit("Connection failed: " . mysqli_connect_error())
    }

?>