# Working Memory System

## Purpose

This memory system tracks patterns, decisions, and lessons learned during development. It helps both human developers and AI assistants build context over time, making future work more efficient and informed.

## Why We Need This

During iterative development (TDD cycles, debugging, refactoring), you discover:
- **Patterns**: "Our service methods always initialize state as empty arrays, not null"
- **Decisions**: "We chose Material-UI over custom components for consistency"
- **Gotchas**: "The PATCH endpoint was toggling incorrectly due to hardcoded `true`"
- **Workflows**: "Always run tests after each small change, not after batches"

Without documenting these discoveries, they get lost. This system preserves that knowledge.

## Two Types of Memory

### Persistent Memory
**Location**: `.github/copilot-instructions.md`
- Foundational principles and workflows
- Project-wide conventions and standards
- Testing philosophy and patterns
- Long-term, stable guidance
- Updated rarely, only when principles change

### Working Memory
**Location**: `.github/memory/`
- Session-specific discoveries
- Code patterns found during development
- Active work-in-progress notes
- Updated frequently during development

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the system
├── session-notes.md             # Historical: Summaries of completed sessions (COMMITTED)
├── patterns-discovered.md       # Historical: Accumulated code patterns (COMMITTED)
└── scratch/
    ├── .gitignore              # Ignores all files in scratch/
    └── working-notes.md        # Active: Current session notes (NOT COMMITTED)
```

### Key Distinction: Committed vs Ephemeral

**Committed to Git** (Historical Record):
- `session-notes.md` - Completed session summaries
- `patterns-discovered.md` - Discovered code patterns

**Not Committed** (Active Work):
- `scratch/working-notes.md` - Live development notes
- All files in `scratch/` directory are ignored by git

**Workflow**: Take notes in `scratch/working-notes.md` during work. At session end, extract key findings into `session-notes.md` and `patterns-discovered.md`. The scratch file resets each session.

## File Purposes

### session-notes.md
**What**: Historical record of completed development sessions
**When to use**:
- After completing a major task or exercise step
- At the end of a development session
- When closing out a bug fix or feature

**What to document**:
- Session identifier (date, step number, or task name)
- What was accomplished
- Key findings and decisions made
- Outcomes (tests passing, features working)

**Example use cases**:
- "Session 2024-02-03: Fixed backend POST endpoint initialization bug"
- "Step 5-1: Implemented TDD workflow for CRUD endpoints"

### patterns-discovered.md
**What**: Accumulation of code patterns found in this codebase
**When to use**:
- When you find a recurring pattern in the code
- After fixing a bug that reveals a design pattern
- When making architectural decisions

**What to document**:
- Pattern name and context
- Problem it solves
- Solution/implementation approach
- Example code
- Related files

**Example use cases**:
- "Service initialization pattern: Always use empty arrays"
- "Error handling pattern: Centralized middleware in Express"
- "React Query pattern: Mutations with optimistic updates"

### scratch/working-notes.md
**What**: Live notes during active development
**When to use**:
- **During TDD cycles**: Track which test you're working on, what it expects, implementation approach
- **During linting**: Document error categories, systematic fix approach
- **During debugging**: Hypothesis, tests performed, findings
- **During feature implementation**: Step-by-step plan, current progress, blockers

**What to document**:
- Current task and approach
- Key findings in real-time
- Decisions being made
- Blockers encountered
- Next steps
- Any temporary notes or reminders

**Workflow**:
1. Start session: Open `scratch/working-notes.md`
2. Update continuously as you work
3. Document discoveries, decisions, blockers
4. End session: Summarize key findings → `session-notes.md`
5. End session: Extract patterns → `patterns-discovered.md`
6. Clear `scratch/working-notes.md` for next session (or leave it - it's gitignored)

## When to Use During Workflows

### TDD Workflow (Red-Green-Refactor)

**In scratch/working-notes.md**:
```markdown
## Current Task
Fixing POST /api/todos endpoint test

## Approach
1. Read failing test - expects 201, todo object with id/title/completed/createdAt
2. Implement minimal endpoint
3. Run test
4. Refactor if needed

## Key Findings
- Test expects auto-generated ID
- createdAt should be ISO string
- completed defaults to false

## Decisions Made
- Use Date.now() for ID generation
- Use new Date().toISOString() for createdAt
```

**At session end → session-notes.md**:
```markdown
## Session: 2024-02-03 - Step 5-1 TDD Cycle

