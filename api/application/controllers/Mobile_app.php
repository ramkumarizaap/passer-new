<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH."controllers/AppController.php");

Class Mobile_app extends AppController {
    
	function __construct()
    {
			parent::__construct();
      $this->load->model('accounts_model');
      $this->load->model('mobile_apps_model','MA');
    }

   //add Apps 
    function add_post()
    {
			$output['status']  = "success";
      try
      {		
        $form = $this->post();
        $ins['appname'] = $form['appname'];
        $where['id'] = (isset($form['id']) && $form['id'] != 'undefined') ? $form['id'] : "";
        $ins['uuid'] = $form['uuid'];
        $uuid['uuid'] = $form['uuid'];
        $deletedRows = array_filter($form['deletedRow']);
        $userid = $this->accounts_model->getUser($uuid)->row_array()['id'];
        $ins['userid'] = $userid;
        $details = $form['details'];
        if( $where['id'] === '' )
        {
          $ins_id = $this->MA->insert($ins,'mobile_apps_master');
        }
        else
        {
          $ins['last_updated'] = date('Y-m-d h:i:s');
          $updated_id = $this->MA->update($where,$ins,'mobile_apps_master');
        }
        if( $details !== null )
        {
          foreach($details as $d)
          {
            $ins1['username'] = $d['username'];
            $ins1['password'] = $d['password'];
            $where1['id'] = $d['id'];
            $ins1['comments'] = $d['comments'];
            $ins1['userid'] = $userid;
            $ins1['uuid'] = $form['uuid'];
            if( $d['id'] === '' )
            {
              $ins1['parent_id'] = (isset($form['id']) && $form['id'] != 'undefined') ? $form['id'] : $ins_id;
              $detail_id = $this->MA->insert($ins1,'mobile_apps_details');
            }
            else
            {
              $ins1['last_updated'] = date('Y-m-d h:i:s');
              $detail_id = $this->MA->update($where1,$ins1,'mobile_apps_details');
            }
          }
          if( !empty($deletedRows) ){
            $this->deleteRows($deletedRows);
          }
          $output['message'] = "Apps saved successfully.";
        }
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
    
    public function list_get($id='')
    {
      $output['status'] = "success";
      try
      {
        $where['uuid'] = $id;
        $get = $this->MA->select($where,"mobile_apps_master");
        if( $get !== null )
        {
          $output['message'] = "Apps Found";
          $i=0;
          foreach($get as $details)
          {
            $output['data'][] = $details;
            $where1['parent_id'] = $details['id'];
            $output['data'][$i]['details'] = $this->MA->select($where1,"mobile_apps_details");
            $i++;
          }
        }
        else
          throw new Exception("No Apps Found.");
      }
      catch(Exception $e)
      {
				$output['status'] = "error";
				$output['message'] = $e->getMessage();
			}
      $this->response($output);
    }
    function remove_delete($id)
    {
      $output['status']    = 'success';
      try
      {
        $data = $this->MA->delete(array("id" => $id),"mobile_apps_master");
        $output['message'] = 'Apps removed successfully';
      }
      catch(Exception $e)
      {
        $output['status']   = 'error';
        $output['message']  = $e->getMessage();
      }

      $this->response($output);
    }
}
