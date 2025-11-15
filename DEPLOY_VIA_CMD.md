# 🚀 Deploy via Command Line

Since you've deleted everything on Hostinger, here's how to redeploy using command line.

## 📋 Quick Commands

### Option 1: Trigger Full Deployment (Recommended)

```bash
# Make sure you're in the project directory
cd /Users/khaledrahnama/Desktop/Digvanophp1

# Add all changes
git add .

# Commit the changes (this will trigger deployment)
git commit -m "Trigger full deployment - redeploy everything"

# Push to main branch (this triggers the workflows)
git push origin main
```

This will trigger:
- ✅ "🚀 Deploy Everything to Hostinger" workflow (if frontend or backend changed)
- ✅ Or individual workflows based on what changed

### Option 2: Trigger Specific Deployment

#### Deploy Frontend Only:
```bash
cd /Users/khaledrahnama/Desktop/Digvanophp1

# Make a small change to trigger frontend deployment
echo "" >> frontend/package.json

git add frontend/package.json
git commit -m "Trigger frontend deployment"
git push origin main
```

#### Deploy Backend Only:
```bash
cd /Users/khaledrahnama/Desktop/Digvanophp1

# Make a small change to trigger backend deployment
echo "" >> backend/index.php

git add backend/index.php
git commit -m "Trigger backend deployment"
git push origin main
```

### Option 3: Force Trigger All Workflows

```bash
cd /Users/khaledrahnama/Desktop/Digvanophp1

# Touch workflow files to trigger them
touch .github/workflows/deploy-all.yml
touch .github/workflows/deploy-frontend.yml
touch .github/workflows/deploy-backend.yml

git add .github/workflows/
git commit -m "Trigger all deployment workflows"
git push origin main
```

## 🔍 Check Deployment Status

After pushing, you can:

1. **Watch on GitHub:**
   - Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/actions
   - You'll see the workflows running

2. **Or check via command line:**
   ```bash
   # Install GitHub CLI if you don't have it
   # brew install gh  (on macOS)
   
   # Then check workflows
   gh workflow list
   gh run list
   ```

## ⏱️ Wait Time

- **Frontend deployment:** 2-3 minutes
- **Backend deployment:** 1-2 minutes  
- **Full deployment:** 3-5 minutes

## ✅ Verify After Deployment

Once deployment completes, test:

```bash
# Test frontend
curl -I https://digvano.com/

# Test backend
curl https://digvano.com/backend/quick-test.php
```

## 🎯 Recommended: Full Deployment

Since you deleted everything, use **Option 1** to deploy both frontend and backend together:

```bash
cd /Users/khaledrahnama/Desktop/Digvanophp1
git add .
git commit -m "Redeploy everything to Hostinger"
git push origin main
```

Then wait 3-5 minutes and check GitHub Actions to see the progress!

