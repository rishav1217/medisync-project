<?php
session_start();
require_once __DIR__ . "/../config/db.php";

if (!isset($_SESSION["user_id"]) || $_SESSION["role"] !== "DOCTOR") {
    echo "Access denied ❌";
    exit;
}

// get doctor_id
$uid = $_SESSION["user_id"];
$d = mysqli_fetch_assoc(
    mysqli_query($conn, "SELECT doctor_id FROM doctors WHERE user_id = $uid")
);

$result = mysqli_query(
    $conn,
    "SELECT p.name, a.appt_date
     FROM appointments a
     JOIN patients p ON a.patient_id = p.patient_id
     WHERE a.doctor_id = {$d['doctor_id']}"
);
?>

<h2>My Appointments</h2>

<?php
if (mysqli_num_rows($result) === 0) {
    echo "No appointments yet.";
}

while ($row = mysqli_fetch_assoc($result)) {
    echo "<p>";
    echo "Patient: <b>{$row['name']}</b><br>";
    echo "Date: {$row['appt_date']}";
    echo "</p><hr>";
}
?>

<a href="dashboard.php">⬅ Back</a>
