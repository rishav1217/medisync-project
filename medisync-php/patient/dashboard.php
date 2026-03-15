<?php
session_start();

if (!isset($_SESSION["user_id"]) || $_SESSION["role"] !== "PATIENT") {
    echo "Access denied ❌";
    exit;
}
?>

<h2>Patient Dashboard</h2>

<ul>
    <li><a href="book_appointment.php">Book Appointment</a></li>
    <li><a href="view_ehr.php">View Medical Records</a></li>
    <li><a href="../auth/logout.php">Logout</a></li>
</ul>
