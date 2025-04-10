<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class UserModel extends Database
{
    public function registerUser($username, $password)
    {
        return $this->insert("INSERT INTO users VALUES (?, ?)", ["ss", $username, $password]);
    }

    public function getUser($username)
    {
        return $this->select("SELECT * FROM users WHERE username = '?'", ["s", $username]);
    }
}
?>