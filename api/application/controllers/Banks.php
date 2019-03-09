<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH."controllers/AppController.php");

Class Banks extends AppController {
    
	function __construct()
    {
			parent::__construct();
      $this->load->model('accounts_model');
      $this->load->model('mobile_apps_model','MA');
    }

   //add Apps 
    function add_cards_post()
    {
			$output['status']  = "success";
      try
      {		
        $form = $this->post();
        $ins['bank_name'] = $form['bank_name'];
        $ins['card_type'] = $form['card_type'];
        $ins['card_number'] = $form['card_number'];
        $ins['exp_month'] = $form['exp_month'];
        $ins['exp_year'] = $form['exp_year'];
        $ins['cvv'] = $form['cvv'];
        $ins['holder_name'] = $form['holder_name'];
        $ins['pin'] = $form['pin'];
        $ins['color'] = $form['card_color'];
        $ins['uuid'] = $form['uuid'];
        $where['id'] = (isset($form['id']) && $form['id'] != 'undefined') ? $form['id'] : "";
        $uuid['uuid'] = $form['uuid'];
        $userid = $this->accounts_model->getUser($uuid)->row_array()['id'];
        $ins['userid'] = $userid;
        if( $where['id'] === '' )
        {
          $ins_id = $this->MA->insert($ins,'cards');
        }
        else
        {
          $ins['last_updated'] = date('Y-m-d h:i:s');
          $updated_id = $this->MA->update($where,$ins,'cards');
        }
        $output['message'] = "Card saved successfully.";
			}
      catch(Exception $e)
      {
				$output['status'] = "error";
				$output['message'] = $e->getMessage();
			}
      $this->response($output);
    }

    public function deleteRows($rows = null)
    {
      foreach($rows as $d)
      {
        $data = $this->MA->delete(array("id" => $d['id']),"mobile_apps_details");
      }
    }
    
    public function list_cards_get($id='')
    {
      $output['status'] = "success";
      try
      {
        $where['uuid'] = $id;
        $get = $this->MA->select($where,"cards");
        if( $get !== null )
        {
          $output['message'] = "Cards Found";
          $output['data'] = $get;
        }
        else
          throw new Exception("No Cards Found.");
      }
      catch(Exception $e)
      {
				$output['status'] = "error";
				$output['message'] = $e->getMessage();
			}
      $this->response($output);
    }
    function remove_card_delete($id)
    {
      $output['status']    = 'success';
      try
      {
        $data = $this->MA->delete(array("id" => $id),"cards");
        $output['message'] = 'Cards removed successfully';
      }
      catch(Exception $e)
      {
        $output['status']   = 'error';
        $output['message']  = $e->getMessage();
      }

      $this->response($output);
    }
}
