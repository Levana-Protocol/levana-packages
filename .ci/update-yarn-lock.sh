#!/bin/bash
set -e

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
  
  # Push the changes to the pull request branch
  git push
else
  echo "No changes in yarn.lock; nothing to commit."
fi
