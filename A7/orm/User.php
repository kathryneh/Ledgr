<?php

class User{
	private $user_id;
	private $firstName;
	private $lastName;
	private $email;

	public static function create($firstName, $lastName, $email) {
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$result = $mysqli->query("insert into user values (0, " . 
			                     $firstName . ", " . $lastName . ", " . $email . ")");
		if ($result) {
			$new_id = $mysqli->insert_id;
			return new User($user_id, $firstName, $lastName, $email);
		}
		return null;
	}

	public static function findByID($user_id){
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$result = $mysqli->query("select * from user where id=".$user_id );
		if($result){
			if ($result->num_rows==0){
				return null;
			}
			else{
				$user_info= $result->fetch_array();
				return new User($user_info['user_id'], $user_info['firstName'], $user_info['lastName'], $user_info['email']);
			}
		}
		return null;
	}

	public static function getUsers($query){
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$result = $mysqli->query('select user_id from user where firstName LIKE "%'.$query.'%" or lastName LIKE "%'.$query.'%" or email LIKE "%'.$query.'%" ');
		$users = array();

		if ($result){
			if($result->num_rows==0){
				return null;
			}
			$nextRow = $result->fetchrow();
			while ($nextRow){
				$users[] = User::findByID($nextRow[0]);
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
		return $this->id;
	}

	public function getName(){
		return $this->firstName . " " . $this->lastName;
	}

	public function getEmail(){
		return $this->email;
	}

	function updateEmail($new_email){
		$this->email = $new_email;
		return $this->update();
	}

	function updateFirstName($new_fName){
		$this->firstName = $new_fName;
		return $this->update();
	}

	private function update(){
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$result = $mysqli->query("update user set firstName=".$this->firstName.", lastName=".$this->lastName.", email=".$this->email." where id=".$this->email);
		return $result;
	}

	public function delete(){
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$result = $mysqli->query("delete from user where id=".$this->id);
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
			$nextRow = $result->fetchrow();
			while ($nextRow){
				$bills[] = Bills::findByID($nextRow[0]);
			}
		}
		return $bills;
	}

	public function getAllUsers(){
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$result = $mysqli->query("select user_id from user");
		if($result){
			return $result;
		}
		else{
			return null;
		}
	}
}

