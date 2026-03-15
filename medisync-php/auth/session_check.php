<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();

if(isset($_SESSION["user_id"])){

echo json_encode([
"logged_in"=>true,
"user_id"=>$_SESSION["user_id"],
"username"=>$_SESSION["username"],
"role"=>$_SESSION["role"]
]);

}else{

echo json_encode([
"logged_in"=>false
]);

}
