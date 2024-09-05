<?php
session_start();
$_SESSION['id'] = '';
$_SESSION['name'] = '';
session_unset(); // Unset all session variables
session_destroy(); // Destroy the session

header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'message' => 'Logout successful.',
]);
