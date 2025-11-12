<?php
class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;
    private $options;

    public function __construct() {
        $this->loadConfig();
        $this->options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_PERSISTENT => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8mb4'",
            PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false
        ];
    }

    private function loadConfig() {
        if (getenv('CLEARDB_DATABASE_URL')) {
            // Heroku configuration (not used for Hostinger)
            $url = parse_url(getenv('CLEARDB_DATABASE_URL'));
            $this->host = $url['host'] ?? 'localhost';
            $this->username = $url['user'] ?? 'root';
            $this->password = $url['pass'] ?? '';
            $this->db_name = substr($url['path'] ?? '/digvano', 1);
        } else {
            // 🎯 HOSTINGER DATABASE CREDENTIALS - UPDATE THESE! 🎯
            $this->host = 'localhost';
            $this->db_name = 'u758823426_digvano'; // Your database name
            $this->username = 'u758823426_userdigvano'; // Your database username
            $this->password = 'KkMm4949@@'; // Your database password
        }
    }

    public function getConnection() {
        $this->conn = null;
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4";
            $this->conn = new PDO($dsn, $this->username, $this->password, $this->options);
            
            if (ENVIRONMENT === 'development') {
                error_log("Database connection established successfully");
            }
            
        } catch(PDOException $exception) {
            error_log("Database connection error: " . $exception->getMessage());
            
            if (ENVIRONMENT === 'development') {
                die("Connection error: " . $exception->getMessage());
            } else {
                die("Database connection failed. Please try again later.");
            }
        }
        return $this->conn;
    }

    public function testConnection() {
        try {
            $conn = $this->getConnection();
            return $conn !== null;
        } catch (Exception $e) {
            return false;
        }
    }
}

$database = new Database();
?>