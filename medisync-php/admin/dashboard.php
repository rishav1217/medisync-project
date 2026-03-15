<?php
session_start();

if (!isset($_SESSION["user_id"]) || $_SESSION["role"] !== "ADMIN") {
    echo "Access denied ❌";
    exit;
}
?>

<h2>Admin Dashboard</h2>

<p>Welcome Admin 👋</p>

<ul>
    <li><a href="add_doctor.php">Add Doctor</a></li>
    <li><a href="../auth/logout.php">Logout</a></li>
</ul>
