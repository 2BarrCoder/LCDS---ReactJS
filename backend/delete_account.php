<?php
session_start();
header('Content-Type: application/json');
require('db_connect.php');

$response = ['success' => false];

if (isset($_SESSION['id'])) {
    $id = intval($_SESSION['id']); // Sanitize input

    // Start transaction
    $conn->begin_transaction();

    try {
        // Check if a gamification profile exists for the user
        $checkSql = "SELECT COUNT(*) as count FROM gamifications WHERE user_id = $id";
        $result = $conn->query($checkSql);
        $row = $result->fetch_assoc();

        if ($row['count'] > 0) {
            // Delete gamification profile if it exists
            $sql2 = "DELETE FROM gamifications WHERE user_id = $id";
            $conn->query($sql2);
        }

        // Delete user account
        $sql = "DELETE FROM users WHERE id = $id";
        $conn->query($sql);

        // Commit transaction
        $conn->commit();
        $response['success'] = true;
    } catch (Exception $e) {
        // Rollback transaction on error
        $conn->rollback();
        $response['error'] = 'Failed to delete account: ' . $e->getMessage();
    }
} else {
    $response['error'] = 'User ID not found in session';
}

echo json_encode($response);
$conn->close();
