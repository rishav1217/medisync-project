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

$doctor_id = $_SESSION["user_id"];

$stmt = $conn->prepare(
"SELECT * FROM appointments WHERE doctor_id=?"
);

$stmt->bind_param("i",$doctor_id);
$stmt->execute();

$result = $stmt->get_result();

$data = [];

while($row = $result->fetch_assoc()){

$data[] = $row;

}

echo json_encode([
"success"=>true,
"appointments"=>$data
]);
