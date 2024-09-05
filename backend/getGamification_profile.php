<?php
header('Content-Type: application/json');
require('db_connect.php');
global $conn;

// Check if the session is started and user_id is set
session_start();
if (!isset($_SESSION['id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'User not logged in'
    ]);
    exit;
}

$userId = $_SESSION['id'];

$sql = "SELECT * FROM gamifications WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $profile = $result->fetch_assoc();
    echo json_encode([
        'success' => true,
        'data' => $profile
    ]);
} else {
    echo json_encode([
        'success' => true,
        'data' => null
    ]);
}
