<?php
/**
 * Location Checker
 * This will tell us exactly where the files are located
 */

header('Content-Type: text/plain');

echo "=== Backend Location Diagnostic ===\n\n";

echo "Current File Location: " . __FILE__ . "\n";
echo "Current Directory: " . __DIR__ . "\n";
echo "Document Root: " . ($_SERVER['DOCUMENT_ROOT'] ?? 'NOT SET') . "\n";
echo "Script Name: " . ($_SERVER['SCRIPT_NAME'] ?? 'NOT SET') . "\n";
echo "Request URI: " . ($_SERVER['REQUEST_URI'] ?? 'NOT SET') . "\n";
echo "PHP Self: " . ($_SERVER['PHP_SELF'] ?? 'NOT SET') . "\n\n";

echo "=== Relative to Document Root ===\n";
$docRoot = $_SERVER['DOCUMENT_ROOT'] ?? '';
$currentFile = __FILE__;
if ($docRoot && strpos($currentFile, $docRoot) === 0) {
    $relativePath = substr($currentFile, strlen($docRoot));
    echo "Relative Path: " . $relativePath . "\n";
} else {
    echo "Cannot determine relative path\n";
}

echo "\n=== File Existence Check ===\n";
$files = [
    'index.php',
    'config/config.php',
    'config/database.php',
    'api/contact.php',
    'api/services.php',
    '.htaccess'
];

foreach ($files as $file) {
    $fullPath = __DIR__ . '/' . $file;
    $exists = file_exists($fullPath);
    echo ($exists ? "✓" : "✗") . " $file - " . ($exists ? "EXISTS" : "MISSING") . "\n";
    if ($exists) {
        echo "   Full path: $fullPath\n";
        echo "   Readable: " . (is_readable($fullPath) ? "YES" : "NO") . "\n";
    }
}

echo "\n=== Directory Listing ===\n";
$dir = __DIR__;
$items = scandir($dir);
echo "Files in current directory:\n";
foreach ($items as $item) {
    if ($item !== '.' && $item !== '..') {
        $path = $dir . '/' . $item;
        $type = is_dir($path) ? 'DIR' : 'FILE';
        echo "  $type: $item\n";
    }
}

echo "\n=== Expected Location ===\n";
echo "Files should be in: public_html/backend/\n";
echo "So the full path should be: /home/username/public_html/backend/\n";
echo "Or relative to doc root: /backend/\n";

