<?php
	
	class Payee{
		private $user_id;
		private $bill_id;
		private $paid;
		private $due;
		private $owner;

		public static function create($user_id, $bill_id, $paid, $due, $owner) {
			$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
			$prepQry= 'insert into payee values (';
			$prepQry.= $user_id;
			$prepQry.= ', ';
			$prepQry.= $bill_id;
			$prepQry.= ', ';
			$prepQry.= $paid;
			$prepQry.= ', ';
			$prepQry.= $due;
			$prepQry.= ', ';
			$prepQry.= $owner;
			$prepQry.= ')';
			$result = $mysqli->query($prepQry);
			if ($result) {
				return new Payee($user_id, $bill_id, $paid, $due, $owner);
			}
		}
		private function __construct($user_id, $bill_id, $paid, $due, $owner){
			$this->bill_id = $bill_id;
			$this->user_id = $user_id;
			$this->paid = $paid;
			$this->due = $due;
			$this->owner = $owner;
		}

		private function update(){
			$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
			$prepQry = 'update payee set paid="';
			$prepQry.= $this->paid;
			$prepQry.= '", due="';
			$prepQry.= $this->due;
			$prepQry.= '", owner="';
			$prepQry.= $this->owner;
			$prepQry.= '" where bill_id=';
			$prepQry.= $this->bill_id;
			$prepQry.= 'and user_id=';
			$prepQry.= $this->user_id;
			$result = $mysqli->query($prepQry);
			print($prepQry);
			return $result;
		}

		function updateDue($new_due){
			$this->due = $new_due;
			return $this->update();
		}
		function updatePaid($new_paid){
			$this->paid = $new_paid;
			return $this->update();
		}

		public function getAmountPaid(){
			return $this->paid;
		}
		
		public function getAmountDue(){
			return $this->due;
		}

		public function isOwner(){
			return $this->owner;
		}

		public function getBillID(){
			return $this->bill_id;
		}

		public function getUserID(){
			return $this->user_id;
		}

		public function delete(){
			$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
			$deleteqry = "delete from payee where user_id=".intval($this->user_id)." and bill_id=".intval($this->bill_id);
			$result = $mysqli->query($deleteqry);
			return $result;
		}

		public static function findByID($user_id, $bill_id){
			$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
			$result = $mysqli->query("select * from payee where user_id=".$user_id."and bill_id=".$bill_id);
			if($result){
				if ($result->num_rows==0){
					return null;
				}
				else{
					$payee_info= $result->fetch_array();
				return new Payee($payee_info['user_id'], 
				$payee_info['bill_id'], 
				$payee_info['paid'], 
				$payee_info['due'], 
				$payee_info['owner']);
				}
			}
			return null;
		}

		public function getJSON(){
			$jsonPayee = array();
			$jsonPayee['user_id'] = $this->user_id;
			$jsonPayee['bill_id'] = $this->bill_id;
			$jsonPayee['paid'] = $this->paid;
			$jsonPayee['due'] = $this->due;
			$jsonPayee['owner'] = $this->owner;
			return $jsonPayee;
		}
	}
?>