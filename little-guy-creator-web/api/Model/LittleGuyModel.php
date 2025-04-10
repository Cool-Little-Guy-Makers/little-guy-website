<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class LittleGuyModel extends Database
{
    public function getAllLittleGuys()
    {
        return $this->select("SELECT * FROM `little-guys`", []);
    }

    public function getUserLittleGuys($username) 
    {
        return $this->select("SELECT * FROM `little-guys` WHERE username = ?", ["s", $username]);
    }

    public function getNonUserLittleGuys($username) 
    {
        return $this->select("SELECT * FROM `little-guys` WHERE username != ?", ["s", $username]);
    }

    public function createLittleGuy($username, $guyName, $guyVariant) 
    {
        return $this->insert("INSERT INTO `little-guys` (`username`, `name`, `variant`) VALUES (?, ?, ?)", ["sss", $username, $guyName, $guyVariant]);
    }

    public function editLittleGuy($id, $username, $guyName, $guyVariant)
    {
        return $this->update("UPDATE `little-guys` SET `name` = ?, `variant` = ? WHERE `id` = ? AND `username` = ?", ["siis", $guyName, $guyVariant, $id, $username]);
    }

    public function deleteLittleGuy($id, $username)
    {
        return $this->delete("DELETE FROM `little-guys` WHERE `id` = ? AND `username` = ?", ["is", $id, $username]);
    }
}
?>