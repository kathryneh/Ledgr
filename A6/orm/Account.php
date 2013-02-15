<?php
	
	//TODO need to support finding all of the vendors and account numbers associated with a user


	class Account{
		private $user_id;
		private $vendor_id;
		private $number;
	}

	public static function create($user_id, $vendor_id, $number){
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$prepQry= 'insert into account values (';
		$prepQry.= $user_id;
		$prepQry.= '", "';
		$prepQry.= $vendor_id;
		$prepQry.= '", "';
		$prepQry.= $number;
		$prepQry.= '")';
		$result = $mysqli->query($prepQry);
		if ($result) {
			return new Account($user_id, $vendor_id, $number);
		}
	}

	private function __construct($user_id, $vendor_id, $number){
		$this->user_id = $user_id;
		$this->vendor_id = $vendor_id;
		$this->number = $number;
	}

	public function getJSON(){
		$jsonAccount = array();
		$jsonAccount['user_id'] = $this->user_id;
		$jsonAccount['vendor_id'] = $this->vendor_id;
		$jsonAccount['number'] = $this->number;
		return $jsonAccount;
	}

	public static function findByID($user_id, $vendor_id){
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$result = $mysqli->query("select * from account where user_id=".$user_id."and vendor_id=".$vendor_id);
		if($result){
			if ($result->num_rows==0){
				return null;
			}
			else{
				$vendor_info= $result->fetch_array();
			return new Payee($payee_info['user_id'], 
			$vendor_info['vendor_id'], 
			$vendor_info['number']);
			}
		}
		return null;
	}

	function updateNumber($new_number){
		$this->number = $new_number;
		return $this->update();
	}

	private function update(){
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$prepQry = 'update account set number="';
		$prepQry.= $this->number;
		$prepQry.= '" where user_id=';
		$prepQry.= $this->user_id;
		$prepQry.= 'and vendor_id=';
		$prepQry.= $this->vendor_id;
		$result = $mysqli->query($prepQry);
		print($prepQry);
		return $result;
	}
	
?>