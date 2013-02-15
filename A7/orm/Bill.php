<?php

class Bill{
	private $bill_id;
	private $addDate;
	private $dueDate;
	private $amountDue;
	private $payees;


	public static function create($addDate, $dueDate, $amountDue) {
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp42621db");
		$prepQry= 'insert into bill values (0, "';
		$prepQry.= $addDate;
		$prepQry.= '", "';
		$prepQry.= $dueDate;
		$prepQry.= '", "';
		$prepQry.= $amountDue;
		$prepQry.= '")';
		$result = $mysqli->query($prepQry);

		if ($result->num_rows==0){
				return null;
		}
		else{
			$bill_id= $result->insert_id;
			return new Bill($bill_id, $addDate, $dueDate, $amountDue);
		}
	return null;
	}

	private function __construct($bill_id, $addDate, $dueDate, $amountDue){
		$this->bill_id = $bill_id;
		$this->addDate = $addDate;
		$this->dueDate = $dueDate;
		$this->amountDue = $amountDue;
		$this->payees = getPayees($bill_id);
	}

	public static function findByID($bill_id){
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$result = $mysqli->query("select * from bill where bill_id=".$bill_id );
		if($result){
			if ($result->num_rows==0){
				return null;
			}
			else{
				$bill_info= $result->fetch_array();
			return new Bill($bill_info['bill_id'], 
			$bill_info['addDate'], 
			$bill_info['dueDate'], 
			$bill_info['amountDue']);
			}
		}
		return null;
	}
	public function delete(){
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$deleteqry = "delete from bill where bill_id=".intval($this->bill_id);
		$result = $mysqli->query($deleteqry);
		return $result;
	}
	private function update(){
		getPayees();
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$prepQry = 'update bill set amountDue="';
		$prepQry.= $this->amountDue;
		$prepQry.= '", addDate="';
		$prepQry.= $this->addDate;
		$prepQry.= '", dueDate="';
		$prepQry.= $this->dueDate;
		$prepQry.= '" where bill_id=';
		$prepQry.= $this->bill_id;
		$result = $mysqli->query($prepQry);
		print($prepQry);
		return $result;
	}

	public function getBillId(){
		return $this->bill_id;
	}

	public function getDueDate(){
		return $this->dueDate;
	}

	public function getAddDate(){
		return $this->addDate;
	}
	public function getAmountDue(){
		return $this->amountDue;
	}

	//need a function that sums up all of the amount paid from all of the payees;
	public function getAmountPaid(){
		$amountPaid = 0;
		foreach ($payees as $p) {
			$amountPaid = $amountPaid + $p->getAmountPaid();
		}
		return $amountPaid;
	}

	function updateAmountDue($new_amtDue){
		$this->amountDue = $new_amtmDue;
		return $this->update();
	}
	function updateDueDate($new_dueDate){
		$this->dueDate = $new_dueDate;
		return $this->update();
	}

	public function getJSON(){
		$jsonUser = array();
		$jsonUser['bill_id'] = $this->bill_id;
		$jsonUser['addDate'] = $this->addDate;
		$jsonUser['dueDate'] = $this->dueDate;
		$jsonUser['amountDue'] = $this->amountDue;
		$jsonBill['payees'] = $this->payees;
		return $jsonBill;
	}


	public function getPayees($id){
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$result = $mysqli->query("select payee_id from payee where bill_id=".$id."");
		$payees = array();

		if ($result){
			if($result->num_rows==0){
				return null;
			}
			$nextRow = $result->fetch_row();
			while ($nextRow){
				$payees[] = Payee::findByID($nextRow[0]);
			}
		}
		$this->payees = $payees;
		return $payees;
	}


}
?>