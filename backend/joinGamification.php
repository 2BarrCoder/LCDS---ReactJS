<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

session_start(); // Start the session
include 'db_connect.php'; // Adjust path as needed

$response = array();

if (!isset($_SESSION['id'])) {
    $response['success'] = false;
    $response['message'] = 'Session ID not found';
    echo json_encode($response);
    exit;
}

$userId = $_SESSION['id'];

// Check if the user already has a gamification profile
$query = "SELECT level, point FROM gamifications WHERE user_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('i', $userId);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    if ($result->num_rows == 0) {
        // Insert a new gamification profile if none exists
        $query = "INSERT INTO gamifications (user_id, level, point) VALUES (?, 1, 0)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('i', $userId);

        if ($stmt->execute()) {
            $response['success'] = true;
            $_SESSION['registered'] = true;
            $response['message'] = 'Successfully joined the gamification platform';
            // Return the newly created profile details
            $response['data'] = array(
                'level' => 1,
                'point' => 0
            );
        } else {
            $response['success'] = false;
            $response['message'] = 'Failed to create gamification profile';
        }
    } else {
        // Return the existing profile details
        $profile = $result->fetch_assoc();
        $response['success'] = true;
        $response['message'] = 'User already has a gamification profile';
        $response['data'] = array(
            'level' => $profile['level'],
            'point' => $profile['point']
        );
    }
} else {
    $response['success'] = false;
    $response['message'] = 'Query execution failed';
}

$stmt->close();
echo json_encode($response);
