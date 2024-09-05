<?php

header('Content-Type: application/json');
require('db_connect.php');

$email = $_SERVER['HTTP_EMAIL'];
$response = array();

    



if (!$email) {
    $response['success'] = false;
    $response['message'] = 'No email provided';
    echo json_encode($response);
    exit;
}

$sql = "SELECT email FROM abonnements WHERE email = ?";
$stm = $conn->prepare($sql);

if ($stm) {
    $stm->bind_param('s', $email);
    $stm->execute();
    $stm->store_result();  // Store result to check if any row is fetched

    if ($stm->num_rows > 0) {
        $response['success'] = false;
        $response['message'] = 'Email already subscribed';
    } else {
        $response['success'] = true;
        $sql2 = "INSERT INTO abonnements (email,created_at,updated_at) VALUES (?,NOW(),NOW())";
        $stm2 = $conn->prepare($sql2);
        $stm2->bind_param('s', $email);
        $stm2->execute();
    }
} else {
    $response['success'] = false;
    $response['message'] = 'Failed to prepare statement';
}

echo json_encode($response);
$conn->close();
