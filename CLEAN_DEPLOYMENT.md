# 🧹 Clean Deployment Guide

This guide will help you **remove everything** on Hostinger and deploy both frontend and backend together in one clean deployment.

## 🚀 How to Deploy Everything Together

### Option 1: Use the Combined Workflow (Recommended)

I've created a new workflow called **"🚀 Deploy Everything to Hostinger"** that will:

1. ✅ **Clean** `public_html/` (removes everything)
2. ✅ **Build** the frontend
3. ✅ **Deploy** frontend to `public_html/`
4. ✅ **Deploy** backend to `public_html/backend/`
5. ✅ All in one workflow!

**Steps:**

1. **Go to GitHub** → Your repository
2. **Click "Actions" tab**
3. **Select "🚀 Deploy Everything to Hostinger"** workflow
4. **Click "Run workflow"** button (top right)
5. **Select branch:** `main`
6. **Click "Run workflow"**
7. **Wait 2-3 minutes** for deployment to complete

### Option 2: Trigger by Pushing Changes

Make any change and push to trigger the combined deployment:

```bash
# Make a small change to trigger deployment
echo "" >> README.md

git add .
git commit -m "Trigger full deployment"
git push origin main
```

## 📁 Final Structure After Deployment

After deployment, your Hostinger server will have:

```
public_html/
├── index.html          (Frontend)
├── assets/            (Frontend assets)
├── favicon.ico        (Frontend)
└── backend/           (Backend)
    ├── index.php
    ├── quick-test.php
    ├── config/
    │   ├── config.php
    │   └── database.php
    ├── api/
    │   ├── contact.php
    │   ├── services.php
    │   └── faqs.php
    └── .htaccess
```

## ✅ After Deployment - Verify Everything Works

### 1. Test Frontend
```
https://digvano.com/
```
Should show your website.

### 2. Test Backend Health
```bash
curl https://digvano.com/backend/quick-test.php
```
Should return JSON with status information.

### 3. Test Backend API
```bash
curl https://digvano.com/backend/api/services.php
```
Should return JSON (may be empty array if no data).

### 4. Test Contact Form
- Go to your website
- Fill out the contact form
- Submit it
- Should work without errors

## 🔍 If Something Goes Wrong

### Check GitHub Actions Logs

1. Go to **Actions** tab
2. Click on the latest workflow run
3. Check each step for errors:
   - **Build Frontend** - Check for build errors
   - **PHP syntax check** - Check for PHP errors
   - **Deploy Frontend** - Check FTP connection
   - **Deploy Backend** - Check FTP connection

### Common Issues

**Issue: Frontend deployed but backend missing**
- Check if "Deploy Backend" step completed
- Verify FTP credentials are correct

**Issue: Backend deployed but frontend missing**
- Check if "Deploy Frontend" step completed
- Verify build step didn't fail

**Issue: Both deployed but 404 errors**
- Check file permissions (644 for files, 755 for dirs)
- Verify `.htaccess` is in `public_html/backend/`

## 📋 Deployment Checklist

After running the workflow, verify:

- [ ] Frontend is accessible at `https://digvano.com/`
- [ ] Backend health check works: `https://digvano.com/backend/quick-test.php`
- [ ] Backend API works: `https://digvano.com/backend/api/services.php`
- [ ] Contact form on website works
- [ ] No 404 errors in browser console
- [ ] Files exist in correct locations (check via FTP)

## 🎯 Quick Test Commands

After deployment, run these to verify:

```bash
# Test frontend
curl -I https://digvano.com/

# Test backend
curl https://digvano.com/backend/quick-test.php

# Test API
curl https://digvano.com/backend/api/services.php
```

All should return successful responses!

## 💡 Tips

- **First deployment** might take 3-5 minutes (building frontend)
- **Subsequent deployments** are faster (only changed files)
- **Check logs** if something fails
- **Keep test files** (`quick-test.php`) until everything is verified, then delete them

---

**Ready to deploy?** Go to GitHub Actions and run "🚀 Deploy Everything to Hostinger"!

