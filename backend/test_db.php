<?php
/**
 * Database Connection Test
 * Use this file to verify database connectivity on Hostinger
 */

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

try {
    // Include database configuration
    require_once 'config/database.php';
    
    // Create database instance
    $database = new Database();
    
    // Test connection
    $connection = $database->getConnection();
    
    if ($connection) {
        // Test query to verify database access
        $stmt = $connection->query("SELECT 1 as test_value, NOW() as current_time");
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Get database info
        $db_info = [
            'status' => 'success',
            'message' => 'Database connection established successfully!',
            'database' => [
                'connection' => 'active',
                'test_query' => $result,
                'timestamp' => date('Y-m-d H:i:s')
            ],
            'server' => [
                'php_version' => PHP_VERSION,
                'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'
            ]
        ];
        
        echo json_encode($db_info, JSON_PRETTY_PRINT);
        
    } else {
        throw new Exception('Failed to establish database connection');
    }
    
} catch (Exception $e) {
    // Detailed error information
    $error_info = [
        'status' => 'error',
        'message' => $e->getMessage(),
        'details' => [
            'error_type' => get_class($e),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'timestamp' => date('Y-m-d H:i:s')
        ],
        'troubleshooting' => [
            '1. Check database credentials in config/database.php',
            '2. Verify database exists in Hostinger MySQL',
            '3. Confirm database user has proper permissions',
            '4. Check if database server is running'
        ]
    ];
    
    http_response_code(500);
    echo json_encode($error_info, JSON_PRETTY_PRINT);
}
?>