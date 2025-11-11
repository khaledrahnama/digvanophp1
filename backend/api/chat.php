<?php
/**
 * Contact Form API Endpoint
 * Handles contact form submissions with validation and security
 */

require_once '../config/config.php';
require_once '../config/database.php';
require_once '../utils/response.php';
require_once '../middleware/auth.php';

// Set headers for API response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://digvano.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    Response::error('Method not allowed', 405);
}

try {
    // Rate limiting
    AuthMiddleware::rateLimit('contact_form', 10, 3600); // 10 requests per hour
    
    // Get and validate JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        Response::error('Invalid JSON input');
    }

    // Validate required fields
    $errors = [];
    $required = ['name', 'email', 'message', 'service_type'];
    
    foreach ($required as $field) {
        if (empty($input[$field])) {
            $errors[$field] = "This field is required";
        }
    }

    // Validate email format
    if (!empty($input['email']) && !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email format";
    }

    // Validate service type
    $validServices = [
        'ai_data_solutions', 'software_development', 'iot_integration',
        'web_app_development', 'procurement', 'maintenance'
    ];
    
    if (!empty($input['service_type']) && !in_array($input['service_type'], $validServices)) {
        $errors['service_type'] = "Invalid service type";
    }

    // Return validation errors if any
    if (!empty($errors)) {
        Response::validationError($errors);
    }

    // Sanitize input data
    $name = htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
    $company = !empty($input['company']) ? htmlspecialchars(trim($input['company']), ENT_QUOTES, 'UTF-8') : null;
    $service_type = $input['service_type'];
    $budget_range = !empty($input['budget_range']) ? $input['budget_range'] : null;
    $message = htmlspecialchars(trim($input['message']), ENT_QUOTES, 'UTF-8');

    // Get client information
    $ip_address = AuthMiddleware::getClientIp();
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';

    // Connect to database
    $database = new Database();
    $conn = $database->getConnection();

    // Prepare SQL statement
    $sql = "INSERT INTO contacts (name, email, company, service_type, budget_range, message, ip_address, user_agent) 
            VALUES (:name, :email, :company, :service_type, :budget_range, :message, :ip_address, :user_agent)";
    
    $stmt = $conn->prepare($sql);
    
    // Bind parameters
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':company', $company);
    $stmt->bindParam(':service_type', $service_type);
    $stmt->bindParam(':budget_range', $budget_range);
    $stmt->bindParam(':message', $message);
    $stmt->bindParam(':ip_address', $ip_address);
    $stmt->bindParam(':user_agent', $user_agent);

    // Execute query
    if ($stmt->execute()) {
        // Log successful submission
        error_log("Contact form submitted: {$email} - {$service_type}");
        
        // Send success response
        Response::success(null, 'Thank you for your message! We will get back to you within 24 hours.', 201);
    } else {
        throw new Exception('Failed to save contact information');
    }

} catch (Exception $e) {
    // Log error
    error_log("Contact form error: " . $e->getMessage());
    
    // Send error response
    Response::error('An error occurred while processing your request. Please try again.', 500);
}
?>