# Git Safety & Workflow Contract

## CRITICAL: ZERO TOLERANCE FOR UNAUTHORIZED COMMITS OR PUSHES

### 1. Absolute Rule
**NEVER run `git commit`, `git push`, or `git add` to stage commits without explicit user instruction.**
- Clear instructions require explicit user commands, such as:
  - `"commit and push"`
  - `"commit these changes"`
  - `"push to origin"`
  - `"make a git commit"`
- Under NO circumstances should an agent auto-commit or auto-push after finishing an implementation, refactor, or fix.
- Always leave modified files cleanly in the working tree for user review.

---

### 2. Branching & Merging Strategy
1. **Branch Isolation**:
   - All feature work, new blocks, and refactors must occur on a dedicated feature branch or `develop`.
   - Never commit experimental or unverified work directly to `master`.
2. **Merging to Master**:
   - When the user explicitly requests merging to master, ALWAYS use `git merge develop --no-ff`.
   - **NEVER use `git rebase` on shared branches (`develop`, `master`)** as this rewrites history and desynchronizes remote clones.
3. **Branch Verification Gate**:
   - Before requesting or executing any merge, ensure working tree is clean and `pnpm validate:all` passes.

---

### 3. Commit Message Hygiene & Etiquette
1. **Conventional Commits**:
   - Format: `<type>(<scope>): <concise description>` (e.g. `feat(blocks): add comparison-chart multi-series component`, `fix(web): resolve mobile header clipping`).
2. **Atomic Commits**:
   - Do NOT commit every modified file at once if they belong to separate concerns. Group changes logically into discrete atomic commits.
3. **Forbidden Mentions**:
   - **NEVER mention external reference sites or competitors** (e.g., "bklit", "reddit", etc.) in commit messages. Commits must describe the technical work done objectively.
4. **No Emojis**:
   - Do not include emojis in commit titles or technical documentation.
