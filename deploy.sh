#!/bin/bash
# Quick deployment trigger script

echo "🚀 Triggering deployment..."

# Navigate to project directory
cd "$(dirname "$0")"

# Make a small change to trigger workflow
echo "" >> .github/workflows/deploy-all.yml
echo "# Triggered at $(date)" >> .github/workflows/deploy-all.yml

# Add and commit
git add .github/workflows/deploy-all.yml
git commit -m "Trigger full deployment - $(date +%Y%m%d_%H%M%S)" || echo "No changes to commit"

# Push to trigger workflow
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Push completed!"
echo ""
echo "📋 Next steps:"
echo "   1. Go to: https://github.com/khaledrahnama/digvanophp1/actions"
echo "   2. Check '🚀 Deploy Everything to Hostinger' workflow"
echo "   3. Wait 3-5 minutes for deployment to complete"
echo ""
echo "🔍 To check status:"
echo "   Visit: https://github.com/khaledrahnama/digvanophp1/actions"

