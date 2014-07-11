#!/bin/sh --noprofile

# Get the name of the current Git branch and then ensure that only
# the master Git branch is deployable to production by this script.
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

# Only push this update to the server if the current branch is the Master branch
if [ "$branch" == "master" ]
then
  git checkout gh-pages
  cp build/release/* . -v
  git add index.html -f
  git add style.css -f
  git add bundle.js -f
  git commit -m "deploy at `git log | head -c15`"
  git push origin gh-pages -f
  git checkout master -f
else
  echo "not currently on master, not checking in to github"
fi
