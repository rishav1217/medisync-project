<?php
session_start();

if (!isset($_SESSION["user_id"]) || $_SESSION["role"] !== "DOCTOR") {
    echo "Access denied ❌";
    exit;
}
?>

<h2>Doctor Dashboard</h2>

<ul>
    <li><a href="view_appointments.php">View Appointments</a></li>
    <li><a href="add_ehr.php">Add Patient EHR</a></li>
    <li><a href="../auth/logout.php">Logout</a></li>
</ul>
