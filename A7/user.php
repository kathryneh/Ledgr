<?php
	require_once('orm/User.php');
	if ($_SERVER['REQUEST_METHOD'] == 'GET'){
		if(is_null($_SERVER['PATH_INFO'])){
			if (!is_null($_GET['query'])) {
				$query = $_GET['query'];
				//return the array of users that matches that query
				$users = User::getUsers($query);
				if(is_null($users)){
					print("No users found.");
					exit();
				}
				print_r($users);
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
				header("Content-type: application/json");
				print(json_encode($users));
				//print_r(json_encode($users));
				exit();
			}
		}
		
		else{

			// if there is path info, that's an id
			$user_id = intval(substr($_SERVER['PATH_INFO'], 1));
			$user = User::findByID($user_id);
			print_r($user);
			if(is_null($_GET['delete'])){
				header("Content-type: application/json");
				print(json_encode($user->getJSON()));
				exit();
			}
			else{
				$result = $user->delete();
				header("Content-type: application/json");
				print(json_encode($result));
				exit();
			}
		}
	}
	else if ($_SERVER['REQUEST_METHOD'] == 'POST'){
		if(is_null($_SERVER['PATH_INFO'])){
			$userFirstName=$_POST['firstName'];
			if(is_null($userFirstName)){
				header("HTTP/1.1 400 Bad Request");
			    print("User first name is illegal");
			    exit();
			}
			$userLastName=$_POST['lastName'];
			if(is_null($userFirstName)){
				header("HTTP/1.1 400 Bad Request");
			    print("User last name is illegal");
			    exit();
			}
			$userEmail=$_POST['email'];
			if(is_null($userFirstName)){
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
			print("this case");
			
			$user = User::findByID($user_id);
			if (is_null($user)){
				header("HTTP/1.1 404 Not Found");
			    print("User id specified either not found or not legal");
			    exit();
			}
			if(!is_null($_POST['email'])){
				print("has an email");
				$userEmail = $_POST['email'];
				$user->updateEmail($userEmail);
				header("Content-type: application/json");
				print(json_encode($user->getJSON()));
				exit();
			}
			else if(!is_null($userid = $_POST['bills'])){
				$bills = $user->getBills($user_id);
				print(json_encode($bills->getJSON()));
			}
		}
	}

header("HTTP/1.1 400 Bad Request");
print("URL did not match any known action.");
?>