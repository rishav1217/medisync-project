<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once "config/db.php"; // adjust if path differs

$response = [
    "success" => false,
    "error" => ""
];

// Read POST data
$username = isset($_POST["username"]) ? trim($_POST["username"]) : "";
$password = isset($_POST["password"]) ? trim($_POST["password"]) : "";

if ($username === "" || $password === "") {
    $response["error"] = "Username or password missing";
    echo json_encode($response);
    exit;
}

// Fetch user
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows !== 1) {
    $response["error"] = "Invalid username or password";
    echo json_encode($response);
    exit;
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user["password"])) {
    $response["error"] = "Invalid username or password";
    echo json_encode($response);
    exit;
}

// SUCCESS
$response["success"] = true;
$response["role"] = $user["role"];
$response["user_id"] = $user["user_id"];

echo json_encode($response);
