---
name: auth-integration
description: Enforces JWT security and RBAC patterns when extending Task API routes.
---

# Auth Integration

This skill provides the architectural constraints for adding protected endpoints to the Fastify Task Management system.

## Instructions

1. **Discovery:** Locate the target route file (typically `src/tasks/tasks.routess.ts`) and the corresponding handlers.
2. **Security Injection:**
   - Every new route must include:
     ```ts
     onRequest: [fastify.authenticate];
     ```
   - Example: `fastify.get('/path', { onRequest: [fastify.authenticate] }, handler)`.
3. **Identity Context:** Ensure the handler extracts the `userId` from `request.user.id` to maintain strict data ownership (preventing cross-user data access).
4. **Validation:**
   - Use TypeScript interfaces (e.g., CreateTaskBody).
5. **Admin Check:**
   - Only apply role checks if explicitly requested.
6. **Service Usage:**
   - Always use TaskService.

## Constraints

- No unprotected routes.
- No `any` types.
- Follow existing patterns exactly.
