<?php
/**
 * Contact Model
 * Handles contact-related database operations
 */

class Contact {
    private $conn;
    private $table_name = "contacts";

    public function __construct($db) {
        $this->conn = $db;
    }

    /**
     * Create new contact submission
     */
    public function create($data) {
        $query = "INSERT INTO " . $this->table_name . " 
                  (name, email, company, service_type, budget_range, message, ip_address, user_agent) 
                  VALUES (:name, :email, :company, :service_type, :budget_range, :message, :ip_address, :user_agent)";
        
        $stmt = $this->conn->prepare($query);
        
        // Sanitize data
        $name = htmlspecialchars(strip_tags($data['name']));
        $email = htmlspecialchars(strip_tags($data['email']));
        $company = isset($data['company']) ? htmlspecialchars(strip_tags($data['company'])) : null;
        $message = htmlspecialchars(strip_tags($data['message']));
        
        // Bind parameters
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':company', $company);
        $stmt->bindParam(':service_type', $data['service_type']);
        $stmt->bindParam(':budget_range', $data['budget_range']);
        $stmt->bindParam(':message', $message);
        $stmt->bindParam(':ip_address', $data['ip_address']);
        $stmt->bindParam(':user_agent', $data['user_agent']);
        
        return $stmt->execute();
    }

    /**
     * Get contact by ID
     */
    public function getById($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Get all contacts with pagination
     */
    public function getAll($page = 1, $limit = 10) {
        $offset = ($page - 1) * $limit;
        
        $query = "SELECT * FROM " . $this->table_name . " 
                  ORDER BY created_at DESC 
                  LIMIT :limit OFFSET :offset";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Update contact status
     */
    public function updateStatus($id, $status) {
        $valid_statuses = ['new', 'contacted', 'in_progress', 'completed'];
        
        if (!in_array($status, $valid_statuses)) {
            return false;
        }
        
        $query = "UPDATE " . $this->table_name . " 
                  SET status = :status, updated_at = CURRENT_TIMESTAMP 
                  WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':id', $id);
        
        return $stmt->execute();
    }

    /**
     * Get contacts count by status
     */
    public function getCountByStatus() {
        $query = "SELECT status, COUNT(*) as count 
                  FROM " . $this->table_name . " 
                  GROUP BY status";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>