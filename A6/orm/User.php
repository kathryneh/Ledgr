<?php

class User{
	private $user_id;
	private $firstName;
	private $lastName;
	private $email;

	public static function create($firstName, $lastName, $email) {
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$prepQry= 'insert into user values (0, "';
		$prepQry.= $firstName;
		$prepQry.= '", "';
		$prepQry.= $lastName;
		$prepQry.= '", "';
		$prepQry.= $email;
		$prepQry.= '")';
		$result = $mysqli->query($prepQry);
		if ($result) {
			$new_id = $mysqli->insert_id;
			return new User($new_id, $firstName, $lastName, $email);
		}
	}

	public static function findByID($user_id){
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$result = $mysqli->query("select * from user where user_id=".$user_id );
		iuser_f($result){
			if ($result->num_rows==0){
				return null;
			}
			else{
				$user_info= $result->fetch_array();
				return new User($user_info['user_id'], 
				$user_info['firstName'], 
				$user_info['lastName'], 
				$user_info['email']);
			}
		}
		return null;
	}

	public static function getUsers($query){
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$result = $mysqli->query('select user_id from user where firstName LIKE "%'.$query.'%" or lastName LIKE "%'.$query.'%" or emailAddress LIKE "%'.$query.'%" ');
		$users = array();
		if ($result){
			if($result->num_rows==0){
				return null;
			}
			$nextRow = $result->fetch_row();
			while ($nextRow != NULL){
				$users[] = User::findByID($nextRow[0]);
				$nextRow = $result->fetch_row();
			}
		}
		return $users;
	}

	private function __construct($user_id, $firstName, $lastName, $email){
		$this->user_id = $user_id;
		$this->firstName = $firstName;
		$this->lastName = $lastName;
		$this->email = $email;
	}

	public function getUserId(){
		return $this->user_id;
	}

	public function getName(){
		return $this->firstName . " " . $this->lastName;
	}

	public function getEmail(){
		return $this->email;
	}

	function updateEmail($new_email){
		$this->email = $new_email;
		print($email);
		return $this->update();
	}

	function updateFirstName($new_fName){
		$this->firstName = $new_fName;
		return $this->update();
	}

	private function update(){
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$prepQry = 'update user set firstName="';
		$prepQry.= $this->firstName;
		$prepQry.= '", lastName="';
		$prepQry.= $this->lastName;
		$prepQry.= '", emailAddress="';
		$prepQry.= $this->email;
		$prepQry.= '" where user_id=';
		$prepQry.= $this->user_id;
		$result = $mysqli->query($prepQry);
		print($prepQry);
		return $result;
	}
	
	//update user set firstName="jack", lastname="sparrow", emailAddress="pirate" where user_id=8;

	public function delete(){
	print($this->user_id);
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$deleteqry = "delete from user where user_id=".intval($this->user_id);
		print($deleteqry);
		$result = $mysqli->query($deleteqry);
		return $result;
	}

	public function getJSON(){
		$jsonUser = array();
		$jsonUser['user_id'] = $this->user_id;
		$jsonUser['firstName'] = $this->firstName;
		$jsonUser['lastName'] = $this->lastName;
		$jsonUser['email'] = $this->email;
		return $jsonUser;
	}

	public function getBills(){
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$result = $mysqli->query("select bill_id from payee where user_id=".$this->user_id."");
		$bills = array();

		if ($result){
			if($result->num_rows==0){
				return null;
			}
			$nextRow = $result->fetch_row();
			while ($nextRow){
				$bills[] = Bills::findByID($nextRow[0]);
			}
		}
		return $bills;
	}

	public function getAllUsers(){
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$result = $mysqli->query("select user_id from user");
		$users = array();
		if($result){
			if($result->num_rows==0){
				return null;
			}
			$nextRow = $result->fetch_row();
			while($nextRow != NULL){
				//$temp = User::findByID($nextRow[0]);
				
				$users[] = $nextRow[0];
				$nextRow = $result->fetch_row();
			}
		}
		return $users;
	}
}
?>
