<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
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

$appointment_id = $_POST["appointment_id"];
$patient_id = $_POST["patient_id"];
$diagnosis = $_POST["diagnosis"];
$prescription = $_POST["prescription"];
$notes = $_POST["notes"];

$stmt = $conn->prepare(
"INSERT INTO ehr
(appointment_id,doctor_id,patient_id,diagnosis,prescription,notes)
VALUES (?,?,?,?,?,?)"
);

$stmt->bind_param(
"iiisss",
$appointment_id,
$doctor_id,
$patient_id,
$diagnosis,
$prescription,
$notes
);

$stmt->execute();

echo json_encode([
"success"=>true
]);
