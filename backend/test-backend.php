<?php
/**
 * Backend Health Check & Test Script
 * Upload this to your server at: public_html/backend/test-backend.php
 * Then visit: https://digvano.com/backend/test-backend.php
 */

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Backend Health Check</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; background: #1a1a1a; color: #fff; }
        .test { margin: 20px 0; padding: 15px; border-radius: 5px; }
        .success { background: #2d5a2d; border-left: 4px solid #4caf50; }
        .error { background: #5a2d2d; border-left: 4px solid #f44336; }
        .info { background: #2d3a5a; border-left: 4px solid #2196f3; }
        h1 { color: #4caf50; }
        h2 { color: #2196f3; margin-top: 30px; }
        pre { background: #000; padding: 10px; border-radius: 3px; overflow-x: auto; }
        .endpoint { margin: 10px 0; padding: 10px; background: #2a2a2a; border-radius: 3px; }
    </style>
</head>
<body>
    <h1>🔍 Digvano Backend Health Check</h1>
    
    <?php
    $allTestsPassed = true;
    
    // Test 1: PHP Version
    echo '<div class="test ' . (version_compare(PHP_VERSION, '7.4.0', '>=') ? 'success' : 'error') . '">';
    echo '<h3>✓ PHP Version</h3>';
    echo '<p>Current: ' . PHP_VERSION . '</p>';
    if (version_compare(PHP_VERSION, '7.4.0', '<')) {
        echo '<p class="error">⚠️ PHP 7.4+ required</p>';
        $allTestsPassed = false;
    }
    echo '</div>';
    
    // Test 2: Required Extensions
    $requiredExtensions = ['pdo', 'pdo_mysql', 'json', 'mbstring'];
    echo '<div class="test ' . ($allTestsPassed ? 'success' : 'error') . '">';
    echo '<h3>✓ PHP Extensions</h3>';
    foreach ($requiredExtensions as $ext) {
        $loaded = extension_loaded($ext);
        echo '<p>' . ($loaded ? '✓' : '✗') . ' ' . $ext . '</p>';
        if (!$loaded) $allTestsPassed = false;
    }
    echo '</div>';
    
    // Test 3: File Structure
    echo '<div class="test info">';
    echo '<h3>📁 File Structure</h3>';
    $requiredFiles = [
        'config/config.php',
        'config/database.php',
        'utils/response.php',
        'api/contact.php',
        'api/chat.php',
        'api/services.php',
        'api/faqs.php',
        '.htaccess'
    ];
    foreach ($requiredFiles as $file) {
        $exists = file_exists(__DIR__ . '/' . $file);
        echo '<p>' . ($exists ? '✓' : '✗') . ' ' . $file . '</p>';
        if (!$exists) $allTestsPassed = false;
    }
    echo '</div>';
    
    // Test 4: Configuration Loading
    echo '<div class="test">';
    echo '<h3>⚙️ Configuration</h3>';
    try {
        require_once __DIR__ . '/config/config.php';
        echo '<p class="success">✓ config.php loaded</p>';
        
        if (defined('ENVIRONMENT')) {
            echo '<p>Environment: ' . ENVIRONMENT . '</p>';
        } else {
            echo '<p class="error">✗ ENVIRONMENT not defined</p>';
            $allTestsPassed = false;
        }
    } catch (Exception $e) {
        echo '<p class="error">✗ Error loading config: ' . htmlspecialchars($e->getMessage()) . '</p>';
        $allTestsPassed = false;
    }
    echo '</div>';
    
    // Test 5: Database Connection
    echo '<div class="test">';
    echo '<h3>🗄️ Database Connection</h3>';
    try {
        require_once __DIR__ . '/config/database.php';
        $database = new Database();
        $conn = $database->getConnection();
        
        if ($conn) {
            echo '<p class="success">✓ Database connection successful</p>';
            
            // Test if contacts table exists
            $stmt = $conn->query("SHOW TABLES LIKE 'contacts'");
            if ($stmt->rowCount() > 0) {
                echo '<p class="success">✓ Contacts table exists</p>';
            } else {
                echo '<p class="error">✗ Contacts table not found</p>';
                $allTestsPassed = false;
            }
        } else {
            echo '<p class="error">✗ Database connection failed</p>';
            $allTestsPassed = false;
        }
    } catch (Exception $e) {
        echo '<p class="error">✗ Database error: ' . htmlspecialchars($e->getMessage()) . '</p>';
        $allTestsPassed = false;
    }
    echo '</div>';
    
    // Test 6: API Endpoints
    echo '<h2>🌐 API Endpoints</h2>';
    $baseUrl = 'https://digvano.com/backend';
    $endpoints = [
        'GET /backend/' => $baseUrl . '/',
        'GET /backend/api/services.php' => $baseUrl . '/api/services.php',
        'GET /backend/api/faqs.php' => $baseUrl . '/api/faqs.php',
        'POST /backend/api/contact.php' => $baseUrl . '/api/contact.php',
    ];
    
    foreach ($endpoints as $name => $url) {
        echo '<div class="endpoint">';
        echo '<strong>' . htmlspecialchars($name) . '</strong><br>';
        echo '<a href="' . htmlspecialchars($url) . '" target="_blank" style="color: #4caf50;">' . htmlspecialchars($url) . '</a>';
        echo '</div>';
    }
    
    // Test 7: .htaccess
    echo '<h2>📝 .htaccess Status</h2>';
    if (file_exists(__DIR__ . '/.htaccess')) {
        echo '<div class="test success">';
        echo '<p>✓ .htaccess file exists</p>';
        echo '<pre>' . htmlspecialchars(file_get_contents(__DIR__ . '/.htaccess')) . '</pre>';
        echo '</div>';
    } else {
        echo '<div class="test error">';
        echo '<p>✗ .htaccess file not found</p>';
        $allTestsPassed = false;
        echo '</div>';
    }
    
    // Final Summary
    echo '<h2>📊 Summary</h2>';
    if ($allTestsPassed) {
        echo '<div class="test success">';
        echo '<h3>✅ All Tests Passed!</h3>';
        echo '<p>Your backend is properly configured and ready to use.</p>';
        echo '</div>';
    } else {
        echo '<div class="test error">';
        echo '<h3>❌ Some Tests Failed</h3>';
        echo '<p>Please review the errors above and fix them.</p>';
        echo '</div>';
    }
    ?>
    
    <div class="test info" style="margin-top: 30px;">
        <h3>🔒 Security Note</h3>
        <p><strong>Important:</strong> Delete this test file after verification for security reasons!</p>
        <p>You can delete it via FTP or SSH: <code>rm test-backend.php</code></p>
    </div>
</body>
</html>

