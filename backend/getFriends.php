<?php
header('Content-Type: application/json');
session_start();
require('db_connect.php');

// Read POST data
$data = json_decode(file_get_contents('php://input'), true);
$code = $data['code'];

// Prepare and execute the SELECT query to get user IDs from gamifications
$sql = 'SELECT user_id FROM gamifications WHERE friendCode = ?';
$stm = $conn->prepare($sql);
$stm->bind_param('s', $code);
$stm->execute();

// Fetch the results
$result = $stm->get_result();
$userIds = array();
while ($row = $result->fetch_assoc()) {
    $userIds[] = $row['user_id'];
}

// Prepare and execute the SELECT query to get user names from users
$names = array();
if (!empty($userIds)) {
    // Create a placeholder string for the IN clause
    $placeholders = implode(',', array_fill(0, count($userIds), '?'));

    $sql = "SELECT id, name FROM users WHERE id IN ($placeholders)";
    $stm = $conn->prepare($sql);

    // Bind parameters dynamically
    $stm->bind_param(str_repeat('i', count($userIds)), ...$userIds);
    $stm->execute();

    // Fetch the results
    $result = $stm->get_result();
    while ($row = $result->fetch_assoc()) {
        $names[] = array(
            'id' => $row['id'],
            'name' => $row['name']
        );
    }
}

// Return the response
$response = array();
if (!empty($names)) {
    $response['success'] = true;
    $response['data'] = $names;
} else {
    $response['success'] = false;
    $response['message'] = 'No results found';
}

echo json_encode($response);

// Close connection
$stm->close();
$conn->close();
