# Patterns Discovered

## Purpose
This file documents recurring code patterns found in this codebase. Patterns accumulate over time as you discover them during development, debugging, and refactoring. Each pattern describes a problem-solution pair specific to this project.

## Pattern Template

```markdown
## Pattern: [Pattern Name]

**Context**: [Where/when this pattern applies]

**Problem**: [What problem does this solve?]

**Solution**: [How is it implemented in this codebase?]

**Example**:
[Code snippet showing the pattern in action]

**Related Files**: [Files where this pattern appears]

**Notes**: [Additional considerations or variations]
```

---

## Example Pattern

## Pattern: Service Data Initialization

**Context**: Backend Express service with in-memory storage

**Problem**: Initializing data structures for CRUD operations - should they start as empty arrays, null, or undefined? Inconsistent initialization can cause "cannot read property of undefined" errors.

**Solution**: In this codebase, all collection data structures are initialized as empty arrays at module load time, never null or undefined.

**Example**:
```javascript
// ✅ Correct pattern in this codebase
let todos = [];
let nextId = 1;

// ❌ Avoid - causes errors when trying to use array methods
let todos;  // undefined
let todos = null;  // null
```

**Related Files**: 
- `packages/backend/src/app.js` - todos array initialization
- Any future service modules should follow this pattern

**Notes**: 
- This prevents "Cannot read property 'push' of undefined" errors
- Makes the code more predictable and easier to test
- Empty array is "falsy enough" for existence checks while being immediately usable

---

## Discovered Patterns

<!-- Add your patterns below this line -->
<!-- Organize by category if needed (e.g., Backend, Frontend, Testing) -->
