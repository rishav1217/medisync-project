<?php
session_start();
require_once __DIR__ . "/../config/db.php";

// Optional role check (enable if you created PHARMACY users)
if (!isset($_SESSION["user_id"])) {
    echo "Access denied ❌";
    exit;
}

$result = mysqli_query(
    $conn,
    "SELECT 
        p.name AS patient,
        d.name AS doctor,
        e.prescription,
        e.created_at
     FROM ehr e
     JOIN patients p ON e.patient_id = p.patient_id
     JOIN doctors d ON e.doctor_id = d.doctor_id
     ORDER BY e.created_at DESC"
);
?>

<h2>Pharmacy – Prescriptions</h2>

<?php
if (mysqli_num_rows($result) === 0) {
    echo "No prescriptions available.";
}

while ($row = mysqli_fetch_assoc($result)) {
    echo "<hr>";
    echo "<b>Patient:</b> {$row['patient']}<br>";
    echo "<b>Doctor:</b> {$row['doctor']}<br>";
    echo "<b>Date:</b> {$row['created_at']}<br><br>";
    echo "<b>Prescription:</b><br>";
    echo nl2br($row['prescription']);
}
?>

<br>
<a href="../auth/logout.php">Logout</a>
