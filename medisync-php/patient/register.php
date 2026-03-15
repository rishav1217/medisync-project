<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "../config/db.php";

$username = $_POST["username"] ?? "";
$password = $_POST["password"] ?? "";

if($username=="" || $password==""){

echo json_encode([
"success"=>false,
"error"=>"All fields required"
]);

exit;

}

$hashed = password_hash($password,PASSWORD_DEFAULT);

$stmt = $conn->prepare(
"INSERT INTO users (username,password,role) VALUES (?,?, 'PATIENT')"
);

$stmt->bind_param("ss",$username,$hashed);
$stmt->execute();

echo json_encode([
"success"=>true,
"message"=>"Patient registered successfully"
]);