### Accomplished
- Fixed POST /api/todos endpoint
- Fixed PATCH /api/todos/:id toggle bug
- All CRUD tests now passing

### Key Findings
- Toggle bug was hardcoded `true` instead of `!todo.completed`
- ID generation needed global counter, not Date.now()

### Outcomes
- 15/15 backend tests passing
- Ready for frontend integration
```

### Linting Workflow

**In scratch/working-notes.md**:
```markdown
## Current Task
Fixing ESLint errors in backend

## Approach
1. Run lint → categorize errors
2. Fix by category: unused vars, console.logs
3. Re-run after each category

## Key Findings
- 3 unused variables in app.js
- 5 console.log statements need removal/replacement
- All errors are fixable, no architectural issues

## Decisions Made
- Remove unused imports
- Replace console.log with proper error handling
- Keep one console.log in index.js for server start confirmation
```

### Debugging Workflow

**In scratch/working-notes.md**:
```markdown
## Current Task
Debug: Delete button does nothing in UI

## Approach
1. Check browser console for errors
2. Review handleDeleteTodo function
3. Test with API directly

## Key Findings
- Function logs to console but doesn't call API
- deleteTodoMutation defined but not invoked
- API endpoint works when tested with curl

## Blockers
None - clear implementation gap

## Next Steps
1. Call deleteTodoMutation.mutate(id)
2. Test in browser
3. Verify todo is removed from UI
```

**If pattern emerges → patterns-discovered.md**:
```markdown
## Pattern: React Query Mutation Hook Usage

**Context**: Frontend API mutations with React Query

**Problem**: Mutation is defined but not invoked, causing no API call

**Solution**: 
1. Define mutation with useMutation hook
2. Call mutation.mutate(data) in event handler
3. Handle onSuccess callback to update UI

**Example**:
[Code example here]

**Related Files**: src/App.js
```

## How AI Uses These Files

When you interact with GitHub Copilot:

1. **Context Building**: Copilot reads `.github/copilot-instructions.md` for foundational principles
2. **Pattern Recognition**: Copilot checks `patterns-discovered.md` for codebase-specific patterns
3. **Historical Context**: Copilot reviews `session-notes.md` for what's been done
4. **Active Context**: During a session, reference `scratch/working-notes.md` explicitly to give Copilot your current focus

**Example prompt**:
```
"Review my working notes in .github/memory/scratch/working-notes.md. 
I'm stuck on the blocker I documented. What should I try next?"
```

**Benefit**: Copilot gives context-aware suggestions based on your documented approach, not generic advice.

## Best Practices

### DO ✅
- Update `scratch/working-notes.md` continuously during work
- Be specific about findings and decisions
- Document blockers as soon as you hit them
- Extract patterns when you see them repeated
- Keep session notes concise but informative

### DON'T ❌
- Don't wait until end of session to document findings
- Don't duplicate content between files (session-notes vs patterns)
- Don't document every tiny step (focus on key findings)
- Don't let scratch notes grow indefinitely (summarize and clear)
- Don't commit scratch/ directory (it's gitignored)

## Workflow Summary

```
┌─────────────────────────────────────────────────────────┐
│ Start Session                                           │
│ ↓                                                       │
│ Open scratch/working-notes.md                           │
│ ↓                                                       │
│ Work (TDD/Debug/Implement)                             │
│ ↓                                                       │
│ Document continuously in scratch/working-notes.md       │
│ ↓                                                       │
│ Find patterns? → Add to patterns-discovered.md         │
│ ↓                                                       │
│ Complete task/session                                   │
│ ↓                                                       │
│ Summarize key findings → session-notes.md              │
│ ↓                                                       │
│ Clear/archive scratch/working-notes.md                  │
│ ↓                                                       │
│ Commit session-notes.md and patterns-discovered.md     │
└─────────────────────────────────────────────────────────┘
```

## Getting Started

1. **Read this README** to understand the system
2. **Open `scratch/working-notes.md`** before starting work
3. **Document as you go** - don't wait
4. **At session end**, extract findings to committed files
5. **Reference memory files** when working with Copilot

The more you use this system, the more context you build, and the more effective your AI-assisted development becomes.

---

*This memory system is designed to complement the project's agentic development philosophy: iterative, feedback-driven, and continuously learning.*
