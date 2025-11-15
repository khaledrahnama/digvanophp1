# 🔍 Troubleshoot Deployment Issues

## What to Check

### 1. Check if Workflow Ran

Go to GitHub and check:
```
https://github.com/khaledrahnama/digvanophp1/actions
```

Look for:
- ✅ Green checkmark = Success
- ❌ Red X = Failed
- 🟡 Yellow circle = Running
- ⚪ No workflow = Didn't trigger

### 2. Why Workflow Might Not Trigger

The workflow triggers on:
- Push to `main` branch
- Changes to `frontend/**` OR `backend/**` OR `database/**`
- OR manual trigger via GitHub UI

**If it didn't trigger:**
- Make sure you pushed to `main` branch
- Make sure files in `frontend/` or `backend/` changed
- Or manually trigger via GitHub UI

### 3. Manual Trigger (Easiest)

**Via GitHub Web Interface:**

1. Go to: https://github.com/khaledrahnama/digvanophp1/actions
2. Click on **"🚀 Deploy Everything to Hostinger"** (left sidebar)
3. Click **"Run workflow"** button (top right)
4. Select branch: **`main`**
5. Click **"Run workflow"** (green button)
6. Wait 3-5 minutes

This is the **easiest and most reliable** method!

### 4. If Workflow Failed

Check the logs:
1. Go to Actions → Click on the failed workflow
2. Click on the failed job
3. Expand the failed step
4. Look for error messages

**Common errors:**
- **FTP connection failed** → Check FTP credentials in GitHub Secrets
- **Build failed** → Check build logs
- **Permission denied** → Check file permissions

### 5. Quick Fix Commands

**Trigger deployment again:**
```bash
cd /Users/khaledrahnama/Desktop/Digvanophp1

# Use the deploy script
./deploy.sh

# OR manually
echo "" >> frontend/package.json
git add frontend/package.json
git commit -m "Trigger deployment"
git push origin main
```

### 6. Check GitHub Secrets

Make sure these secrets exist in GitHub:
1. Go to: https://github.com/khaledrahnama/digvanophp1/settings/secrets/actions
2. Verify these exist:
   - `FTP_SERVER`
   - `FTP_USERNAME`
   - `FTP_PASSWORD`

If missing, add them!

## 🎯 Recommended Solution

**Use Manual Trigger (Most Reliable):**

1. **Go to:** https://github.com/khaledrahnama/digvanophp1/actions
2. **Click:** "🚀 Deploy Everything to Hostinger"
3. **Click:** "Run workflow"
4. **Select:** `main` branch
5. **Click:** "Run workflow"
6. **Wait:** 3-5 minutes

This bypasses all git push issues and directly triggers the workflow!

## ✅ After Deployment

Test your site:
```bash
# Frontend
curl -I https://digvano.com/

# Backend
curl https://digvano.com/backend/quick-test.php
```

Both should work!

