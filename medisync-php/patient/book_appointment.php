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

/* DEBUG (optional) */
// echo json_encode($_SESSION); exit;

if (!isset($_SESSION["user_id"])) {
    echo json_encode([
        "success" => false,
        "error" => "Not logged in",
        "session" => $_SESSION
    ]);
    exit;
}

$patient_id = $_SESSION["user_id"];

$doctor_id = $_POST["doctor_id"] ?? "";
$patient_name = $_POST["patient_name"] ?? "";
$patient_email = $_POST["patient_email"] ?? "";
$appointment_date = $_POST["appointment_date"] ?? "";
$appointment_time = $_POST["appointment_time"] ?? "";

if ($doctor_id == "" || $patient_name == "" || $appointment_date == "" || $appointment_time == "") {
    echo json_encode([
        "success" => false,
        "error" => "All fields required"
    ]);
    exit;
}

$stmt = $conn->prepare(
"INSERT INTO appointments
(doctor_id, patient_name, patient_email, appointment_date, appointment_time, status, patient_id)
VALUES (?,?,?,?,?,'Pending',?)"
);

$stmt->bind_param(
"issssi",
$doctor_id,
$patient_name,
$patient_email,
$appointment_date,
$appointment_time,
$patient_id
);

$stmt->execute();

echo json_encode([
    "success" => true,
    "message" => "Appointment booked successfully"
]);
