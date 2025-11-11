<?php
/**
 * FAQ API Endpoint
 * Provides frequently asked questions data
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

    $category = $_GET['category'] ?? null;
    
    $sql = "SELECT id, question, answer, category, sort_order 
            FROM faqs 
            WHERE is_active = TRUE";
    
    if ($category) {
        $sql .= " AND category = :category";
    }
    
    $sql .= " ORDER BY sort_order ASC";
    
    $stmt = $conn->prepare($sql);
    
    if ($category) {
        $stmt->bindParam(':category', $category);
    }
    
    $stmt->execute();
    $faqs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    Response::success($faqs, 'FAQs retrieved successfully');

} catch (Exception $e) {
    error_log("FAQ API error: " . $e->getMessage());
    Response::error('Failed to retrieve FAQs', 500);
}
?>