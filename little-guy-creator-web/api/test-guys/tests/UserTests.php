<?php
use PHPUnit\Framework\TestCase;

class UserTests extends TestCase
{
    protected $client;

    protected function setUp() : void {
        parent::setUp();
        $this->client = new GuzzleHttp\Client(["base_uri" => "http://localhost"]);
    }

    public function testGet_UserList() {
      $response = $this->client->request('GET', 'little-guy-website/little-guy-creator-web/api/index.php/user/list');
      $this->assertEquals(200, $response->getStatusCode());
   }

   
   public function testPost_CreateUser() {
    $response = $this->client->request('POST', 'little-guy-website/little-guy-creator-web/api/index.php/user/register');
    $this->assertEquals(201, $response->getStatusCode());
    }

    public function testPost_LoginUser() {
        $response = $this->client->request('POST', 'little-guy-website/little-guy-creator-web/api/index.php/user/register');
        $this->assertEquals(201, $response->getStatusCode());
    }

    public function testPost_Failed() {
        $response = $this->client->request('POST', 'little-guy-website/little-guy-creator-web/api/index.php/user/register');
        $this->assertEquals(201, $response->getStatusCode());
    }
    
}
?>