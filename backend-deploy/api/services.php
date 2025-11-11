<?php
/**
 * Services API Endpoint
 * Provides services data for the frontend
 */

require_once '../config/config.php';
require_once '../config/database.php';
require_once '../utils/response.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://digvano.com');
header('Access-Control-Allow-Methods: GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $database = new Database();
    $conn = $database->getConnection();

    $sql = "SELECT id, title, slug, description, icon, features, sort_order 
            FROM services 
            WHERE is_active = TRUE 
            ORDER BY sort_order ASC";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Decode JSON features
    foreach ($services as &$service) {
        if ($service['features']) {
            $service['features'] = json_decode($service['features'], true);
        }
    }

    Response::success($services, 'Services retrieved successfully');

} catch (Exception $e) {
    error_log("Services API error: " . $e->getMessage());
    Response::error('Failed to retrieve services', 500);
}
?>