---
name: git-workflow-guardian
description: Enforcing git safety, branch isolation, develop-to-master merges with --no-ff, conventional commit messages, and zero auto-commits.
---

# Git Workflow Guardian Skill (`git-workflow-guardian`)

Use this skill whenever working with git branches, preparing changes, or executing git operations upon explicit user request.

---

## 1. Zero Tolerance Rule: No Auto-Commits
- **NEVER** run `git commit`, `git push`, or `git add` to stage commits on your own.
- Only run git write operations when the user gives explicit, verbatim commands:
  - "commit and push"
  - "commit these changes"
  - "push to develop"
- After completing any implementation, run tests, report findings, and leave the modified files in the working tree for the user to review.

---

## 2. Branch Lifecycle
```text
(feature/branch) ───> (develop) ───[--no-ff]───> (master)
```
1. **Feature Branches**:
   - Create a feature branch off `develop`:
     ```bash
     git checkout -b feat/my-new-block
     ```
2. **Develop Branch**:
   - Used for integration, web preview, and user verification.
3. **Master Branch**:
   - Production-ready releases only.
   - Merging `develop` into `master` MUST use `--no-ff`:
     ```bash
     git checkout master
     git merge develop --no-ff -m "merge: integrate develop branch"
     ```
   - **NEVER rebase on shared branches (`develop`, `master`).**

---

## 3. Commit Message Standards
- Format: `<type>(<scope>): <description>`
  - `feat(blocks): add multi-series comparison chart block`
  - `fix(web): resolve mobile viewport header clipping`
  - `refactor(calendar): extract centralized COLORS token block`
  - `docs(standards): update animation and 60fps motion contract`
- **Strict Constraints:**
  - NEVER mention external inspiration sites (e.g. "bklit") in commit messages.
  - Do NOT include emojis in commit titles.
  - Group related files into atomic commits instead of committing unrelated changes together.

---

## 4. Pre-Commit Verification Gate
Before executing any user-approved commit:
```bash
# 1. Platform & dependency validation
pnpm validate:all

# 2. Workspace-wide TypeScript validation
pnpm typecheck

# 3. Check git status to ensure only intended files are staged
git status
```
