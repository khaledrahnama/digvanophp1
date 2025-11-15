# 🔧 How to Fix Frontend 403 Error - Step by Step

## Method 1: Fix via Hostinger File Manager (Easiest)

### Step 1: Log into Hostinger
1. Go to **https://hpanel.hostinger.com/**
2. Log in with your credentials

### Step 2: Open File Manager
1. In the dashboard, find **"Files"** section
2. Click **"File Manager"**
3. Navigate to **`public_html/`** folder

### Step 3: Fix Permissions for index.html
1. **Find `index.html`** in the file list
2. **Right-click** on `index.html`
3. Select **"Change Permissions"** or **"Properties"**
4. Set permissions to: **644**
   - Owner: Read + Write (6)
   - Group: Read (4)
   - Public: Read (4)
5. Click **"Save"** or **"Apply"**

### Step 4: Fix Permissions for assets folder
1. **Find `assets/`** folder in the file list
2. **Right-click** on `assets/` folder
3. Select **"Change Permissions"** or **"Properties"**
4. Set permissions to: **755**
   - Owner: Read + Write + Execute (7)
   - Group: Read + Execute (5)
   - Public: Read + Execute (5)
5. Click **"Save"** or **"Apply"**

### Step 5: Fix Permissions for Files Inside assets/
1. **Open the `assets/` folder**
2. **Select all files** inside (Ctrl+A or Cmd+A)
3. **Right-click** → **"Change Permissions"**
4. Set to: **644**
5. Click **"Save"**

### Step 6: Verify
1. Open your browser
2. Go to **https://digvano.com/**
3. Should load without 403 error!

---

## Method 2: Fix via FTP Client (FileZilla, etc.)

### Step 1: Connect via FTP
1. Open your FTP client (FileZilla, Cyberduck, etc.)
2. Connect to Hostinger using:
   - **Host:** Your FTP server (from Hostinger)
   - **Username:** Your FTP username
   - **Password:** Your FTP password
   - **Port:** 21 (or 22 for SFTP)

### Step 2: Navigate to public_html
1. Navigate to **`public_html/`** directory

### Step 2: Fix index.html Permissions
1. **Right-click** on `index.html`
2. Select **"File Permissions"** or **"Change Permissions"**
3. Enter: **644**
4. Check **"Recurse into subdirectories"** if available (but uncheck it for files)
5. Click **"OK"**

### Step 3: Fix assets Folder Permissions
1. **Right-click** on `assets/` folder
2. Select **"File Permissions"**
3. Enter: **755**
4. Check **"Recurse into subdirectories"** ✓
5. Click **"OK"**

### Step 4: Verify
1. Test in browser: **https://digvano.com/**

---

## Method 3: Automatic Fix via Re-deployment (Recommended)

This will fix permissions automatically and ensure everything is correct.

### Step 1: Go to GitHub
1. Open your browser
2. Go to **https://github.com/** and navigate to your repository

### Step 2: Open Actions
1. Click on **"Actions"** tab (top menu)

### Step 3: Run Frontend Deployment
1. In the left sidebar, find **"🚀 Deploy Frontend to Hostinger"**
2. Click on it
3. Click **"Run workflow"** button (top right)
4. Select branch: **`main`**
5. Click **"Run workflow"** (green button)

### Step 4: Wait for Completion
1. The workflow will run (takes 2-3 minutes)
2. Watch the progress:
   - ✅ Build Frontend
   - ✅ Deploy Frontend via FTP
3. Wait for green checkmark ✅

### Step 5: Verify
1. Test: **https://digvano.com/**
2. Should work without 403!

---

## Method 4: Use the Combined Deployment (Cleanest)

This will deploy both frontend and backend together with correct permissions.

### Steps:
1. **GitHub** → **Actions** tab
2. Select **"🚀 Deploy Everything to Hostinger"**
3. Click **"Run workflow"**
4. Select branch: **`main`**
5. Click **"Run workflow"**
6. Wait 3-5 minutes
7. Test: **https://digvano.com/**

---

## 📋 Permission Reference

| Item | Permission | What it means |
|------|-----------|--------------|
| `index.html` | **644** | Owner can read/write, others can read |
| `assets/` folder | **755** | Owner can read/write/execute, others can read/execute |
| Files in `assets/` | **644** | Owner can read/write, others can read |
| `.htaccess` | **644** | Owner can read/write, others can read |

---

## ✅ Verification Checklist

After applying the fix, verify:

- [ ] `index.html` has permission **644**
- [ ] `assets/` folder has permission **755**
- [ ] Files in `assets/` have permission **644**
- [ ] `https://digvano.com/` loads without 403
- [ ] Website displays correctly
- [ ] No errors in browser console (F12)

---

## 🐛 If Still Not Working

### Check these:

1. **Is index.html in the right place?**
   - Should be in: `public_html/index.html`
   - NOT in: `public_html/public_html/index.html`

2. **Check .htaccess**
   - Should exist in `public_html/.htaccess`
   - Permission should be **644**

3. **Check Hostinger Error Logs**
   - Go to Hostinger → Files → Error Logs
   - Look for any PHP or Apache errors

4. **Test directly:**
   ```bash
   curl -I https://digvano.com/index.html
   ```
   Should return **200 OK**, not 403

---

## 💡 Quick Test Commands

After fixing, test with:

```bash
# Test root
curl -I https://digvano.com/

# Test index.html directly
curl -I https://digvano.com/index.html

# Should both return: HTTP/2 200
```

---

**Recommended:** Use **Method 3** (Re-deployment) as it's the cleanest and ensures everything is correct!

