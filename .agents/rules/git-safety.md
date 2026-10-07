# Git Safety Rule

## CRITICAL: NEVER AUTO-COMMIT OR AUTO-PUSH

1. **NEVER run `git commit`, `git push`, `git add` (for staging commits), or any repository write/publish command unless the USER EXPLICITLY commands you to do so** with clear, direct words like:
   - "commit and push"
   - "commit these changes"
   - "push to origin"
   - "make a git commit"

2. **Under NO circumstances** should you:
   - Proactively commit code after finishing a task or refactor.
   - Proactively push branches or commits to remote.
   - Run git hooks, rebases, or history modifications without explicit user instruction.

3. **Standard Completion Behavior**:
   - Make all file edits and test/verify them.
   - Leave modified files cleanly in the working tree.
   - Report clearly what was changed to the user and let the user inspect, commit, and push whenever they are ready.
