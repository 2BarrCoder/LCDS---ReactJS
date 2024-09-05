<?php
session_start();
include('db_connect.php');

// Retrieve data from the POST request
$name = $_POST['name'] ?? '';
$phone = $_POST['phone'] ?? '';
$address = $_POST['address'] ?? '';
$secondAddress = $_POST['secondAddress'] ?? '';
$profilePic = $_POST['profilePic'] ?? '';
$userId = $_SESSION['id'] ?? ''; // Assuming user ID is stored in session

// Check for any missing required fields
if (empty($userId) || empty($name)) {
    echo json_encode(['success' => false, 'message' => 'Required fields are missing.' ]);
    exit;
}

// Update the user's data in the database
$query = "UPDATE users SET name = '$name', phone = '$phone', adresse = '$address' WHERE id = $userId";
$result = mysqli_query($conn, $query);

if ($result) {
    // Update session variables with new data
    $_SESSION['user']['name'] = $name;
    $_SESSION['user']['phone'] = $phone;
    $_SESSION['user']['address'] = $address;
    /* $_SESSION['user']['secondAddress'] = $secondAddress;
    $_SESSION['user']['profilePic'] = $profilePic; */

    echo json_encode(['success' => true, 'user' => $_SESSION['user']]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update profile.']);
}
