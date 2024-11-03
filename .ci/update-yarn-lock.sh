#!/bin/bash
set -e

# Run yarn install
yarn install --mode update-lockfile

# Check for changes in yarn.lock
if ! git diff --exit-code yarn.lock; then

  # Configure Git
  # git config --global user.name "levana-bot"
  # git config --global user.email "bot@levana.finance"
  # git remote set-url origin https://$PAT@github.com/$REPOSITORY

  # echo "print config"
  # echo $(git config --get user.name)
  # echo $(git config --get user.email)

  # Commit changes to yarn.lock
  git add yarn.lock
  git commit -m "update yarn.lock"
  
  # echo "print log"
  # echo $(git --no-pager log -1 --format="%H %an <%ae> %ad %s" --date=short)

  echo "lets push"
  # Push the changes to the pull request branch
  git push
else
  echo "No changes in yarn.lock; nothing to commit."
fi
