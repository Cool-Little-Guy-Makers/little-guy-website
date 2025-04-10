<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class UserModel extends Database
{
    public function getAllLittleGuys()
    {
        return $this->select("SELECT * FROM `little-guys`");
    }

    public function getUserLittleGuys($username) 
    {
        return $this->select("SELECT * FROM `little-guys` WHERE username = ?", ["s", $username]);
    }

    public function getNonUserLittleGuys($username) 
    {
        return $this->select("SELECT * FROM `little-guys` WHERE username != ?", ["s", $username]);
    }

    public function createLittleGuy($authtoken, $username, $guyName, $guyVariant) 
    {

    }

    public function editLittleGuy($authtoken, $id, $username, $guyName, $guyVariant)
    {

    }

    public function deleteLittleGuy($authtoken, $id, $username)
    {

    }
}
?>