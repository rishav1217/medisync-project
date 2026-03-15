<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once "../config/db.php";

$result = $conn->query(
"SELECT user_id, username FROM users WHERE role='DOCTOR'"
);

$doctors = [];

while($row = $result->fetch_assoc()){
    $doctors[] = $row;
}

echo json_encode([
"success"=>true,
"doctors"=>$doctors
]);
