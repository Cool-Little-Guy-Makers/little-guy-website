<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class UserModel extends Database
{

    public function registerUser($username, $password)
    {
        return $this->insert("INSERT INTO users VALUES (?, ?)", ["ss", $username, password_hash($password, PASSWORD_DEFAULT)]);
    }

    public function getUser($username)
    {
        return $this->select("SELECT * FROM users WHERE username = ?", ["s", $username]);
    }

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

    public function createLittleGuy($username, $guyName, $head_var, $head_hex, $face_var, $face_col, $body_var, $body_hex, $arms_var, $arms_hex, $legs_var, $legs_hex, $iq) 
    {
        return $this->insert("INSERT INTO `little-guys` (`username`, `name`, `head_var`, `head_hex`, `face_var`, `face_col`, `body_var`, `body_hex`, `arms_var`, `arms_hex`, `legs_var`, `legs_hex`, `iq`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", ["ssiiiiiiiiiis", $username, $guyName, $head_var, $head_hex, $face_var, $face_col, $body_var, $body_hex, $arms_var, $arms_hex, $legs_var, $legs_hex, $iq]);
    }

    public function editLittleGuy($id, $username, $guyName, $guyVariant)
    {
        $exists = $this->userIdMatch($id, $username);
        return $exists && $this->update("UPDATE `little-guys` SET `name` = ?, `variant` = ? WHERE `id` = ? AND `username` = ?", ["siis", $guyName, $guyVariant, $id, $username]);
    }

    public function deleteLittleGuy($id, $username)
    {
        $exists = $this->userIdMatch($id, $username);
        return $exists && $this->delete("DELETE FROM `little-guys` WHERE `id` = ? AND `username` = ?", ["is", $id, $username]);
    }

    public function userIdMatch($id, $username) {
        return !empty($this->select("SELECT * FROM `little-guys` WHERE id = ? AND username = ?", ["is", $id, $username]));
    }

    public function getOwner($id) {
        return $this->select("SELECT `username` FROM `little-guys` WHERE id = ?", ["i", $id]);
    }
}
?>