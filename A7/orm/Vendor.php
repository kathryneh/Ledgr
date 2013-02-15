<?php
class Vendor{
	private $vendor_id;
	private $vName;
	private $category;

	public static function create($vName, $category) {
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp42621db");
		$prepQry= 'insert into vendor values (0, "';
		$prepQry.= $vName;
		$prepQry.= '", "';
		$prepQry.= $category;
		$prepQry.= '")';
		$result = $mysqli->query($prepQry);

		if ($result->num_rows==0){
				return null;
		}
		else{
			$vendor_id= $result->insert_id;
			return new Vendor($vendor_id, $vName, $category);
		}
		return null;
	}
	public static function getVendors($query){
		$mysqli = new mysqli("classroom.cs.unc.edu", "kathryne", "comp426", "comp42621db");
		$result = $mysqli->query('select vendor_id from vendor where vName LIKE "%'.$query.'%" or category LIKE "%'.$query);
		$vendors = array();
		if ($result){
			if($result->num_rows==0){
				return null;
			}
			$nextRow = $result->fetch_row();
			while ($nextRow != NULL){
				$vendors[] = Vendor::findByID($nextRow[0]);
				$nextRow = $result->fetch_row();
			}
		}
		return $vendors;
	}

	private function __construct($vendor_id, $vName, $category){
		$this->vendor_id = $vendor_id;
		$this->vName = $vName;
		$this->category = $category;
	}

	public function getJSON(){
		$jsonVendor = array();
		$jsonVendor['vendor_id'] = $this->vendor_id;
		$jsonVendor['vName'] = $this->vName;
		$jsonVendor['category'] = $this->category;
		return $jsonVendor;
	}


}
?>