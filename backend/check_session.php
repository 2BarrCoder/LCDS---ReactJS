<?php
session_start();

header('Content-Type: application/json');

// Database connection parameters
include('db_connect.php');

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]));
}

$response = [
    'success' => false,
    'message' => 'Session invalid.',
];

if (isset($_SESSION['id'])) {
    $userId = $_SESSION['id']; // Retrieve user ID from session

    $stmt = $conn->prepare('SELECT name, email, adresse, phone FROM users WHERE id = ?');
    if ($stmt) {
        $stmt->bind_param('i', $userId);
        $stmt->execute();
        $stmt->bind_result($name, $email, $adresse, $phone);

        if ($stmt->fetch()) {
            // Set session data
            $_SESSION['name'] = $name;
            $_SESSION['email'] = $email;
            $_SESSION['phone'] = $phone;
            $_SESSION['address'] = $adresse;

            $response['success'] = true;
            $response['message'] = 'Session valid.';
            $response['user'] = [
                'id' => $userId,
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'address' => $adresse,
            ];
        } else {
            $response['message'] = 'User not found.';
        }

        $stmt->close();
    } else {
        $response['message'] = 'Failed to prepare SQL statement.';
    }
}

echo json_encode($response);

// Close connections
$conn->close();
