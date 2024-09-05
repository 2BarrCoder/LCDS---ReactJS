<?php
header('Content-Type: application/json');

include('db_connect.php');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch gallery data
$sql = "SELECT id, titre, img FROM galeries";
$result = $conn->query($sql);

$galleries = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $galleries[] = $row;
    }
} else {
    echo json_encode([]);
    exit;
}

// Log the data to server-side (PHP console)
error_log(print_r($galleries, true));

$conn->close();

// Return the data as JSON
echo json_encode($galleries);
