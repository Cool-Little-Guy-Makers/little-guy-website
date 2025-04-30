<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class UserModel extends Database
{
    public function getAllUsers()
    {
        return $this->select("SELECT * FROM `users`", []);
    }
    
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
        return $this->insert("INSERT INTO `little-guys` (`username`, `name`, `head_variant`, `head_hex`, `face_variant`, `face_color`, `body_variant`, `body_hex`, `arms_variant`, `arms_hex`, `legs_variant`, `legs_hex`, `iq`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", ["ssisisisisiss", $username, $guyName, $head_var, $head_hex, $face_var, $face_col, $body_var, $body_hex, $arms_var, $arms_hex, $legs_var, $legs_hex, $iq]);
    }

    public function editLittleGuy($id, $username, $guyName, $head_var, $head_hex, $face_var, $face_col, $body_var, $body_hex, $arms_var, $arms_hex, $legs_var, $legs_hex)
    {
        $exists = $this->userIdMatch($id, $username);
        return $exists && $this->update("UPDATE `little-guys` SET `name` = ?, `head_variant` = ?, `head_hex` = ?, `face_variant` = ?, `face_color` = ?, `body_variant` = ?, `body_hex` = ?, `arms_variant` = ?, `arms_hex` = ?, `legs_variant` = ?, `legs_hex` = ? WHERE `id` = ? AND `username` = ?", ["sisisisisisis", $guyName, $head_var, $head_hex, $face_var, $face_col, $body_var, $body_hex, $arms_var, $arms_hex, $legs_var, $legs_hex, $id, $username]);
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