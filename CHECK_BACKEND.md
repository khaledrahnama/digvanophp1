# ✅ How to Check Backend

## 🚀 Quick Tests

### Method 1: Browser Test (Easiest)

1. **Quick Test:**
   - Visit: `https://digvano.com/backend/quick-test.php`
   - Should show JSON with backend status
   - If you see HTML, backend is not deployed

2. **Health Check:**
   - Visit: `https://digvano.com/backend/`
   - Should show JSON with API information
   - If you see HTML, backend is not deployed

3. **Services API:**
   - Visit: `https://digvano.com/backend/api/services.php`
   - Should show JSON with services data
   - If you see HTML, backend is not deployed

### Method 2: Command Line

```bash
# Quick test
curl https://digvano.com/backend/quick-test.php

# Health check
curl https://digvano.com/backend/

# Services API
curl https://digvano.com/backend/api/services.php
```

**Expected:** JSON responses
**If you get HTML:** Backend is not deployed

### Method 3: Use Test Script

```bash
cd /Users/khaledrahnama/Desktop/Digvanophp1
./test-backend.sh
```

This will test all endpoints and tell you what's working.

## ❌ If Backend Returns HTML

This means the backend files are **not deployed**. The frontend is being served instead.

### Solution: Deploy Backend

1. **Go to GitHub:**
   - https://github.com/khaledrahnama/digvanophp1/actions

2. **Select workflow:**
   - Click "🚀 Deploy Backend to Hostinger"

3. **Run workflow:**
   - Click "Run workflow" (top right)
   - Select branch: `main`
   - Click "Run workflow"

4. **Wait 1-2 minutes**

5. **Test again:**
   ```bash
   curl https://digvano.com/backend/quick-test.php
   ```

## ✅ Expected Responses

### Quick Test Response:
```json
{
    "status": "ok",
    "message": "Backend is accessible!",
    "php_version": "8.2.28",
    "config_loaded": true,
    "database_connected": true
}
```

### Health Check Response:
```json
{
    "success": true,
    "message": "Success",
    "data": {
        "status": "healthy",
        "service": "Digvano Backend API"
    }
}
```

### Services API Response:
```json
{
    "success": true,
    "data": [...],
    "message": "Services retrieved successfully"
}
```

## 🔍 Troubleshooting

### Problem: Getting HTML instead of JSON

**Cause:** Backend files not deployed

**Fix:** Deploy backend using GitHub Actions workflow

### Problem: 404 Not Found

**Cause:** Backend folder doesn't exist

**Fix:** Deploy backend using GitHub Actions workflow

### Problem: 500 Internal Server Error

**Cause:** PHP error or database connection issue

**Fix:** Check error logs in Hostinger control panel

## 📋 Checklist

- [ ] `https://digvano.com/backend/quick-test.php` returns JSON
- [ ] `https://digvano.com/backend/` returns JSON
- [ ] `https://digvano.com/backend/api/services.php` returns JSON
- [ ] Database connection works (check quick-test.php output)
- [ ] Contact form on website works

## 🎯 Quick Command Reference

```bash
# Test backend
curl https://digvano.com/backend/quick-test.php

# Test health
curl https://digvano.com/backend/

# Test API
curl https://digvano.com/backend/api/services.php

# Test contact form (POST)
curl -X POST https://digvano.com/backend/api/contact.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","service_type":"web_app_development","message":"Test"}'
```

