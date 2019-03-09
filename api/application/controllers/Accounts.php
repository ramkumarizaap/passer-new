<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH."controllers/AppController.php");

Class Accounts extends AppController {
    
	function __construct()
    {
			parent::__construct();
			$this->load->model('accounts_model');
    }

   //get User 
    function register_post()
    {
			$output['status']  = "success";
			try{
				$form =$this->post();
				$form['firstname'] = $form['firstname'];
				$form['lastname'] = $form['lastname'];
				$form['email'] = $form['email'];
				$form['password'] = $form['password'];
				$form['uuid'] = $form['uuid'];
				$form['role'] = "2";
				$add = $this->accounts_model->insert($form);
				if($add){
					$output['message'] = "User registered successfully!!!";
				}
				else{
					throw new Exception("Sorry! Can't able to register.");
				}
			}
			catch(Exception $e){
				$output['status'] = "error";
				$output['message'] = $e->getMessage();
			}
      $this->response($output);
    }
	
		function fingerprint_login_post()
		{
			$output['status'] = "success";
			try
			{
				$where1['fingerprint_id'] = $this->post('id');
				$where['uuid'] = $this->post('uuid');
				$chk = $this->accounts_model->getUser($where);
				if( $chk->num_rows() > 0 )
				{
					$chk1 = $this->accounts_model->getUser($where1);
					if( $chk1->num_rows() === 0 )
					{
						$up['fingerprint_id'] = $this->post('id');
						$update = $this->accounts_model->update($where,$up);
					}
					$output['data'] = $this->accounts_model->getUser($where1)->row_array();
				}
				else
				{
					throw new Exception('User is not yet registered.');
				}
			}
			catch(Exception $e)
			{
				$output['status'] = "error";
				$output['message'] = $e->getMessage();
			}
			$this->response($output);
		}

		public function login_post()
		{
			$output['status'] = "success";
			try
			{
				$form = $this->post();
				$where['password'] = $form['password'];
				$where['uuid'] = $form['uuid'];
				$chk = $this->accounts_model->getUser($where);
				if( $chk->num_rows() > 0 )
				{
					$output['message'] = "User Found.";
					$output['data'] = $chk->row_array();
				}
				else
				{
					throw new Exception("User Not Found");
				}
			}
			catch(Exception $e)
			{
				$output['status'] = "error";
				$output['message'] = $e->getMessage();
			}
			$this->response($output);
		}
    
}
