---
description: "Execute instructions from the current GitHub Issue step"
agent: "tdd-developer"
tools: ['search', 'read', 'edit', 'execute', 'web', 'todo']
---

# Execute Step from GitHub Issue

You are executing the current step from the main exercise GitHub Issue. Follow the instructions systematically and apply Test-Driven Development principles.

## Issue Number

Issue to execute from: ${input:issue-number:GitHub issue number (leave empty to auto-detect)}

## Execution Instructions

### 1. Find the Exercise Issue

If the user provided an issue number, use it directly. Otherwise, find the exercise issue:

```bash
gh issue list --state open
```

Look for an issue with "Exercise:" in the title. This is the main exercise issue that contains all the steps.

### 2. Get Issue Content with Comments

Retrieve the full issue with all comments (steps are posted as comments):

```bash
gh issue view <issue-number> --comments
```

Parse the output to understand the current step and its activities.

### 3. Identify Activities to Execute

Look for sections marked with `:keyboard: Activity:` in the step instructions. These are the tasks you need to complete.

### 4. Execute Systematically

For each activity:

1. **Create a TODO list** using the `todo` tool to track activities
2. **Apply TDD principles** from the tdd-developer agent:
   - For new features: Write tests FIRST, then implement (Red-Green-Refactor)
   - For fixing tests: Analyze failures, fix code, verify
3. **Work incrementally** - complete one activity at a time
4. **Run tests frequently** after each change
5. **Verify functionality** manually if needed

### 5. Testing Scope Constraints

**CRITICAL**: Respect the project's testing scope:

- ✅ **USE**: Jest (backend), React Testing Library (frontend)
- ✅ **DO**: Write unit tests and integration tests
- ✅ **DO**: Manual browser testing for full UI flows
- ❌ **NEVER SUGGEST**: Playwright, Cypress, Selenium, or other e2e frameworks
- ❌ **NEVER SUGGEST**: Browser automation tools

**Reason**: This project focuses on unit/integration tests only, without e2e complexity.

### 6. DO NOT Commit or Push

**IMPORTANT**: This prompt is for EXECUTION only, not for committing changes.

- ✅ Execute the step activities
- ✅ Run tests to verify
- ✅ Manual browser testing if needed
- ❌ Do NOT run `git commit`
- ❌ Do NOT run `git push`
- ❌ Do NOT stage changes

**After execution is complete**, inform the user to:
1. Run `/validate-step` to check success criteria
2. Run `/commit-and-push` to commit and push changes

### 7. Completion Checklist

Before finishing, ensure:

- [ ] All `:keyboard: Activity:` sections completed
- [ ] Tests run and pass (or fail as expected for TDD Red phase)
- [ ] Code follows TDD principles (test-first for new features)
- [ ] Manual testing done if required
- [ ] No e2e frameworks suggested or installed
- [ ] Changes NOT committed (user will do this with `/commit-and-push`)

## Output Format

Provide a summary of:
1. Which step was executed
2. What activities were completed
3. Test results (passing/failing)
4. Any issues encountered
5. Next steps: Run `/validate-step <step-number>` to verify completion

## Example Workflow

```
1. Found exercise issue #1: "Exercise: Session 5 - Agentic Development"
2. Retrieved step instructions from issue comments
3. Step 5-1 has 3 activities:
   - Fix GET /api/todos test
   - Fix POST /api/todos test
   - Fix PATCH /api/todos/:id test
4. Executing activities using TDD workflow...
5. ✅ All activities completed
6. ✅ Tests passing
7. Ready for validation - run: /validate-step 5-1
```

Remember: You are in tdd-developer agent mode. Apply Red-Green-Refactor principles throughout execution.
