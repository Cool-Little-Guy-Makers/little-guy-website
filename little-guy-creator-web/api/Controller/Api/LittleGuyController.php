<?php
class LittleGuyController extends BaseController
{

        /** 
* "/user/login" Endpoint - returns OK if user exists
*/
public function loginUser()
{
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];

    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    $userValid = false;

    if (strtoupper($requestMethod) == 'POST') {
        try {
            $userModel = new UserModel();

            $userDatas = $userModel->getUser($username);
            // Should only have one, but could have more if something went wrong
            if ($userDatas > 0 && password_verify($password, $userDatas[0]['password'])) {
                $userValid = true;

                $userToken = get_authentication_token($username);
                $userReturnData = array("username" => $userDatas[0]['username'], "token" => $userToken);
                $responseData = json_encode($userReturnData);
            }

            if (!$userValid) {
                $strErrorDesc = 'Username or password is incorrect.';
                $strErrorHeader = 'HTTP/1.1 401 Unauthorized';
            }
            
        } catch (Error $e) {
            $strErrorDesc = $e->getMessage().('Something went wrong! Please contact support.');
            $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
        }
    } else {
        $strErrorDesc = 'Method not supported';
        $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }

    // send output 
    $this->doOutput($strErrorDesc, $responseData, $strErrorHeader, '200 OK');
}

        /** 
* "/user/register" Endpoint - inserts a new user
*/
public function registerUser()
{
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];

    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    if (strtoupper($requestMethod) == 'POST') {
        try {
            $userModel = new UserModel();

            // Neither can be blank, password must be 10 or more characters
            if (strlen($username) == 0 || strlen($password) < 10) {
                $strErrorDesc = 'Invalid username or password.';
                $strErrorHeader = 'HTTP/1.1 400 Bad Request';

            } else {
                $userDatas = $userModel->getUser($username);

                if (!empty($userDatas)) {
                    $strErrorDesc = 'Username already taken.';
                    $strErrorHeader = 'HTTP/1.1 409 Conflict';
                } else {
                    // OK to add a new user
                    $userExists = $userModel->registerUser($username, $password);
                    $responseData = json_encode($userExists);
                }
            }

        } catch (Error $e) {
            $strErrorDesc = $e->getMessage().('Something went wrong! Please contact support.');
            $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
        }
    } else {
        $strErrorDesc = 'Method not supported';
        $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }
    // send output 
    $this->doOutput($strErrorDesc, $responseData, $strErrorHeader, '201 Created');
}

    /** 
* "/guy/listAll" Endpoint - get list of little guys
*/
public function listAllGuys() 
{
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    if (strtoupper($requestMethod) == 'GET') {
        try {
            $littleGuyModel = new UserModel();
            $arrGuys = $littleGuyModel->getAllLittleGuys(); 
            $responseData = json_encode($arrGuys);
        } catch (Error $e) {
            $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
            $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
        }
    } else {
        $strErrorDesc = 'Method not supported';
        $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }
    // send output 
    $this->doOutput($strErrorDesc, $responseData, $strErrorHeader, '200 OK');
}
/** 
* "/guy/listUser" Endpoint - get list of little guys belonging to user
*/
public function listUserGuys()
{
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $arrQueryStringParams = $this->getQueryStringParams();
    if (strtoupper($requestMethod) == 'GET') {
        try {
            $littleGuyModel = new UserModel();
            if (isset($arrQueryStringParams['username']) && $arrQueryStringParams['username']) {
                $thisUser = $arrQueryStringParams['username'];
            }
            $arrUserGuys = $littleGuyModel->getUserLittleGuys($thisUser); 
            $responseData = json_encode($arrUserGuys);
        } catch (Error $e) {
            $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
            $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
        }
    } else {
        $strErrorDesc = 'Method not supported';
        $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }
    // send output 
    $this->doOutput($strErrorDesc, $responseData, $strErrorHeader, '200 OK');
}
    /** 
* "/guy/listNonUser" Endpoint - get list of little guys not belonging to user
*/
public function listNonUserGuys()
{
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $arrQueryStringParams = $this->getQueryStringParams();
    if (strtoupper($requestMethod) == 'GET') {
        try {
            $littleGuyModel = new UserModel();
            if (isset($arrQueryStringParams['username']) && $arrQueryStringParams['username']) {
                $thisUser = $arrQueryStringParams['username'];
            }
            $arrUserGuys = $littleGuyModel->getNonUserLittleGuys($thisUser); 
            $responseData = json_encode($arrUserGuys);
        } catch (Error $e) {
            $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
            $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
        }
    } else {
        $strErrorDesc = 'Method not supported';
        $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }
    // send output 
    $this->doOutput($strErrorDesc, $responseData, $strErrorHeader, '200 OK');
}

    /** 
* "/guy/new" Endpoint - make new little guy
*/
public function newGuys()
{

    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];

    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'] ?? '';
    $name = $data['name'] ?? '';
    $variant = $data['variant'] ?? -1;

    if (strtoupper($requestMethod) == 'POST') {
        try {
            $littleGuyModel = new UserModel();
            $auth = authenticate($username);

            if (strlen($name) == 0 || $variant < 0) {
                $strErrorDesc = 'Invalid little guy';
                $strErrorHeader = 'HTTP/1.1 400 Bad Request';
            } else if ($auth == 401) {
                $strErrorDesc = 'Invalid token format';
                $strErrorHeader = 'HTTP/1.1 401 Unauthorized';
            } else if ($auth == 403) {
                $strErrorDesc = 'No permission for this user';
                $strErrorHeader = 'HTTP/1.1 403 Forbidden';
            } else if ($auth == 404) {
                $strErrorDesc = 'User not found';
                $strErrorHeader = 'HTTP/1.1 404 Not Found';
            } else {
                $resp = $littleGuyModel->createLittleGuy($username, $name, $variant); 
                $responseData = json_encode($resp);
            }

        } catch (Error $e) {
            $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
            $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
        }
    } else {
        $strErrorDesc = 'Method not supported';
        $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }
    // send output 
    $this->doOutput($strErrorDesc, $responseData, $strErrorHeader, '201 Created');  
}

