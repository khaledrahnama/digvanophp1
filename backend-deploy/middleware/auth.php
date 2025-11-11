<?php
/**
 * Authentication and Security Middleware
 * Protects API endpoints and validates requests
 */

class AuthMiddleware {
    /**
     * Validate API key (for future admin features)
     * @param string $requiredRole
     * @return bool
     */
    public static function validateApiKey($requiredRole = 'user') {
        $apiKey = self::getBearerToken();
        
        if (!$apiKey) {
            Response::error('API key required', 401);
            return false;
        }

        // In a real implementation, validate against database
        $validKeys = [
            'user' => 'digvano_user_key_2024',
            'admin' => 'digvano_admin_key_2024'
        ];

        if (!in_array($apiKey, array_values($validKeys))) {
            Response::error('Invalid API key', 401);
            return false;
        }

        return true;
    }

    /**
     * Get bearer token from header
     * @return string|null
     */
    private static function getBearerToken() {
        $headers = self::getAuthorizationHeader();
        
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        return null;
    }

    /**
     * Get authorization header
     * @return string|null
     */
    private static function getAuthorizationHeader() {
        $headers = null;
        
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER['Authorization']);
        } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $headers = trim($_SERVER['HTTP_AUTHORIZATION']);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            $requestHeaders = array_combine(
                array_map('ucwords', array_keys($requestHeaders)), 
                array_values($requestHeaders)
            );
            
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
        
        return $headers;
    }

    /**
     * Validate reCAPTCHA token
     * @param string $token
     * @return bool
     */
    public static function validateRecaptcha($token) {
        // For now, return true. Implement reCAPTCHA in production
        // $secretKey = 'your_recaptcha_secret_key';
        // $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$token");
        // $responseKeys = json_decode($response, true);
        // return intval($responseKeys["success"]) === 1;
        
        return true; // Remove this in production
    }

    /**
     * Rate limiting by IP address
     * @param string $endpoint
     * @param int $maxRequests
     * @param int $timeWindow
     * @return bool
     */
    public static function rateLimit($endpoint, $maxRequests = 100, $timeWindow = 3600) {
        $ip = self::getClientIp();
        $key = "rate_limit:{$endpoint}:{$ip}";
        
        // Simple in-memory rate limiting (use Redis in production)
        if (!isset($_SESSION[$key])) {
            $_SESSION[$key] = [
                'count' => 1,
                'reset_time' => time() + $timeWindow
            ];
        } else {
            if (time() > $_SESSION[$key]['reset_time']) {
                $_SESSION[$key] = [
                    'count' => 1,
                    'reset_time' => time() + $timeWindow
                ];
            } else {
                $_SESSION[$key]['count']++;
                
                if ($_SESSION[$key]['count'] > $maxRequests) {
                    Response::error('Rate limit exceeded', 429);
                    return false;
                }
            }
        }
        
        return true;
    }

    /**
     * Get client IP address
     * @return string
     */
    public static function getClientIp() {
        $ip = $_SERVER['REMOTE_ADDR'];
        
        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $ip = trim($ips[0]);
        } elseif (!empty($_SERVER['HTTP_X_REAL_IP'])) {
            $ip = $_SERVER['HTTP_X_REAL_IP'];
        }
        
        return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : '0.0.0.0';
    }
}
?>
