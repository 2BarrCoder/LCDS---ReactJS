<?php

require 'db_connect.php'; // Assuming you have a database connection setup

// Function to check if the date is a weekend
function isWeekend($date)
{
    $dayOfWeek = date('N', strtotime($date));
    return ($dayOfWeek >= 6); // 6 = Saturday, 7 = Sunday
}

// Function to check if the date is in the past
function isPastDate($date)
{
    $currentDateTime = time();
    $appointmentDateTime = strtotime($date);
    return $appointmentDateTime < $currentDateTime;
}

// Function to check if the hour is available
function isHourAvailable($date, $db)
{
    $query = $db->prepare("SELECT * FROM reservations WHERE date = ?");
    $query->bind_param('s', $date); // 's' denotes the type of the parameter (string)
    $query->execute();
    $result = $query->get_result();

    // Check if any rows are returned
    if ($result->num_rows > 0) {
        return false; // Appointment already exists
    }

    return true; // No existing appointment found
}

// Function to add a new appointment
function addAppointment($appointmentInfo, $db)
{
    $appointmentDateTime = $appointmentInfo['date'] . ' ' . $appointmentInfo['time'];
    $fullDate = date('Y-m-d H:i:s', strtotime($appointmentDateTime));

    if (isWeekend($fullDate)) {
        return "The studio is closed on Saturdays and Sundays.";
    }

    if (isPastDate($fullDate)) {
        return "You cannot schedule an appointment in the past.";
    }

    if (!isHourAvailable($fullDate, $db)) {
        return "The selected time slot is already booked.";
    }

    // Insert the new appointment into the database
    $query = $db->prepare("INSERT INTO reservations (date, name, phone, email) VALUES (?, ?, ?, ?)");
    $query->bind_param('ssss', $fullDate, $appointmentInfo['name'], $appointmentInfo['phone'], $appointmentInfo['email']);
    $query->execute();

    return "Appointment successfully scheduled!";
}

// Collect appointment info from form-urlencoded data
$appointmentInfo = [
    'name' => $_POST['name'],
    'phone' => $_POST['phone'],
    'email' => $_POST['email'],
    'date' => $_POST['date'],  // Date part of the datetime
    'time' => $_POST['time']   // Time part of the datetime
];



// Check the connection
if ($conn->connect_error) {
    $response = ['message' => 'Connection failed: ' . $conn->connect_error];
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Add the appointment and get the message
$message = addAppointment($appointmentInfo, $conn);

// Close the connection
$conn->close();

// Set content type to JSON
header('Content-Type: application/json');

// Return the message as JSON
$response = ['message' => $message];
echo json_encode($response);
