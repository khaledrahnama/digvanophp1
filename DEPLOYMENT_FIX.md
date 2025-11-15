# 🔧 Backend Deployment Fix Guide

## Problem Identified
The backend files are **NOT deployed** to the server. The 404 error confirms that `public_html/backend/` directory doesn't exist or is empty.

## ✅ Solution: Deploy Backend Files

You have **3 options** to deploy the backend:

### Option 1: Manual Trigger via GitHub (Recommended)

1. **Go to your GitHub repository**
2. **Click on "Actions" tab**
3. **Select "🚀 Deploy Backend to Hostinger" workflow**
4. **Click "Run workflow" button** (on the right side)
5. **Select branch: `main`**
6. **Click "Run workflow"**
7. **Wait for deployment to complete** (usually 1-2 minutes)
8. **Check the logs** to see if it succeeded

### Option 2: Trigger by Pushing Changes

Simply make a small change to any backend file and push:

```bash
# Make a small change (add a comment)
echo "# Deployment trigger" >> backend/index.php

# Commit and push
git add backend/index.php
git commit -m "Trigger backend deployment"
git push origin main
```

This will automatically trigger the deployment workflow.

### Option 3: Manual FTP Upload (If GitHub Actions Fails)

If GitHub Actions doesn't work, upload manually via FTP:

1. **Connect to Hostinger via FTP** (use FileZilla or similar)
2. **Navigate to `public_html/` directory**
3. **Create `backend` folder** if it doesn't exist
4. **Upload all files from your local `backend/` folder** to `public_html/backend/`
5. **Make sure `.htaccess` is uploaded** (it's a hidden file, enable "Show hidden files" in FTP client)

## 🔍 Verify Deployment

After deployment, test these URLs:

1. **Quick Test:**
   ```bash
   curl https://digvano.com/backend/quick-test.php
   ```
   Should return JSON, not HTML or 404.

2. **Health Check:**
   ```bash
   curl https://digvano.com/backend/
   ```
   Should return JSON with API information.

3. **Services API:**
   ```bash
   curl https://digvano.com/backend/api/services.php
   ```
   Should return JSON (may be empty array if no data).

## 🐛 Troubleshooting Deployment

### If GitHub Actions Fails:

1. **Check FTP Credentials:**
   - Go to GitHub → Settings → Secrets and variables → Actions
   - Verify these secrets exist:
     - `FTP_SERVER`
     - `FTP_USERNAME`
     - `FTP_PASSWORD`
   - Make sure they're correct

2. **Check Workflow Logs:**
   - Go to Actions → Latest workflow run
   - Click on the failed job
   - Check the "Deploy Backend via FTP" step
   - Look for error messages

3. **Common FTP Errors:**
   - **"Connection refused"** → Wrong FTP server address
   - **"Authentication failed"** → Wrong username/password
   - **"Directory not found"** → Wrong server path (should be `./public_html/backend/`)

### If Files Upload But Still 404:

1. **Check File Permissions:**
   - Files should be: `644`
   - Directories should be: `755`
   - `.htaccess` should be: `644`

2. **Check Directory Structure:**
   - Files should be in: `public_html/backend/`
   - Not in: `public_html/` (that's for frontend)
   - Not in: `public_html/backend/backend/` (double nested)

3. **Verify `.htaccess` exists:**
   - It's a hidden file, make sure it was uploaded
   - Should be in `public_html/backend/.htaccess`

## 📋 Deployment Checklist

After deployment, verify:

- [ ] GitHub Actions workflow completed successfully
- [ ] `curl https://digvano.com/backend/quick-test.php` returns JSON
- [ ] `curl https://digvano.com/backend/` returns JSON
- [ ] `curl https://digvano.com/backend/api/services.php` returns JSON
- [ ] Files exist in `public_html/backend/` via FTP
- [ ] `.htaccess` file is present
- [ ] File permissions are correct (644 for files, 755 for dirs)

## 🚀 Next Steps After Deployment

Once backend is deployed and working:

1. **Test the contact form** on your website
2. **Check database connection** (use quick-test.php output)
3. **Verify API endpoints** are accessible
4. **Test from frontend** - submit a contact form
5. **Delete test files** after verification:
   - `quick-test.php`
   - `test-backend.php`
   - `diagnose.php`

## 💡 Quick Command Reference

```bash
# Test if backend is deployed
curl https://digvano.com/backend/quick-test.php

# Test health check
curl https://digvano.com/backend/

# Test services API
curl https://digvano.com/backend/api/services.php

# Test contact form (POST)
curl -X POST https://digvano.com/backend/api/contact.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","service_type":"web_app_development","message":"Test"}'
```

