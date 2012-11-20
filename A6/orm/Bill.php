<?php

class Bill{
	private $bill_id;
	private $addDate;
	private $dueDate;
	private $amountDue;


		public static function create($addDate, $dueDate, $amountDue) {
			$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp42621db");
			$result = $mysqli->query("insert into bill values (0, " . 
				                     $addDate . ", " . $dueDate . ", " . $amountDue . ")");
			if ($result) {
				$new_id = $mysqli->insert_id;
				return new Bill($new_id, $player, $owner, $price);
			}
		return null;
	}
}