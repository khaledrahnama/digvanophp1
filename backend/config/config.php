<?php
/**
 * Digvano Backend Configuration
 * Secure configuration management for the IT services company backend
 */

// Environment configuration
define('ENVIRONMENT', 'production'); // Change to 'development' for local testing

// Security settings
define('ENABLE_CSRF_PROTECTION', true);
define('API_RATE_LIMIT', 100); // Requests per hour per IP
define('MAX_UPLOAD_SIZE', 10 * 1024 * 1024); // 10MB

// CORS settings for frontend integration
header('Access-Control-Allow-Origin: https://digvano.com');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400'); // 24 hours

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Error reporting based on environment
if (ENVIRONMENT === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Timezone setting
date_default_timezone_set('UTC');

// Session configuration (if needed for admin panel)
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.use_strict_mode', 1);
?>