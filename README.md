# Task API Demo

A lightweight Fastify API that demonstrates JWT-protected task access using TypeScript. The project is intentionally small and easy to reason about, which makes it a good base for demos, local experiments, and incremental feature work.

## Tech Stack

- Fastify
- TypeScript
- JWT via `@fastify/jwt`
- `dotenv` for environment configuration
- Prisma is not configured in the current codebase yet; task data is stored in memory

## Features

- `GET /` returns a simple service status response
- `GET /tasks` returns tasks for the authenticated user only
- Centralized Fastify auth plugin with JWT verification
- In-memory task service with `getAll`, `create`, and `delete` methods ready for route expansion

## Project Structure

```text
src/
  server.ts
  plugins/
    auth.ts
  tasks/
    tasks.routess.ts
    tasks.services.ts
    tasks.types.ts
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local `.env` file:

```env
JWT_SECRET=your-long-random-secret
PORT=3000
```

3. Start the development server:

```bash
npm run dev
```

The application runs on `http://localhost:3000` by default.

## Prisma and Migrations

Prisma is not part of the current implementation, so there are no migrations to run today. If you later introduce Prisma for persistence, a typical workflow would look like this:

```bash
npx prisma migrate dev
```

For now, all task data is stored in memory and resets when the server restarts.

## API Notes

### `GET /`

Returns a simple health-style payload:

```json
{
  "status": "Task Agent API is Online"
}
```

### `GET /tasks`

This route is protected with `onRequest: [fastify.authenticate]`. A valid bearer token must be provided, and the handler uses `request.user.id` to scope results to the authenticated user.

Example request:

```bash
curl http://localhost:3000/tasks \
  -H "Authorization: Bearer <jwt>"
```

## Environment and Security

- `JWT_SECRET` is required at startup
- `.env` is ignored by Git and should remain local
- `node_modules`, `dist`, and `build` are excluded from version control

## Agentic Skills Included

The repository includes local Codex skills under `.agents/skills/` to support guided development workflows:

- `auth-integration`
- `github-pr-manager`
- `project-architect`

These skills are intended to help with secure route generation, repository hygiene, and documentation or PR workflows during live demos and iterative development.
