---
description: "Validate that all success criteria for the current step are met"
agent: "code-reviewer"
tools: ['search', 'read', 'execute', 'web', 'todo']
---

# Validate Step Success Criteria

You are validating that the current step's success criteria are met. Apply systematic code review principles to verify completion.

## Step Number

Step to validate: ${input:step-number:Step number (e.g., 5-0, 5-1, 5-2)}

## Validation Instructions

### 1. Find the Exercise Issue

Use gh CLI to find the main exercise issue:

```bash
gh issue list --state open
```

Look for an issue with "Exercise:" in the title. This is the main exercise issue.

### 2. Get Issue with All Comments

Retrieve the full issue including all comments (steps are posted as comments):

```bash
gh issue view <issue-number> --comments
```

### 3. Locate the Specific Step

Search through the issue output to find:

```
# Step ${input:step-number}:
```

For example, if validating step 5-1, search for `# Step 5-1:`

### 4. Extract Success Criteria

Within the step section, find the **Success Criteria** subsection. This typically looks like:

```markdown
## Success Criteria

- [ ] All backend tests pass
- [ ] No compilation errors
- [ ] Code follows TDD principles
```

Extract all the checkboxes/criteria listed.

### 5. Validate Each Criterion

For each success criterion, systematically check:

**Example: "All backend tests pass"**

```bash
cd packages/backend
npm test
```

Check output:
- ✅ All tests passing? → Criterion met
- ❌ Tests failing? → Criterion NOT met, provide details

**Example: "No ESLint errors"**

```bash
npm run lint
```

Check output:
- ✅ No errors? → Criterion met
- ❌ Errors present? → Criterion NOT met, list errors

**Example: "Application runs without errors"**

```bash
npm run start
# Check for startup errors
```

**Example: "Code follows best practices"**

- Review code quality
- Check for code smells
- Verify idiomatic patterns used

### 6. Create Validation Checklist

Use the `todo` tool to track validation progress:

```markdown
1. Check backend tests pass - not-started
2. Check frontend tests pass - not-started
3. Check no lint errors - not-started
4. Verify app runs correctly - not-started
5. Review code quality - not-started
```

Mark each as completed as you validate.

### 7. Provide Detailed Report

For each criterion:

**If MET** ✅:
- State clearly: "✅ Criterion met: [description]"
- Show supporting evidence (test output, lint results, etc.)

**If NOT MET** ❌:
- State clearly: "❌ Criterion not met: [description]"
- Explain what's wrong
- Provide specific guidance to fix
- Reference the code-reviewer agent's systematic approach

**If PARTIALLY MET** ⚠️:
- State what works and what doesn't
- Provide specific next steps

### 8. Overall Step Status

Summarize the validation:

**COMPLETE** - All criteria met:
```
✅ Step ${input:step-number} COMPLETE

All success criteria met. Ready to proceed.

Next actions:
- Run /commit-and-push to save your work
- Move to next step
```

**INCOMPLETE** - Some criteria not met:
```
⚠️ Step ${input:step-number} INCOMPLETE

Criteria not met:
- [List specific unmet criteria]

Guidance to complete:
1. [Specific action for first issue]
2. [Specific action for second issue]

After fixing, run /validate-step ${input:step-number} again.
```

## Validation Categories

### Test Validation

```bash
# Backend tests
cd packages/backend
npm test

# Frontend tests
cd packages/frontend
npm test

# All tests
npm test
```

Look for:
- All tests passing
- No failing tests
- No skipped tests (unless intentional)
- Test coverage maintained

### Lint Validation

```bash
# Lint all packages
npm run lint

# Lint specific package
npm run lint --workspace=packages/backend
```

Look for:
- 0 errors (critical)
- Ideally 0 warnings (best practice)
- Categorize any remaining issues

### Application Validation

```bash
# Start application
npm run start
```

Verify:
- No startup errors
- Application runs on expected ports
- Manual testing shows features work
- No console errors in browser

### Code Quality Validation

Review the code changes:
- Follows project conventions
- Uses idiomatic JavaScript/React patterns
- Proper error handling
- Clear, maintainable code
- No code smells or anti-patterns

## Error Handling

If validation fails:

1. **Don't just report failure** - provide actionable guidance
2. **Categorize issues** (tests, linting, functionality, quality)
3. **Prioritize fixes** (critical errors first)
4. **Reference appropriate agent**:
   - Test issues → Suggest using `@tdd-developer`
   - Lint issues → You're already in `@code-reviewer` mode
   - Implementation gaps → Suggest using `@tdd-developer`

## Output Format

```
# Validation Report: Step ${input:step-number}

## Success Criteria Status

### Backend Tests
✅ All 15 backend tests passing
Evidence:
  Test Suites: 1 passed, 1 total
  Tests:       15 passed, 15 total

### Lint Errors
❌ 3 ESLint errors in backend
Issues:
  - no-unused-vars: 'data' is assigned but never used (app.js:45)
  - no-console: Unexpected console statement (app.js:67)
  - no-var: Unexpected var, use let or const instead (app.js:89)

Guidance: Use @code-reviewer to fix these systematically

### Application Functionality
✅ Application starts and runs correctly
Evidence: Tested CRUD operations manually, all working

## Overall Status
⚠️ INCOMPLETE - Fix linting errors before proceeding

## Next Steps
1. Use @code-reviewer to address ESLint errors systematically
2. Run /validate-step ${input:step-number} again
3. When complete, use /commit-and-push to save work
```

## Remember

You are in code-reviewer agent mode. Apply systematic analysis:
- Categorize issues by type
- Provide specific, actionable guidance
- Explain WHY criteria matter
- Reference code quality best practices
- Help user understand what "done" looks like

The goal is not just to check boxes, but to ensure the code meets professional standards and the step's learning objectives are achieved.
