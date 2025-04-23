<?php
require_once PROJECT_ROOT_PATH . "/Model/UserModel.php";
require 'vendor/autoload.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

/**
 * Return options:
 *  200 (OK)
 *  401 (Invalid token format or invalid token for this user)
 *  403 (Authenticated as a different user)
 *  404 (User not found)
 * 
 */
function authenticate($user) {
    $headers = array_change_key_case(getallheaders(), CASE_LOWER);

    // Case for authorization header missing
    if (!isset($headers['authorization'])) {
        return 401;
    }

    // Case for invalid token format
    $authHeader = $headers['authorization'];
    //$authHeader = "Bearer ". get_authentication_token($user);
    if (strpos($authHeader, 'Bearer ') !== 0) {
        return 401;
    }

    $jwt = substr($authHeader, 7);

    try {
        // Verify user exists
        $userModel = new UserModel();
        $userDatas = $userModel->getUser($user);
        if (empty($userDatas)) {
            return 404;
        }

        // Test token
        $decoded = JWT::decode($jwt, new Key(SECRET_KEY, 'HS256'));
        if ($decoded->sub == strtolower($user)) {
            // User OK
            return 200;
            //200;
        } else {
            // Wrong user
            return 403;
        }


    } catch (Exception $e) {
        // Token invalid, or something else went wrong
        return 401;
    }
}

function get_authentication_token($user) {
    $payload = [
        "iss" => TOKEN_ISSUER,
        "iat" => time(),
        "exp" => time() + (86400 * 36500), // token valid for 100 years
        "sub" => strtolower($user),
    ];
    return JWT::encode($payload, SECRET_KEY, 'HS256');
}

?>