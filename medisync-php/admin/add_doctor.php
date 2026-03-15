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

/* ✅ SECURITY: Only ADMIN can add doctor */
if (!isset($_SESSION["role"]) || $_SESSION["role"] !== "ADMIN") {
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$specialization = trim($_POST["specialization"] ?? "");

if ($name === "" || $email === "" || $specialization === "") {
    echo json_encode(["error" => "All fields required"]);
    exit;
}

/* 🔐 Auto-generate username & password */
$username = strtolower(str_replace(" ", "", $name)) . rand(100,999);
$plainPassword = "doc@" . rand(1000,9999);
$hashedPassword = password_hash($plainPassword, PASSWORD_DEFAULT);

/* Insert into users table */
$stmt = $conn->prepare(
    "INSERT INTO users (username, password, role) VALUES (?, ?, 'DOCTOR')"
);
$stmt->bind_param("ss", $username, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "username" => $username,
        "password" => $plainPassword
    ]);
} else {
    echo json_encode(["error" => "Doctor already exists"]);
}
