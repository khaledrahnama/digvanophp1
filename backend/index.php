<?php
/**
 * Digvano Backend Index
 * Main entry point for API with health check
 */

require_once 'config/config.php';
require_once 'utils/response.php';

// Get the request path
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$scriptName = $_SERVER['SCRIPT_NAME'] ?? '';
$pathInfo = $_SERVER['PATH_INFO'] ?? '';

// Remove query string
$requestUri = parse_url($requestUri, PHP_URL_PATH);

// Normalize the path - remove /backend prefix if present
$requestUri = preg_replace('#^/backend#', '', $requestUri);
$requestUri = rtrim($requestUri, '/') ?: '/';

// Health check endpoint - works for /, /backend/, or /backend/index.php
if ($_SERVER['REQUEST_METHOD'] === 'GET' && ($requestUri === '/' || $requestUri === '/index.php' || empty($requestUri))) {
    Response::success([
        'status' => 'healthy',
        'service' => 'Digvano Backend API',
        'version' => '1.0.0',
        'timestamp' => time(),
        'endpoints' => [
            'POST /backend/api/contact.php' => 'Submit contact form',
            'POST /backend/api/chat.php' => 'AI chatbot interaction',
            'GET /backend/api/services.php' => 'Get services list',
            'GET /backend/api/faqs.php' => 'Get FAQs',
            'GET /backend/' => 'Health check'
        ]
    ]);
}

// Default 404 for undefined routes
Response::error('Endpoint not found', 404);
?>
