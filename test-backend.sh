#!/bin/bash
# Quick Backend Test Script

echo "🔍 Testing Backend..."
echo "===================="
echo ""

BASE_URL="https://digvano.com/backend"

# Test 1: Quick Test
echo "1️⃣  Testing quick-test.php..."
response=$(curl -s "$BASE_URL/quick-test.php")
if echo "$response" | grep -q "status.*ok"; then
    echo "✅ Backend is working!"
    echo "$response" | head -10
else
    echo "❌ Backend not working - got HTML instead of JSON"
    echo "Response: ${response:0:100}..."
fi
echo ""

# Test 2: Health Check
echo "2️⃣  Testing health check..."
response=$(curl -s "$BASE_URL/")
if echo "$response" | grep -q "success.*true"; then
    echo "✅ Health check working!"
else
    echo "❌ Health check failed"
fi
echo ""

# Test 3: Services API
echo "3️⃣  Testing Services API..."
response=$(curl -s "$BASE_URL/api/services.php")
if echo "$response" | grep -q "success"; then
    echo "✅ Services API working!"
else
    echo "❌ Services API failed"
fi
echo ""

# Test 4: Check if backend folder exists
echo "4️⃣  Checking backend deployment..."
http_code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/quick-test.php")
if [ "$http_code" = "200" ]; then
    echo "✅ Backend folder exists and is accessible"
else
    echo "❌ Backend folder not found (HTTP $http_code)"
    echo ""
    echo "💡 Solution: Deploy backend using:"
    echo "   GitHub → Actions → '🚀 Deploy Backend to Hostinger' → Run workflow"
fi
echo ""

echo "===================="
echo "Test complete!"

