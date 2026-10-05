Virtual Office — 2D multiplayer workspace for humans and governed AI employees.

Phase 1 foundation: Next.js App Router, strict TypeScript, Prisma/PostgreSQL, Redis, Auth.js, workspace RBAC, departments, office/map models, AI workforce governance primitives, Docker and tests.

Run: copy .env.example to .env; docker compose up -d; npm install; npm run db:generate; npm run db:migrate; npm run db:seed; npm run dev.

Roadmap: Foundation → Phaser office → multiplayer → LiveKit/WebRTC → departments → AI agents → human approvals → AI presence → editor → analytics → security/testing → production.
