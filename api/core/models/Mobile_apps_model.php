<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

require_once(COREPATH.'libraries/models/App_model.php');

class Mobile_apps_model extends App_model
{
	protected $table = "";
	 
	function __construct()
	{
	  parent::__construct();
	}

  
	public function insert($data,$table=NULL)
	{
		$this->db->insert($table,$data);
		return $this->db->insert_id();
	}

	public function update($where,$data,$table=NULL)
	{
		$this->db->where($where);
		$this->db->update($table,$data);
	}

	public function select($where,$table=NULL)
	{
		$this->db->where($where);
		$q = $this->db->get($table);
		if($q->num_rows() > 0)
			return $q->result_array();
	}

	public function select_multiple($where,$table=NULL)
	{
		$this->db->where($where);
		$q = $this->db->get($table);
		return $q->result_array();
	}

	public function delete($where=array(),$table=NULL)
	{
		$this->db->where($where);
		$this->db->delete($table);
	}

}