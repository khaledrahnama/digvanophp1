<?php
/**
 * Quick Backend Test
 * Simple test to verify backend is accessible
 */

header('Content-Type: application/json');

$result = [
    'status' => 'ok',
    'message' => 'Backend is accessible!',
    'php_version' => PHP_VERSION,
    'server' => $_SERVER['SERVER_NAME'] ?? 'unknown',
    'request_uri' => $_SERVER['REQUEST_URI'] ?? 'unknown',
    'script_name' => $_SERVER['SCRIPT_NAME'] ?? 'unknown',
    'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'unknown',
    'current_dir' => __DIR__,
    'timestamp' => time()
];

// Try to load config
try {
    if (file_exists(__DIR__ . '/config/config.php')) {
        require_once __DIR__ . '/config/config.php';
        $result['config_loaded'] = true;
        $result['environment'] = defined('ENVIRONMENT') ? ENVIRONMENT : 'not defined';
    } else {
        $result['config_loaded'] = false;
        $result['config_error'] = 'config.php not found';
    }
} catch (Exception $e) {
    $result['config_loaded'] = false;
    $result['config_error'] = $e->getMessage();
}

// Try database
try {
    if (file_exists(__DIR__ . '/config/database.php')) {
        require_once __DIR__ . '/config/database.php';
        $database = new Database();
        $conn = $database->getConnection();
        $result['database_connected'] = $conn !== null;
    } else {
        $result['database_connected'] = false;
        $result['database_error'] = 'database.php not found';
    }
} catch (Exception $e) {
    $result['database_connected'] = false;
    $result['database_error'] = $e->getMessage();
}

echo json_encode($result, JSON_PRETTY_PRINT);

