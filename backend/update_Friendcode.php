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
$sql = 'UPDATE gamifications 
        SET friendCode = COALESCE(NULLIF(friendCode, ""), ?) 
        WHERE user_id = ?';

$stm = $conn->prepare($sql);
$stm->bind_param('si', $code, $id); // 'si' for string and integer
$stm->execute();

// Check if any rows were updated
if ($stm->affected_rows > 0) {

        $sql2 = 'UPDATE gamifications set point = point + 100 , tasks_done = tasks_done +1  where user_id = ?';
        $stm2 = $conn->prepare($sql2);
        $stm2->bind_param('i',$id);
        $stm2->execute();

        $response['success'] = true;
        $response['message'] = 'Update successful';
    
    
} else {
    $response['success'] = false;
    $response['message'] = 'No changes are made';
}

echo json_encode($response);

$conn->close();
