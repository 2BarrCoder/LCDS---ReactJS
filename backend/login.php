<?php
if(isset($_SESSION['id']))
session_destroy();


session_start();

header('Content-Type: application/json');

include('db_connect.php');

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]));
}

// Capture the POST data from the request
$postData = json_decode(file_get_contents("php://input"), true);

$email = $postData['email'] ?? '';
$password = $postData['password'] ?? '';

// Initialize response
$response = [
    'success' => false,
    'message' => 'Login failed.',
];

// Validate email and password
if (empty($email) || empty($password)) {
    $response['message'] = 'Email and password are required.';
    echo json_encode($response);
    exit;
}

// Search for the user in the database
$stmt = $conn->prepare('SELECT id,name,phone, password FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($userId,$name,$phone, $hashedPassword);
    $stmt->fetch();

    // Verify the password
    if (password_verify($password, $hashedPassword)) {
        session_regenerate_id(true);
        $_SESSION['id'] = $userId;
        $_SESSION['name'] = $name;
        $_SESSION['email'] = $email;
        $_SESSION['phone'] = $email;
        $response['success'] = true;
        $response['message'] = 'Login successful!';
    } else {
        $response['message'] = 'Incorrect password.';
    }
} else {
    $response['message'] = 'No user found with this email.';
}

echo json_encode($response);

// Close connections
$stmt->close();
$conn->close();
