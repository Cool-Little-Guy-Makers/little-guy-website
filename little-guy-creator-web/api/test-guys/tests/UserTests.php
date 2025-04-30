<?php
use PHPUnit\Framework\TestCase;

class UserTests extends TestCase
{
    protected $client;

    protected function setUp() : void {
        parent::setUp();
        $this->client = new GuzzleHttp\Client(["base_uri" => "http://localhost", "http_errors" => false]);
    }

    public function testGet_UserList() {
      $response = $this->client->request('GET', 'little-guy-website/little-guy-creator-web/api/index.php/user/list');
      $this->assertEquals(200, $response->getStatusCode());
   }

   
   public function testPost_CreateUser() {
    $response = $this->client->request('POST', 'little-guy-website/little-guy-creator-web/api/index.php/user/register', [
        'headers' => [
            'Authorization' => 'Bearer your_token_here',
        ],
        'json' => [
            "username" => "UserTest57028357024867230857458",
                "password" => "PasswordTest#%&@)*#FNfq3f89#FW90022fssnf"
        ]
    ]);
    $this->assertEquals(201, $response->getStatusCode());
    }

    
    
    public function testPost_LoginUser() {
        $response = $this->client->request('POST', 'little-guy-website/little-guy-creator-web/api/index.php/user/login', [
            'headers' => [
                'Authorization' => 'Bearer your_token_here',
            ],
            'json' => [
                "username" => "UserTest57028357024867230857458",
                "password" => "PasswordTest#%&@)*#FNfq3f89#FW90022fssnf"
            ]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
    }
    
    public function testPost_Failed() {
        $response = $this->client->request('POST', 'little-guy-website/little-guy-creator-web/api/index.php/user/login', [
            'headers' => [
                'Authorization' => 'Bearer your_token_here',
            ],
            'json' => [
                'username' => 'failUser',
                'password' => 'short',
            ]
        ]);
        
        $this->assertEquals(401, $response->getStatusCode());
    }
    
}
?>