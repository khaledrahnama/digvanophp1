<?php
/**
 * Database Setup Script
 * Run this once to set up the database structure
 */

require_once '../backend/config/database.php';

try {
    $database = new Database();
    $conn = $database->getConnection();
    
    // Read schema file
    $schema = file_get_contents('schema.sql');
    
    // Split by semicolon to execute each statement
    $statements = array_filter(array_map('trim', explode(';', $schema)));
    
    $successCount = 0;
    $errorCount = 0;
    
    foreach ($statements as $statement) {
        if (!empty($statement)) {
            try {
                $conn->exec($statement);
                $successCount++;
                echo "✅ Executed: " . substr($statement, 0, 50) . "...\n";
            } catch (PDOException $e) {
                $errorCount++;
                echo "❌ Error: " . $e->getMessage() . "\n";
            }
        }
    }
    
    echo "\n📊 Setup Complete:\n";
    echo "✅ Successful: $successCount\n";
    echo "❌ Errors: $errorCount\n";
    
    if ($errorCount === 0) {
        echo "🎉 Database setup completed successfully!\n";
    } else {
        echo "⚠️  Some errors occurred during setup.\n";
    }
    
} catch (Exception $e) {
    echo "❌ Database connection failed: " . $e->getMessage() . "\n";
}
?>