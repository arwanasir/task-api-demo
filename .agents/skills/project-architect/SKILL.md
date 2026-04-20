---
name: project-architect
description: Automates project initialization, including .gitignore configuration and professional README generation.
---

# Project Architect

This skill ensures the project meets professional standards for repository hygiene and documentation.

## Instructions

1. **Hygiene Check:** - Check if a `.gitignore` exists. If not, create one.
   - Automatically include: `node_modules`, `.env`, `dist`, `build`, and `.DS_Store`.
2. **Documentation Audit:**
   - Open `README.md`. If it is empty, generate a professional version, and if incomplete, append missing sections.
   - **Required Sections:** Project Title, Tech Stack (Fastify, Prisma, TypeScript, JWT), Setup Instructions (npm install/migrate), and a brief mention of the "Agentic Skills" included.
3. **Validation:** Ensure the `.env` file is never tracked by git to prevent security leaks.

## Constraints

- **Professional Tone:** The README must be written in a "Senior Developer" tone.
- **Safety:** Do not overwrite existing documentation unless the user explicitly asks; only fill empty files.
