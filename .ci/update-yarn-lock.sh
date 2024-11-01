#!/bin/bash
set -e

# Create and checkout a new branch for the update
git checkout -b update-yarn-lock

# Run yarn install
yarn install --mode update-lockfile

# Check for changes in yarn.lock
if ! git diff --exit-code yarn.lock; then
  # Configure Git
  git config --global user.name "github-actions[bot]"
  git config --global user.email "github-actions[bot]@users.noreply.github.com"
  
  # Commit changes to yarn.lock
  git add yarn.lock
  git commit -m "update yarn.lock"
  
  # Push the changes to the new branch
  git push -u origin update-yarn-lock
  
  # Switch back to main and pull the latest changes
  git checkout main
  git pull origin main

  # Merge the update branch into main
  git merge update-yarn-lock

  # Push the updated main branch
  git push origin main

  # Cleanup
  git branch -D update-yarn-lock
else
  echo "No changes in yarn.lock; nothing to commit."
fi
