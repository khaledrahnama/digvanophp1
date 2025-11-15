# Backend Testing Guide

This guide will help you verify that your backend is working correctly after deployment to Hostinger.

## 🚀 Quick Test Methods

### Method 1: Browser Test (Easiest)

1. **Health Check**
   - Visit: `https://digvano.com/backend/`
   - Expected: JSON response with API information

2. **Services API**
   - Visit: `https://digvano.com/backend/api/services.php`
   - Expected: JSON response with services data

3. **FAQs API**
   - Visit: `https://digvano.com/backend/api/faqs.php`
   - Expected: JSON response with FAQs data

### Method 2: Using the Test Script (Recommended)

1. **Upload the test file:**
   - Upload `backend/test-backend.php` to your server at `public_html/backend/test-backend.php`
   - You can do this via FTP or by committing and pushing to trigger GitHub Actions

2. **Run the test:**
   - Visit: `https://digvano.com/backend/test-backend.php`
   - The page will show a comprehensive health check

3. **Delete the test file after verification:**
   ```bash
   # Via SSH (if you have access)
   rm public_html/backend/test-backend.php
   
   # Or via FTP - just delete the file
   ```

### Method 3: Command Line (Using curl)

If you have `curl` installed, you can run the test script:

```bash
# Make the script executable
chmod +x backend/test-api.sh

# Run the tests
./backend/test-api.sh
```

Or test individual endpoints manually:

```bash
# Health check
curl https://digvano.com/backend/

# Services
curl https://digvano.com/backend/api/services.php

# FAQs
curl https://digvano.com/backend/api/faqs.php

# Contact form (POST)
curl -X POST https://digvano.com/backend/api/contact.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "service_type": "web_app_development",
    "message": "Test message"
  }'
```

## ✅ What to Check

### 1. **File Structure**
Verify these files exist on the server:
- ✅ `backend/config/config.php`
- ✅ `backend/config/database.php`
- ✅ `backend/utils/response.php`
- ✅ `backend/api/contact.php`
- ✅ `backend/api/services.php`
- ✅ `backend/api/faqs.php`
- ✅ `backend/.htaccess`

### 2. **Database Connection**
- Check if the database credentials in `backend/config/database.php` are correct
- Verify the `contacts` table exists in your database
- Test database connection using the test script

### 3. **API Endpoints**

#### GET Endpoints (should return JSON):
- `https://digvano.com/backend/` - Health check
- `https://digvano.com/backend/api/services.php` - Services list
- `https://digvano.com/backend/api/faqs.php` - FAQs list

#### POST Endpoints:
- `https://digvano.com/backend/api/contact.php` - Contact form submission

### 4. **CORS Headers**
The API should include CORS headers allowing requests from `https://digvano.com`

### 5. **Error Handling**
- Invalid endpoints should return 404
- Invalid POST data should return validation errors
- Database errors should return 500 with a user-friendly message

## 🔍 Troubleshooting

### Problem: 404 Not Found
**Solution:**
- Check if files are in `public_html/backend/` directory
- Verify `.htaccess` file exists and is correct
- Check file permissions (should be 644 for files, 755 for directories)

### Problem: 500 Internal Server Error
**Solution:**
- Check PHP error logs in Hostinger control panel
- Verify database credentials are correct
- Check if required PHP extensions are installed (PDO, PDO_MySQL)
- Ensure database tables exist

### Problem: CORS Errors in Browser
**Solution:**
- Verify CORS headers in `backend/config/config.php`
- Check that `Access-Control-Allow-Origin` includes your frontend domain

### Problem: Database Connection Failed
**Solution:**
- Double-check database credentials in `backend/config/database.php`
- Verify database name, username, and password in Hostinger control panel
- Ensure database user has proper permissions
- Check if database host is `localhost` (correct for Hostinger)

### Problem: Contact Form Not Saving
**Solution:**
- Check if `contacts` table exists in database
- Verify table structure matches the INSERT query
- Check database error logs
- Test database connection using the test script

## 📊 Expected Responses

### Health Check Response:
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "status": "healthy",
    "service": "Digvano Backend API",
    "version": "1.0.0",
    "timestamp": 1234567890,
    "endpoints": {...}
  }
}
```

### Contact Form Success Response:
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you within 24 hours.",
  "data": null,
  "timestamp": 1234567890
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Error message here",
  "errors": null,
  "timestamp": 1234567890
}
```

## 🎯 Final Checklist

Before considering the backend fully working:

- [ ] Health check endpoint returns 200 OK
- [ ] Services API returns data (or empty array if no data)
- [ ] FAQs API returns data (or empty array if no data)
- [ ] Contact form can submit successfully
- [ ] Database connection works
- [ ] CORS headers are correct
- [ ] Error handling works (404, 500, validation errors)
- [ ] Frontend can successfully call the API

## 🔒 Security Reminder

**Important:** After testing, delete `test-backend.php` from the server to prevent unauthorized access to system information.

## 📞 Need Help?

If you encounter issues:
1. Check GitHub Actions logs for deployment errors
2. Check Hostinger error logs
3. Use the test script to identify specific problems
4. Verify all configuration files are correct

