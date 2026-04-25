---
name: swagger-integration
description: Automates the setup of Fastify Swagger UI and environment execution via CLI.
---

## Instructions

1. **Architecture:** - Use the **Filesystem MCP** to read `app.ts` and `package.json`.
   - Inject `@fastify/swagger` and `@fastify/swagger-ui` into `package.json` dependencies.
   - Register both plugins in the main server file using OpenAPI 3.0 standards.
2. **Dependency Installation:** Use the **Shell MCP** to execute `npm install` to finalize the library additions.
3. **Route Description:** Ensure all existing in-memory endpoints (e.g., Tasks, Health) are decorated with appropriate JSON schemas and tags.
4. **Execution:** - Use the **Shell MCP** to run the development server (e.g., `npm run dev` or `node server.js`).
   - Confirm the Documentation route is available at `/docs`.

## Constraints

- **Consistency:** Always use the `/docs` prefix for the Swagger UI path.
- **Portability:** Ensure the configuration works for a local "in-memory" setup without requiring external database connections.
- **Verification:** The skill is only considered successful if the Shell server reports that the application has started without errors.