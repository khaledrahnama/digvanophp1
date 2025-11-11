<?php
/**
 * API Response Utility
 * Standardized JSON responses for Digvano API
 */

class Response {
    /**
     * Send success response
     * @param mixed $data
     * @param string $message
     * @param int $statusCode
     */
    public static function success($data = null, $message = 'Success', $statusCode = 200) {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        
        $response = [
            'success' => true,
            'message' => $message,
            'data' => $data,
            'timestamp' => time()
        ];
        
        echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        exit;
    }

    /**
     * Send error response
     * @param string $message
     * @param int $statusCode
     * @param mixed $errors
     */
    public static function error($message = 'Error occurred', $statusCode = 400, $errors = null) {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        
        $response = [
            'success' => false,
            'message' => $message,
            'errors' => $errors,
            'timestamp' => time()
        ];
        
        echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        exit;
    }

    /**
     * Send validation error response
     * @param array $validationErrors
     */
    public static function validationError($validationErrors) {
        self::error('Validation failed', 422, $validationErrors);
    }

    /**
     * Check if request is AJAX/API
     * @return bool
     */
    public static function isApiRequest() {
        return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
               strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }
}
?>