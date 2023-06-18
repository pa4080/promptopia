#!/bin/bash
local_branch_name="$(git rev-parse --abbrev-ref HEAD)"

# valid_branch_regex='^((fix|feature|feat|hotfix|chore|refactor|experimental|release|dev|development|stage)\/[a-zA-Z0-9\-\.]+)$'
valid_branch_regex='^((fix|feature|feat|hotfix|chore|refactor|experimental|release|dev|development|stage)\/.+)$'

message="There is something wrong with your branch name. Branch names in this project must adhere to this contract: $valid_branch_regex. Your commit will be rejected. You should rename your branch to a valid name and try again. You can check the page for git conventions in confluence."

if [[ ! $local_branch_name =~ $valid_branch_regex ]]; then
    echo "$message"
    echo "Your branch name: $local_branch_name"
    exit 1
fi

exit 0
