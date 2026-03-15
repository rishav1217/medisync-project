<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

session_start();
require_once "../config/db.php";

/* Only admin allowed */
if (!isset($_SESSION["role"]) || $_SESSION["role"] !== "ADMIN") {
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$id = $_POST["id"] ?? "";

$stmt = $conn->prepare("DELETE FROM users WHERE user_id=? AND role='DOCTOR'");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Delete failed"]);
}
