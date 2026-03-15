<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();
require_once "../config/db.php";

if (!isset($_SESSION["user_id"])) {

echo json_encode([
"success"=>false,
"error"=>"Not logged in"
]);

exit;

}

$patient_id = $_SESSION["user_id"];

$stmt = $conn->prepare(
"SELECT appointment_id,doctor_id,appointment_date,appointment_time,status
FROM appointments
WHERE patient_id=?"
);

$stmt->bind_param("i",$patient_id);
$stmt->execute();

$result = $stmt->get_result();

$appointments = [];

while($row = $result->fetch_assoc()){

$appointments[] = $row;

}

echo json_encode([
"success"=>true,
"appointments"=>$appointments
]);
