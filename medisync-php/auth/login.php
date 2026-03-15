<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

session_set_cookie_params([
"path" => "/",
"httponly" => true,
"samesite" => "Lax"
]);

session_start();

require_once "../config/db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
echo json_encode([
"success"=>false,
"error"=>"Invalid request method"
]);
exit;
}

$username = $_POST["username"] ?? "";
$password = $_POST["password"] ?? "";

$stmt = $conn->prepare(
"SELECT user_id,username,password,role FROM users WHERE username=?"
);

$stmt->bind_param("s",$username);
$stmt->execute();

$result = $stmt->get_result();

if($result->num_rows!==1){

echo json_encode([
"success"=>false,
"error"=>"Invalid username or password"
]);

exit;

}

$user = $result->fetch_assoc();

if(!password_verify($password,$user["password"])){

echo json_encode([
"success"=>false,
"error"=>"Invalid username or password"
]);

exit;

}

$_SESSION["user_id"] = $user["user_id"];
$_SESSION["username"] = $user["username"];
$_SESSION["role"] = $user["role"];

echo json_encode([
"success"=>true,
"role"=>$user["role"]
]);
