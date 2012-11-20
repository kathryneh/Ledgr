<?php
	require_once('orm/User.php');

	if ($_SERVER['REQUEST_METHOD'] == 'GET'){
		if(is_null($_SERVER['PATH_INFO'])){

			if (!is_null($_GET['query'])) {
				//return the array of users that matches that query
				$users = User::getUsers($query);
				if(is_null($userArr)){
					print("No users found.");
				}
				$queryUsers = array();
				foreach ($users as $u) {
					$queryUsers[] = $u->getName() . " (". $u->getEmail() . ")";
				}
				header("Content-type: application/json");
				print(json_encode($queryUsers));
				exit();
			}

			// if no path info, return all users
			else{
				$users = User::getAllUsers();
				$user_ids = array();
				foreach($users as $u){
					$user_ids = $u->getUserId();
				}
				header("Content-type: application/json");
				print(json_encode($user_ids));
				exit();
			}
		}
		else{
			// if there is path info, that's an id
			$user_id = intval(substr($_SERVER['PATH_INFO'], 1));
			$user = User::findById($user_id);

			if(is_null($_GET['delete'])){
				header("Content-type: application/json");
				print(json_encode($user->getJSON()));
				exit();
			}
			else{
				$user->delete();
				header("Content-type: application/json");
				print(json_encode(true));
				exit();
			}
		}
	}
	else if ($_SERVER['REQUEST_METHOD'] == 'POST'){
		if(is_null($_SERVER['PATH_INFO'])){
			$userFirstName=$_POST['firstName'];
			if(is_null($userFirstName){
				header("HTTP/1.1 400 Bad Request");
			    print("User first name is illegal");
			    exit();
			}
			$userLastName=$_POST['lastName'];
			if(is_null($userFirstName){
				header("HTTP/1.1 400 Bad Request");
			    print("User last name is illegal");
			    exit();
			}
			$userEmail=$_POST['email'];
			if(is_null($userFirstName){
				header("HTTP/1.1 400 Bad Request");
			    print("User email is illegal");
			    exit();
			}
			$user = User::create($userFirstName, $userLastName, $userEmail);
			if(is_null($user)){
				header("HTTP/1.1 400 Bad Request");
			    print("User failed at database");
			    exit();
			}
			header("Content-type: application/json");
		    print(json_encode($user->getJSON()));
		    exit();
		}
		else{
			$user_id = intval(substr($_SERVER['PATH_INFO'],1));
			$user = User::findByID($user_id);
			if (is_null($user)){
				header("HTTP/1.1 404 Not Found");
			    print("User id specified either not found or not legal");
			    exit();
			}
			if(!is_null($_POST['email'])){
				$userEmail = $_POST['email']
				$user->setEmail($userEmail);
				header("Content-type: application/json");
				print(json_encode($user->getJSON));
				exit();
			}
			else if(!is_null($userid = $_POST['bills']){
				$bills = $user->getBills($user_id);
				print(json_encode($bills->getJSON));
			}
		}
	}		
}
header("HTTP/1.1 400 Bad Request");
print("URL did not match any known action.");
?>