# Backend Troubleshooting Guide

## 🔍 Common Issues and Solutions

### Issue 1: Test Returns HTML Instead of JSON

**Symptoms:**
- API endpoints return HTML (frontend page) instead of JSON
- 404 errors when accessing backend endpoints

**Possible Causes:**
1. **Backend files not deployed** - Files might not be in `public_html/backend/`
2. **Wrong deployment path** - Check GitHub Actions logs
3. **Frontend intercepting requests** - Frontend might be serving at root

**Solutions:**

#### Check if files are deployed:
```bash
# Test if quick-test.php is accessible
curl https://digvano.com/backend/quick-test.php
```

If this returns JSON, files are deployed. If it returns 404 or HTML, files are missing.

#### Check GitHub Actions:
1. Go to your GitHub repository
2. Click on "Actions" tab
3. Check the latest workflow run for "Deploy Backend to Hostinger"
4. Look for any errors in the FTP deployment step
5. Check the logs to see what was uploaded

#### Verify deployment path:
- Backend should be at: `public_html/backend/`
- Frontend should be at: `public_html/`
- They should NOT conflict

### Issue 2: 500 Internal Server Error

**Symptoms:**
- API returns 500 error
- No response or generic error message

**Solutions:**

1. **Check PHP Error Logs:**
   - Log into Hostinger control panel
   - Go to "Files" → "Error Logs"
   - Look for PHP errors

2. **Check Database Connection:**
   - Verify credentials in `backend/config/database.php`
   - Test connection using `quick-test.php`:
     ```bash
     curl https://digvano.com/backend/quick-test.php
     ```

3. **Check PHP Version:**
   - Hostinger should have PHP 7.4+ or 8.x
   - Check in Hostinger control panel → PHP Settings

4. **Check Required Extensions:**
   - PDO
   - PDO_MySQL
   - JSON
   - mbstring

### Issue 3: Database Connection Failed

**Symptoms:**
- Contact form doesn't save
- API returns database errors

**Solutions:**

1. **Verify Database Credentials:**
   - Check `backend/config/database.php`
   - Verify in Hostinger → Databases
   - Ensure username, password, and database name are correct

2. **Check Database Tables:**
   - Log into phpMyAdmin in Hostinger
   - Verify `contacts` table exists
   - If missing, run the database setup:
     ```sql
     CREATE TABLE IF NOT EXISTS contacts (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL,
         company VARCHAR(255),
         service_type VARCHAR(100) NOT NULL,
         budget_range VARCHAR(50),
         message TEXT NOT NULL,
         ip_address VARCHAR(45),
         user_agent TEXT,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

3. **Test Database Connection:**
   ```bash
   # Upload and access quick-test.php
   curl https://digvano.com/backend/quick-test.php
   # Check the "database_connected" field
   ```

### Issue 4: CORS Errors in Browser

**Symptoms:**
- Browser console shows CORS errors
- Frontend can't call backend API

**Solutions:**

1. **Check CORS Headers:**
   - Verify `backend/config/config.php` has:
     ```php
     header('Access-Control-Allow-Origin: https://digvano.com');
     ```

2. **Test CORS:**
   ```bash
   curl -H "Origin: https://digvano.com" \
        -H "Access-Control-Request-Method: POST" \
        -H "Access-Control-Request-Headers: Content-Type" \
        -X OPTIONS \
        https://digvano.com/backend/api/contact.php
   ```

### Issue 5: Files Not Found (404)

**Symptoms:**
- All endpoints return 404
- Files seem to be missing

**Solutions:**

1. **Check File Structure via FTP:**
   - Connect to Hostinger via FTP
   - Navigate to `public_html/backend/`
   - Verify these files exist:
     - `index.php`
     - `config/config.php`
     - `config/database.php`
     - `api/contact.php`
     - `api/services.php`
     - `api/faqs.php`
     - `.htaccess`

2. **Check File Permissions:**
   - Files: 644
   - Directories: 755
   - `.htaccess`: 644

3. **Re-deploy:**
   - Make a small change to trigger deployment
   - Or manually upload files via FTP

## 🧪 Step-by-Step Diagnostic Process

### Step 1: Quick Test
```bash
# Test if backend is accessible
curl https://digvano.com/backend/quick-test.php
```

**Expected:** JSON response with status information
**If fails:** Files might not be deployed

### Step 2: Check Health Endpoint
```bash
curl https://digvano.com/backend/
```

**Expected:** JSON with API information
**If fails:** Check `index.php` routing logic

### Step 3: Test API Endpoints
```bash
# Services
curl https://digvano.com/backend/api/services.php

# FAQs  
curl https://digvano.com/backend/api/faqs.php
```

**Expected:** JSON responses
**If fails:** Check database connection or table existence

### Step 4: Test Contact Form
```bash
curl -X POST https://digvano.com/backend/api/contact.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "service_type": "web_app_development",
    "message": "Test message"
  }'
```

**Expected:** Success message with 201 status
**If fails:** Check validation, database, or error logs

## 📋 Diagnostic Checklist

Use this checklist to systematically identify issues:

- [ ] Can access `https://digvano.com/backend/quick-test.php` (returns JSON)
- [ ] Can access `https://digvano.com/backend/` (returns JSON)
- [ ] Can access `https://digvano.com/backend/api/services.php` (returns JSON)
- [ ] Can access `https://digvano.com/backend/api/faqs.php` (returns JSON)
- [ ] Can POST to `https://digvano.com/backend/api/contact.php` (returns success)
- [ ] Database connection works (check quick-test.php output)
- [ ] Database tables exist (contacts, services, faqs)
- [ ] CORS headers are correct
- [ ] File permissions are correct (644 for files, 755 for dirs)
- [ ] `.htaccess` file exists and is correct
- [ ] PHP version is 7.4+ or 8.x
- [ ] Required PHP extensions are installed

## 🚨 Emergency Fixes

### If Nothing Works:

1. **Manual Upload via FTP:**
   - Download all backend files
   - Upload to `public_html/backend/` via FTP
   - Ensure `.htaccess` is uploaded

2. **Check GitHub Actions:**
   - Verify FTP credentials in GitHub Secrets
   - Check if deployment actually ran
   - Look for FTP connection errors

3. **Contact Hostinger Support:**
   - Ask about PHP version
   - Ask about required extensions
   - Ask about file permissions
   - Ask about `.htaccess` support

## 📞 Getting Help

When asking for help, provide:
1. Which test failed (browser, script, etc.)
2. Error message or response received
3. Output from `quick-test.php`
4. GitHub Actions deployment logs
5. Any relevant error logs from Hostinger