/** 
* "/guy/change" Endpoint - edit pre-existing little guy
*/
public function changeGuys()
{
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];

    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'] ?? -1;
    $name = $data['name'] ?? '';
    $variant = $data['variant'] ?? -1;

    if (strtoupper($requestMethod) == 'PUT') {
        try {
            $littleGuyModel = new UserModel();

            $owners = $littleGuyModel->getOwner($id);
            
            if (empty($owners)) {
                $strErrorDesc = 'ID not found';
                $strErrorHeader = 'HTTP/1.1 404 Not Found';
            } else {
                $username = $owners[0]['username']; // owners is array of assoc array

                $auth = authenticate($username);

                if (strlen($name) == 0 || $variant < 0) {
                    $strErrorDesc = 'Invalid little guy';
                    $strErrorHeader = 'HTTP/1.1 400 Bad Request';
                } else if ($auth == 401) {
                    $strErrorDesc = 'Invalid token format';
                    $strErrorHeader = 'HTTP/1.1 401 Unauthorized';
                } else if ($auth == 403) {
                    $strErrorDesc = 'No permission for this user';
                    $strErrorHeader = 'HTTP/1.1 403 Forbidden';
                } else if ($auth == 404) {
                    $strErrorDesc = 'User not found';
                    $strErrorHeader = 'HTTP/1.1 404 Not Found';
                } else {
                    $resp = $littleGuyModel->editLittleGuy($id, $username, $name, $variant); 
                    $responseData = json_encode($resp);
                }
            }

        } catch (Error $e) {
            $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
            $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
        }
    } else {
        $strErrorDesc = 'Method not supported';
        $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }
    // send output 
    $this->doOutput($strErrorDesc, $responseData, $strErrorHeader, '200 OK');  
}
/** 
* "/guy/trash" Endpoint - delete pre-existing little guy
*/
public function trashGuys()
{
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];

    $arrQueryStringParams = $this->getQueryStringParams();
    $id = $arrQueryStringParams['id'] ?? -1;

    if (strtoupper($requestMethod) == 'DELETE') {
        try {
            $littleGuyModel = new UserModel();

            $owners = $littleGuyModel->getOwner($id);
            
            if (empty($owners)) {
                $strErrorDesc = 'ID not found';
                $strErrorHeader = 'HTTP/1.1 404 Not Found';
            } else {
                $username = $owners[0]['username']; // owners is array of assoc array

                $auth = authenticate($username);

                if ($auth == 401) {
                    $strErrorDesc = 'Invalid token format';
                    $strErrorHeader = 'HTTP/1.1 401 Unauthorized';
                } else if ($auth == 403) {
                    $strErrorDesc = 'No permission for this user';
                    $strErrorHeader = 'HTTP/1.1 403 Forbidden';
                } else if ($auth == 404) {
                    $strErrorDesc = 'User not found';
                    $strErrorHeader = 'HTTP/1.1 404 Not Found';
                } else if ($auth == 200) {
                    $resp = $littleGuyModel->deleteLittleGuy($id, $username); 
                    $responseData = json_encode($resp);
                } else {
                    $strErrorDesc = $auth;
                    $strErrorHeader = 'HTTP/1.1 404 Not Found';
                }
            }

        } catch (Error $e) {
            $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
            $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
        }
    } else {
        $strErrorDesc = 'Method not supported';
        $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }
    // send output 
    $this->doOutput($strErrorDesc, $responseData, $strErrorHeader, '204 No Content');     
}

private function doOutput($errorDesc, $responseData, $errorHeader, $okType) {
    if (!$errorDesc) {
        $this->sendOutput(
            $responseData,
            array('Content-Type: application/json', 'HTTP/1.1 ' . $okType)
        );
    } else {
        $this->sendOutput(json_encode(array('error' => $errorDesc)), 
            array('Content-Type: application/json', $errorHeader)
        );
    } 
}

}
?>