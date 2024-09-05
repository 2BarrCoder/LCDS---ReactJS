<?php
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

$name = $postData['name'] ?? '';
$email = $postData['email'] ?? '';
$password = $postData['password'] ?? '';

// Initialize response
$response = [
    'success' => false,
    'message' => 'Registration failed.',
];

// Validate email and password
if (empty($email) || empty($password)) {
    $response['message'] = 'Email and password are required.';
    echo json_encode($response);
    exit;
}

// Check if the email already exists
$stmt = $conn->prepare('SELECT id FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $response['message'] = 'Email already registered.';
    echo json_encode($response);
    exit;
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert the new user into the database
$stmt = $conn->prepare('INSERT INTO users (email, password,name) VALUES (?, ?,?)');
$stmt->bind_param('sss', $email, $hashedPassword,$name);

if ($stmt->execute()) {
    $response['success'] = true;
    $response['message'] = 'Registration successful!';
} else {
    $response['message'] = 'Failed to register user: ' . $stmt->error;
}

echo json_encode($response);

// Close connections
$stmt->close();
$conn->close();

?>