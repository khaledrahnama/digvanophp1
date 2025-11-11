<?php
/**
 * Database Configuration and Connection Management
 * Secure database handling for Digvano IT services
 */

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;
    private $options;

    public function __construct() {
        // Load environment-based configuration
        $this->loadConfig();
        
        // PDO options for security and performance
        $this->options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_PERSISTENT => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8mb4'",
            PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false
        ];
    }

    /**
     * Load database configuration based on environment
     */
    private function loadConfig() {
        if (getenv('CLEARDB_DATABASE_URL')) {
            // Heroku ClearDB configuration
            $url = parse_url(getenv('CLEARDB_DATABASE_URL'));
            $this->host = $url['host'] ?? 'localhost';
            $this->username = $url['user'] ?? 'root';
            $this->password = $url['pass'] ?? '';
            $this->db_name = substr($url['path'] ?? '/digvano', 1);
        } else {
            // Local development configuration
            $this->host = 'localhost';
            $this->db_name = 'digvano';
            $this->username = 'digvano_user';
            $this->password = 'secure_password_123';
        }
    }

    /**
     * Get database connection
     * @return PDO|null
     */
    public function getConnection() {
        $this->conn = null;

        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4";
            $this->conn = new PDO($dsn, $this->username, $this->password, $this->options);
            
            // Log successful connection (in development)
            if (ENVIRONMENT === 'development') {
                error_log("Database connection established successfully");
            }
            
        } catch(PDOException $exception) {
            // Secure error logging
            error_log("Database connection error: " . $exception->getMessage());
            
            // User-friendly error message
            if (ENVIRONMENT === 'development') {
                die("Connection error: " . $exception->getMessage());
            } else {
                die("Database connection failed. Please try again later.");
            }
        }

        return $this->conn;
    }

    /**
     * Test database connection
     * @return bool
     */
    public function testConnection() {
        try {
            $conn = $this->getConnection();
            return $conn !== null;
        } catch (Exception $e) {
            return false;
        }
    }
}

// Global database instance
$database = new Database();
?>