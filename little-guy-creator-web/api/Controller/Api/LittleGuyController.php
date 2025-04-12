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
    $arrQueryStringParams = $this->getQueryStringParams();
    if (strtoupper($requestMethod) == 'GET') {
        try {
            $userModel = new UserModel();
            if (isset($arrQueryStringParams['username']) && $arrQueryStringParams['password']) {
                $username = $arrQueryStringParams['username'];
                $password = $arrQueryStringParams['password'];
            }
            $userExists = $userModel->checkUser($username, $password);
            $responseData = json_encode($userExists);
        } catch (Error $e) {
            $strErrorDesc = $e->getMessage().('Something went wrong! Please contact support.');
            $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
        }
    } else {
        $strErrorDesc = 'Method not supported';
        $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }
    // send output 
    if (!$strErrorDesc) {
        $this->sendOutput(
            $responseData,
            array('Content-Type: application/json', 'HTTP/1.1 200 OK')
        );
    } else {
        $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
            array('Content-Type: application/json', $strErrorHeader)
        );
    }
}

        /** 
* "/user/register" Endpoint - inserts a new user
*/
public function registerUser()
{
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $arrQueryStringParams = $this->getQueryStringParams();
    if (strtoupper($requestMethod) == 'GET') {
        try {
            $userModel = new UserModel();
            if (isset($arrQueryStringParams['username']) && $arrQueryStringParams['password']) {
                $username = $arrQueryStringParams['username'];
                $password = $arrQueryStringParams['password'];
            }
            $userExists = $userModel->registerUser($username, $password);
            $responseData = json_encode($userExists);
        } catch (Error $e) {
            $strErrorDesc = $e->getMessage().('Something went wrong! Please contact support.');
            $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
        }
    } else {
        $strErrorDesc = 'Method not supported';
        $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }
    // send output 
    if (!$strErrorDesc) {
        $this->sendOutput(
            $responseData,
            array('Content-Type: application/json', 'HTTP/1.1 200 OK')
        );
    } else {
        $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
            array('Content-Type: application/json', $strErrorHeader)
        );
    }
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
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
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
                if (isset($arrQueryStringParams['user']) && $arrQueryStringParams['user']) {
                    $thisUser = $arrQueryStringParams['user'];
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
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
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
                if (isset($arrQueryStringParams['user']) && $arrQueryStringParams['user']) {
                    $thisUser = $arrQueryStringParams['user'];
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
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    /** 
* "/guy/new" Endpoint - make new little guy
*/
    public function newGuys()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $littleGuyModel = new UserModel();
                if (isset($arrQueryStringParams['user']) &&
                    isset($arrQueryStringParams['name']) &&
                    isset($arrQueryStringParams['variant']) ) {
                    $guyUser = $arrQueryStringParams['user'];
                    $guyName = $arrQueryStringParams['name'];
                    $guyVariant = $arrQueryStringParams['variant'];
                }

                $resp = $littleGuyModel->createLittleGuy($guyUser, $guyName, $guyVariant); 
                $responseData = json_encode($resp);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    /** 
* "/guy/change" Endpoint - edit pre-existing little guy
*/
    public function changeGuys()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $littleGuyModel = new UserModel();
                if (isset($arrQueryStringParams['id']) &&
                    isset($arrQueryStringParams['user']) &&
                    isset($arrQueryStringParams['name']) &&
                    isset($arrQueryStringParams['variant'])) {
                    $guyUser = $arrQueryStringParams['user'];
                    $guyId = $arrQueryStringParams['id'];
                    $newName = $arrQueryStringParams['name'];
                    $newVariant = $arrQueryStringParams['variant'];
                }
                $resp = $littleGuyModel->editLittleGuy($guyId, $guyUser, $newName, $newVariant); 
                $responseData = json_encode($resp);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }     
    }
    /** 
* "/guy/trash" Endpoint - delete pre-existing little guy
*/
    public function trashGuys()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $littleGuyModel = new UserModel();
                if (isset($arrQueryStringParams['id']) &&
                    isset($arrQueryStringParams['user'])) {
                    $guyUser = $arrQueryStringParams['user'];
                    $guyId = $arrQueryStringParams['id'];
                }
                $resp = $littleGuyModel->deleteLittleGuy($guyId, $guyUser); 
                $responseData = json_encode($resp);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }        
    }
}
?>