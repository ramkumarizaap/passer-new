<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once(APPPATH."controllers/AppController.php");
class Accounts extends AppController {
  function __construct()
    {
      parent::__construct();
    }
  public function register_get(){
    $output['status'] = "success";
    $this->response($output);
    // echo json_encode($output);
  }
}