#!/bin/bash
set -e

echo $USER
echo $REPOSITORY

# Run yarn install
yarn install --mode update-lockfile

# Check for changes in yarn.lock
if ! git diff --exit-code yarn.lock; then

  git config --get user.name
  git config --get user.email

  # Configure Git
  git config --global user.name "$USER"
  git config --global user.email "bot@levana.finance"
  git remote set-url origin https://$PAT@github.com/$REPOSITORY

  git config --get user.name
  git config --get user.email

  # Commit changes to yarn.lock
  git add yarn.lock
  git commit -m "update yarn.lock"
  
  git --no-pager log --format="%H %an <%ae> %ad %s" --date=short $(git rev-list --max-parents=0 HEAD)

  # Push the changes to the pull request branch
  git push
else
  echo "No changes in yarn.lock; nothing to commit."
fi
