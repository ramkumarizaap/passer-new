  <?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

require_once(COREPATH.'libraries/models/App_model.php');

class Accounts_model extends App_model
{
  function __construct()
  {
    parent::__construct();
    $this->_table = 'users';
  }
  
  public function insert($data,$table=NULL)
	{
		$this->db->insert($this->_table,$data);
		return $this->db->insert_id();
  }
  
  public function update($where,$data,$table=NULL)
	{
		$this->db->where($where);
		$this->db->update($this->_table,$data);
	}
  
  public function getUser($where)
	{
    $this->db->where($where);
		$q = $this->db->get($this->_table);
		return $q;
  }
  
    
}
?>