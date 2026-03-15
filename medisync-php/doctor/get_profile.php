<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();
require_once "../config/db.php";

if (!isset($_SESSION["user_id"]) || $_SESSION["role"] !== "DOCTOR") {
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$id = $_SESSION["user_id"];

$stmt = $conn->prepare(
    "SELECT user_id, username FROM users WHERE user_id=?"
);

$stmt->bind_param("i", $id);
$stmt->execute();

$result = $stmt->get_result();

echo json_encode($result->fetch_assoc());
