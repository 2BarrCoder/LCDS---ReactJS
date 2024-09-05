<?php
header('Content-Type: application/json');
session_start();
require('db_connect.php');

// Assuming you have stored the user ID in session
$id = $_SESSION['id'];

// Read POST data
$data = json_decode(file_get_contents('php://input'), true);
$code = $data['code']; // Adjust if the code is named differently in the request

// Update query
$sql = 'UPDATE gamifications SET Code = ? WHERE user_id = ?';
$stm = $conn->prepare($sql);
$stm->bind_param('si', $code, $id); // 'si' for string and integer
$stm->execute();

$response['success'] = true;
echo json_encode($response);

$conn->close();
