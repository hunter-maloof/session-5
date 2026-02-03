---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ['read', 'execute', 'todo']
---

# Commit and Push Changes

This prompt analyzes your changes, generates a conventional commit message, and pushes to a feature branch.

## Branch Name

Target branch: ${input:branch-name:Feature branch name (e.g., feature/step-5-1-backend-tests)}

## Instructions

### 1. Validate Branch Name

**CRITICAL**: The branch name is REQUIRED. If not provided, stop and ask the user for it.

Examples of good branch names:
- `feature/step-5-1-backend-tests`
- `feature/implement-delete-endpoint`
- `fix/toggle-bug`

### 2. Analyze Changes

Use git diff to understand what has changed:

```bash
git status
git diff
```

Review:
- Which files were modified?
- What functionality was added/fixed?
- Are there any test changes?

### 3. Generate Conventional Commit Message

Create a commit message following conventional commit format:

**Format**: `<type>: <description>`

**Types**:
- `feat:` - New feature
- `fix:` - Bug fix
- `test:` - Adding or updating tests
- `refactor:` - Code restructuring without behavior change
- `chore:` - Tooling, dependencies, config
- `docs:` - Documentation changes
- `style:` - Code formatting (not CSS)

**Examples**:
- `feat: implement POST /api/todos endpoint`
- `fix: correct toggle behavior in PATCH endpoint`
- `test: add integration tests for DELETE endpoint`
- `refactor: extract validation to separate function`
- `chore: fix ESLint errors in backend`

**Guidelines**:
- Use imperative mood ("add" not "added" or "adds")
- Keep description clear and specific
- Reference what changed, not why (that's in code comments)
- Under 72 characters for the summary line

### 4. Create or Switch to Branch

**Check if branch exists**:

```bash
git branch --list ${input:branch-name}
```

**If branch doesn't exist**, create it:

```bash
git checkout -b ${input:branch-name}
```

**If branch exists**, switch to it:

```bash
git checkout ${input:branch-name}
```

### 5. Stage All Changes

**IMPORTANT**: Stage ALL changes before committing:

```bash
git add .
```

Verify staged changes:

```bash
git status
```

### 6. Commit with Generated Message

Commit the staged changes:

```bash
git commit -m "<generated-commit-message>"
```

Example:

```bash
git commit -m "feat: implement POST /api/todos endpoint"
```

### 7. Push to Feature Branch

Push the changes to the remote repository:

```bash
git push origin ${input:branch-name}
```

**CRITICAL**: ONLY push to the user-provided branch name. NEVER push to `main` or any other branch.

### 8. Verify Push Success

Confirm the push was successful:

```bash
git status
```

Should show: "Your branch is up to date with 'origin/${input:branch-name}'."

## Safety Checks

Before executing any git commands:

- ✅ Verify branch name is provided
- ✅ Confirm you're on the correct branch (not main)
- ✅ Check that changes are staged (git add .)
- ✅ Verify commit message follows conventional format
- ✅ Ensure pushing to the correct remote branch

**NEVER**:
- ❌ Commit directly to `main` branch
- ❌ Push to `main` branch
- ❌ Force push (`git push -f`) unless explicitly requested
- ❌ Commit without staging changes first

## Error Handling

If any command fails:

1. **Stop immediately** - don't continue with subsequent commands
2. **Show the error** to the user
3. **Explain what went wrong**
4. **Suggest remediation** based on the error

Common errors:
- **Merge conflicts**: User needs to resolve manually
- **No changes staged**: Ensure `git add .` was run
- **Branch already exists**: Switch instead of create
- **Push rejected**: May need to pull first

## Output Format

Provide a summary:

```
✅ Commit and Push Summary

Branch: feature/step-5-1-backend-tests
Commit: feat: implement POST /api/todos endpoint

Changes committed:
- packages/backend/src/app.js
- packages/backend/__tests__/app.test.js

Next steps:
- Create a pull request (if ready)
- Continue with next step (if applicable)
```

## Example Execution

```bash
# 1. Analyze changes
git status
git diff

# 2. Create/switch to branch
git checkout -b feature/step-5-1-backend-tests

# 3. Stage all changes
git add .

# 4. Commit
git commit -m "test: fix failing backend integration tests"

# 5. Push
git push origin feature/step-5-1-backend-tests

# 6. Confirm
✅ Changes pushed to feature/step-5-1-backend-tests
```

Remember: This workflow uses conventional commits and feature branches as specified in the Git Workflow section of the project instructions.
