<?php
/**
 * Backend Diagnostic Script
 * This will help identify what's wrong with the backend
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>Backend Diagnostic Report</h1>";
echo "<pre>";

// 1. Check PHP version
echo "1. PHP Version: " . PHP_VERSION . "\n";
echo "   Required: 7.4+\n";
echo "   Status: " . (version_compare(PHP_VERSION, '7.4.0', '>=') ? "✓ OK" : "✗ FAIL") . "\n\n";

// 2. Check required extensions
$extensions = ['pdo', 'pdo_mysql', 'json', 'mbstring'];
echo "2. PHP Extensions:\n";
foreach ($extensions as $ext) {
    $loaded = extension_loaded($ext);
    echo "   $ext: " . ($loaded ? "✓ Loaded" : "✗ Missing") . "\n";
}
echo "\n";

// 3. Check file structure
echo "3. File Structure:\n";
$files = [
    'config/config.php',
    'config/database.php',
    'utils/response.php',
    'api/contact.php',
    'api/services.php',
    'api/faqs.php',
    '.htaccess'
];
foreach ($files as $file) {
    $exists = file_exists(__DIR__ . '/' . $file);
    echo "   $file: " . ($exists ? "✓ Exists" : "✗ Missing") . "\n";
}
echo "\n";

// 4. Check server variables
echo "4. Server Information:\n";
echo "   REQUEST_URI: " . ($_SERVER['REQUEST_URI'] ?? 'NOT SET') . "\n";
echo "   SCRIPT_NAME: " . ($_SERVER['SCRIPT_NAME'] ?? 'NOT SET') . "\n";
echo "   PATH_INFO: " . ($_SERVER['PATH_INFO'] ?? 'NOT SET') . "\n";
echo "   DOCUMENT_ROOT: " . ($_SERVER['DOCUMENT_ROOT'] ?? 'NOT SET') . "\n";
echo "   Current Directory: " . __DIR__ . "\n";
echo "\n";

// 5. Try to load config
echo "5. Configuration Loading:\n";
try {
    if (file_exists(__DIR__ . '/config/config.php')) {
        require_once __DIR__ . '/config/config.php';
        echo "   config.php: ✓ Loaded\n";
        if (defined('ENVIRONMENT')) {
            echo "   ENVIRONMENT: " . ENVIRONMENT . "\n";
        } else {
            echo "   ENVIRONMENT: ✗ Not defined\n";
        }
    } else {
        echo "   config.php: ✗ File not found\n";
    }
} catch (Exception $e) {
    echo "   config.php: ✗ Error: " . $e->getMessage() . "\n";
}
echo "\n";

// 6. Try database connection
echo "6. Database Connection:\n";
try {
    if (file_exists(__DIR__ . '/config/database.php')) {
        require_once __DIR__ . '/config/database.php';
        $database = new Database();
        $conn = $database->getConnection();
        if ($conn) {
            echo "   Connection: ✓ Success\n";
            // Try a simple query
            $stmt = $conn->query("SELECT 1");
            if ($stmt) {
                echo "   Query Test: ✓ Success\n";
            } else {
                echo "   Query Test: ✗ Failed\n";
            }
        } else {
            echo "   Connection: ✗ Failed (null returned)\n";
        }
    } else {
        echo "   database.php: ✗ File not found\n";
    }
} catch (Exception $e) {
    echo "   Database: ✗ Error: " . $e->getMessage() . "\n";
}
echo "\n";

// 7. Check .htaccess
echo "7. .htaccess:\n";
if (file_exists(__DIR__ . '/.htaccess')) {
    echo "   File: ✓ Exists\n";
    $htaccess = file_get_contents(__DIR__ . '/.htaccess');
    echo "   Size: " . strlen($htaccess) . " bytes\n";
    if (strpos($htaccess, 'RewriteEngine') !== false) {
        echo "   RewriteEngine: ✓ Found\n";
    } else {
        echo "   RewriteEngine: ✗ Not found\n";
    }
} else {
    echo "   File: ✗ Missing\n";
}
echo "\n";

// 8. Test API endpoint paths
echo "8. API Endpoint Paths:\n";
$apiFiles = ['api/contact.php', 'api/services.php', 'api/faqs.php'];
foreach ($apiFiles as $file) {
    $path = __DIR__ . '/' . $file;
    if (file_exists($path)) {
        echo "   $file: ✓ Exists\n";
        // Check if file is readable
        if (is_readable($path)) {
            echo "      Readable: ✓ Yes\n";
        } else {
            echo "      Readable: ✗ No\n";
        }
    } else {
        echo "   $file: ✗ Missing\n";
    }
}
echo "\n";

// 9. Check file permissions
echo "9. File Permissions:\n";
$dir = __DIR__;
echo "   Directory: " . substr(sprintf('%o', fileperms($dir)), -4) . "\n";
$testFile = __DIR__ . '/index.php';
if (file_exists($testFile)) {
    echo "   index.php: " . substr(sprintf('%o', fileperms($testFile)), -4) . "\n";
}
echo "\n";

// 10. Test direct API call simulation
echo "10. API Response Test:\n";
try {
    require_once __DIR__ . '/utils/response.php';
    echo "   Response class: ✓ Loaded\n";
    
    // Simulate what services.php should do
    if (file_exists(__DIR__ . '/api/services.php')) {
        echo "   services.php: ✓ Can be included\n";
    }
} catch (Exception $e) {
    echo "   Response: ✗ Error: " . $e->getMessage() . "\n";
}

echo "\n";
echo "=== End of Diagnostic Report ===\n";
echo "</pre>";

