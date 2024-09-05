<?php
header('Content-Type: application/json');
include 'db_connect.php'; // Include your database connection

$response = [];

$query = "SELECT id, title, description, point FROM tasks";
$result = mysqli_query($conn, $query);

if ($result) {
    $tasks = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $tasks[] = $row;
    }
    $response['success'] = true;
    $response['tasks'] = $tasks;
} else {
    $response['success'] = false;
}

echo json_encode($response);




