#!/bin/bash
# Backend API Test Script
# Run this script to test all API endpoints
# Usage: ./test-api.sh

BASE_URL="https://digvano.com/backend"

echo "🧪 Testing Digvano Backend API"
echo "================================"
echo ""

# Check if curl is available
if ! command -v curl &> /dev/null; then
    echo "❌ Error: curl is not installed. Please install curl first."
    exit 1
fi

# Test connectivity first
echo "🔍 Testing connectivity..."
if curl -s --head --fail "$BASE_URL/" > /dev/null 2>&1; then
    echo "✓ Server is reachable"
else
    echo "✗ Cannot reach server. Check if backend is deployed."
    exit 1
fi
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Health Check (Root endpoint)
echo "1️⃣  Testing Health Check..."
response=$(curl -s -w "\n%{http_code}" "$BASE_URL/")
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✓ Health check passed (HTTP $http_code)${NC}"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
else
    echo -e "${RED}✗ Health check failed (HTTP $http_code)${NC}"
    echo "$body"
fi
echo ""

# Test 2: Services API
echo "2️⃣  Testing Services API..."
response=$(curl -s -w "\n%{http_code}" "$BASE_URL/api/services.php")
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✓ Services API working (HTTP $http_code)${NC}"
    echo "$body" | jq '.data | length' 2>/dev/null && echo "Services found" || echo "$body"
else
    echo -e "${RED}✗ Services API failed (HTTP $http_code)${NC}"
    echo "$body"
fi
echo ""

# Test 3: FAQs API
echo "3️⃣  Testing FAQs API..."
response=$(curl -s -w "\n%{http_code}" "$BASE_URL/api/faqs.php")
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✓ FAQs API working (HTTP $http_code)${NC}"
    echo "$body" | jq '.data | length' 2>/dev/null && echo "FAQs found" || echo "$body"
else
    echo -e "${RED}✗ FAQs API failed (HTTP $http_code)${NC}"
    echo "$body"
fi
echo ""

# Test 4: Contact API (POST)
echo "4️⃣  Testing Contact API (POST)..."
response=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/contact.php" \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Test User",
        "email": "test@example.com",
        "service_type": "web_app_development",
        "message": "This is a test message from API test script"
    }')
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" -eq 201 ] || [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✓ Contact API working (HTTP $http_code)${NC}"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
else
    echo -e "${YELLOW}⚠ Contact API returned HTTP $http_code${NC}"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
fi
echo ""

# Test 5: Invalid endpoint (should return 404)
echo "5️⃣  Testing 404 handling..."
response=$(curl -s -w "\n%{http_code}" "$BASE_URL/api/nonexistent.php")
http_code=$(echo "$response" | tail -n1)

if [ "$http_code" -eq 404 ]; then
    echo -e "${GREEN}✓ 404 handling correct (HTTP $http_code)${NC}"
else
    echo -e "${YELLOW}⚠ Expected 404, got HTTP $http_code${NC}"
fi
echo ""

echo "================================"
echo "✅ Testing complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Check the responses above"
echo "   2. Test the contact form on your website"
echo "   3. Verify data is being saved in the database"
echo ""

