<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();
require_once "../config/db.php";

if(!isset($_SESSION["user_id"])){

echo json_encode([
"success"=>false,
"error"=>"Not logged in"
]);

exit;

}

$user_id = $_SESSION["user_id"];

$stmt = $conn->prepare("SELECT user_id, username FROM users WHERE user_id=?");
$stmt->bind_param("i",$user_id);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows==1){

$doctor = $result->fetch_assoc();

echo json_encode([
"success"=>true,
"doctor"=>$doctor
]);

}else{

echo json_encode([
"success"=>false,
"error"=>"Doctor not found"
]);

}
