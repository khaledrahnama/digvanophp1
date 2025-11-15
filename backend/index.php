<?php
/**
 * Digvano Backend Index
 * Main entry point for API with health check
 */

require_once 'config/config.php';
require_once 'utils/response.php';

// Health check endpoint
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/') {
    Response::success([
        'status' => 'healthy',
        'service' => 'Digvano Backend API',
        'version' => '1.0.0',
        'timestamp' => time(),
        'endpoints' => [
            'POST /api/contact' => 'Submit contact form',
            'POST /api/chat' => 'AI chatbot interaction',
            'GET /api/services' => 'Get services list',
            'GET /api/faqs' => 'Get FAQs',
            'GET /health' => 'Health check'
        ]
    ]);
}

// Default 404 for undefined routes
Response::error('Endpoint not found', 404);
?>