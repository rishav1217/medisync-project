<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

session_start();
require_once "../config/db.php";

if(!isset($_SESSION["user_id"])){

echo json_encode([
"success"=>false,
"error"=>"Not logged in"
]);

exit;

}

$id = $_POST["appointment_id"] ?? "";
$status = $_POST["status"] ?? "";

$stmt = $conn->prepare(
"UPDATE appointments SET status=? WHERE appointment_id=?"
);

$stmt->bind_param("si",$status,$id);
$stmt->execute();

echo json_encode([
"success"=>true
]);
