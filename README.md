# 🏢 Virtual Office

> **A realtime 2D virtual workplace where humans and governed AI employees work together.**

Virtual Office is a production-oriented, multi-tenant platform for building digital companies with a persistent 2D office, multiplayer presence, departments, meetings, chat, and an AI workforce supervised by humans.

The project is designed as an original implementation inspired by the **concept** of virtual workplaces. It does not copy proprietary source code, assets, maps, branding, or intellectual property from other products.

---

## ✨ Vision

Virtual Office turns a traditional company workspace into a programmable environment:

- 👤 Humans work inside a realtime 2D office.
- 🤖 AI employees operate inside departments.
- 🧑‍💼 Human supervisors control AI employees.
- 🧠 AI employees use company knowledge and task memory.
- 🔐 Sensitive AI actions require human approval.
- 💰 Every AI employee has budgets and usage tracking.
- 🗺️ Offices are data-driven and editable.
- 🎙️ Rooms support realtime communication.
- 📊 Managers can inspect productivity, KPIs and activity.
- 🏢 One user can belong to multiple workspaces.

The long-term goal is not simply an AI chatbot. It is an **AI-native operating system for a company**.

---

## 🚀 Current status

The repository is being implemented incrementally in production-oriented phases.

### Phase 1 — Foundation

Implemented:

- Next.js App Router
- TypeScript strict mode
- Tailwind CSS
- Auth.js foundation
- Credentials authentication
- Google OAuth configuration
- Prisma + PostgreSQL
- Redis foundation
- Multi-tenant workspaces
- RBAC
- Departments
- Human supervisors
- Offices and rooms
- Data-driven maps
- Map objects
- Presence model
- Messaging model
- AI employee model
- AI task model
- AI activity model
- AI approval model
- AI governance policy foundation
- Multi-provider AI configuration
- Docker Compose
- Prisma seed
- Vitest foundation
- Protected workspace routes

### Roadmap

| Phase | Scope | Status |
|---|---|---|
| 1 | Foundation | 🟢 In progress |
| 2 | Phaser Virtual Office | 🟡 Planned |
| 3 | Multiplayer / WebSocket | 🟡 Planned |
| 4 | WebRTC / LiveKit | 🟡 Planned |
| 5 | Departments & Management | 🟡 Planned |
| 6 | AI Workforce Runtime | 🟡 Planned |
| 7 | Human-in-the-loop | 🟡 Planned |
| 8 | AI Office Presence | 🟡 Planned |
| 9 | Office Editor | 🟡 Planned |
| 10 | Admin & Analytics | 🟡 Planned |
| 11 | Security & Testing | 🟡 Planned |
| 12 | Production Deployment | 🟡 Planned |

---

# 🧱 Architecture

Virtual Office separates application UI, game rendering, realtime state and AI execution.

```text
                         ┌─────────────────────┐
                         │      Browser        │
                         │                     │
                         │ Next.js / React     │
                         │ Phaser Game Engine  │
                         │ Chat / Meetings     │
                         └──────────┬──────────┘
                                    │
                       HTTPS / WebSocket / WebRTC
                                    │
             ┌──────────────────────┼──────────────────────┐
             │                      │                      │
             ▼                      ▼                      ▼
      ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
      │ Next.js API │       │ Realtime    │       │ LiveKit/SFU │
      │ Server      │       │ Server      │       │ Voice/Video │
      └──────┬──────┘       └──────┬──────┘       └─────────────┘
             │                      │
             │                ┌─────▼─────┐
             │                │   Redis   │
             │                │ Presence  │
             │                │ Pub/Sub   │
             │                └─────┬─────┘
             │                      │
             └──────────┬───────────┘
                        ▼
                 ┌─────────────┐
                 │ PostgreSQL  │
                 │ Prisma ORM  │
                 └─────────────┘

AI REQUEST
Human/Task
    │
    ▼
AI Employee
    │
    ▼
Agent Core
    ├── Memory
    ├── Planning
    ├── Policy
    ├── Budget
    ├── Approval
    └── Tool Router
            │
            ▼
      Provider Registry
            │
   ┌────────┼─────────┐
   ▼        ▼         ▼
 OpenAI  Anthropic  Gemini ...
```

---

# 🤖 AI Provider System

Virtual Office is designed to be **provider agnostic**.

You can configure multiple providers at the same time and later assign different models to different AI employees.

## Supported providers

| Provider | Environment key | Custom base URL |
|---|---|---|
| OpenAI | `OPENAI_API_KEY` | Yes |
| Anthropic | `ANTHROPIC_API_KEY` | Yes |
| Google Gemini | `GEMINI_API_KEY` / `GOOGLE_API_KEY` | — |
| OpenRouter | `OPENROUTER_API_KEY` | Yes |
| NVIDIA NIM | `NVIDIA_API_KEY` | Yes |
| Groq | `GROQ_API_KEY` | Yes |
| Mistral | `MISTRAL_API_KEY` | Yes |
| xAI / Grok | `XAI_API_KEY` | Yes |
| DeepSeek | `DEEPSEEK_API_KEY` | Yes |
| Together AI | `TOGETHER_API_KEY` | Yes |
| Fireworks AI | `FIREWORKS_API_KEY` | Yes |
| Perplexity | `PERPLEXITY_API_KEY` | Yes |
| Cerebras | `CEREBRAS_API_KEY` | Yes |
| Cohere | `COHERE_API_KEY` | Yes |
| Azure OpenAI | `AZURE_OPENAI_API_KEY` | Endpoint |
| AWS Bedrock | AWS credentials | Region |
| Ollama | Optional | Yes |
| Custom | `CUSTOM_AI_API_KEY` | Yes |

### Recommended configuration

Copy:

```bash
cp .env.example .env.local
```

Then add only the providers you use.

Example:

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=...
OPENROUTER_API_KEY=sk-or-...
NVIDIA_API_KEY=nvapi-...
```

Do **not** use `NEXT_PUBLIC_` for an AI secret.

The Gemini documentation explicitly recommends environment variables such as `GEMINI_API_KEY` or `GOOGLE_API_KEY`. citeturn0search0turn0search3

---

# 🔐 Secrets architecture

Provider secrets are intentionally server-only.

```text
.env.local
    │
    ▼
Server runtime
    │
    ▼
Provider Registry
    │
    ▼
Provider Adapter
    │
    ▼
External AI API
```

Never:

- put API keys in React components
- put API keys in `NEXT_PUBLIC_*`
- store raw API keys in PostgreSQL
- commit `.env.local`
- print API keys in logs
- send provider credentials to the browser
- expose provider credentials to AI employees

Auth.js itself requires an `AUTH_SECRET` for secure token and verification-hash handling. citeturn0search2

Generate one with:

```bash
npx auth secret
```

---

# 🧠 AI Employee Architecture

Every AI employee follows this model:

```text
AI Employee
     │
     ▼
Agent Core
     │
     ├── System Instructions
     ├── Personality
     ├── Expertise
     ├── Responsibilities
     ├── Goals
     ├── Restrictions
     │
     ├── Memory
     │    ├── Short-term
     │    ├── Long-term
     │    ├── Task context
     │    └── Knowledge base
     │
     ├── Planning
     │
     ├── Policy Engine
     │
     ├── Budget Engine
     │
     ├── Approval Engine
     │
     └── Tool Router
              │
              ▼
       External systems
```

The LLM is **not** allowed to directly access the database or arbitrary infrastructure.

---

# 🛡️ AI Autonomy

Five autonomy levels are supported conceptually:

| Level | Name | Behaviour |
|---:|---|---|
| 0 | Assistant | Answers and suggests |
| 1 | Suggest | Creates recommendations |
| 2 | Execute with Approval | Executes after approval |
| 3 | Limited Autonomous | Executes allowed low-risk actions |
| 4 | Highly Autonomous | Maximum permitted autonomy |

The default is intentionally conservative:

**Execute with Approval**

---

# ⚠️ AI Risk Model

Actions are classified:

- LOW
- MEDIUM
- HIGH
- CRITICAL

Examples requiring approval:

- sending external email
- publishing campaigns
- spending money
- deleting data
- changing permissions
- modifying security
- changing billing
- destructive infrastructure operations

AI employees cannot:

- grant themselves permissions
- increase their own autonomy
- access API keys
- change human roles
- delete audit logs
- disable security controls
- change billing
- create unrestricted AI employees
- grant themselves database access

---

# 🏢 Multi-tenancy

A user may belong to multiple workspaces.

```text
User
 ├── Workspace A
 │    ├── Engineering
 │    ├── Marketing
 │    └── Finance
 │
 └── Workspace B
      ├── Sales
      └── Operations
```

Workspace roles:

- OWNER
- ADMIN
- DEPARTMENT_SUPERVISOR
- MEMBER
- GUEST

Every workspace-scoped operation must validate membership and authorization.

---

# 🗺️ Virtual Office

The future Phaser layer owns:

- 2D map
- player movement
- AI movement
- collision
- camera
- animation
- interactive objects
- rooms
- portals
- proximity
- realtime player positions

React owns:

- dashboard
- settings
- forms
- chat UI
- meetings
- administration
- AI control center
- approval dialogs

This separation prevents the React application state from becoming the game-state engine.

---

# 🌐 Realtime

Realtime state is deliberately separated from PostgreSQL.

```text
Client
  │
  ▼
WebSocket
  │
  ▼
Realtime Server
  │
  ├── Presence
  ├── Player movement
  ├── Room state
  ├── Chat events
  └── AI events
  │
  ▼
Redis
  │
  ├── Presence
  ├── Pub/Sub
  ├── Ephemeral state
  └── Distributed coordination
```

Player movement must **not** create a PostgreSQL write for every frame.

PostgreSQL stores durable business state.

Redis/WebSocket stores transient realtime state.

---

# 🎙️ Meetings

The planned meeting architecture uses:

- WebRTC
- LiveKit/SFU
- microphone
- camera
- speaker selection
- screen sharing
- device selection
- reconnect
- meeting rooms
- participant presence

---

# 💬 Communication

Planned communication layers:

- Global chat
- Room chat
- Proximity chat
- Direct messages
- Emoji
- Mentions
- Replies
- Typing indicators
- Unread counters
- Message history
- Pagination

---

# 📊 AI Performance

AI employees will eventually expose:

- task completion rate
- success rate
- quality
- accuracy
- response time
- token consumption
- estimated cost
- approval rate
- rejection rate
- errors
- human satisfaction
- KPI progress
- budget utilization

A normalized performance score of **0–100** can be calculated from these signals.

---

# 💰 AI Cost Control

Every AI employee can have:

- daily budget
- monthly budget
- token usage
- estimated cost
- warning threshold
- automatic pause threshold

Example:

```text
Monthly Budget: $50
        │
        ├── 50% → normal
        ├── 80% → warning
        ├── 100% → automatic pause
        └── manual supervisor override
```

---

# 🗃️ Knowledge & Memory

The planned memory system supports:

- short-term memory
- long-term memory
- task context
- conversation history
- department knowledge
- company knowledge
- permission-scoped retrieval
- document chunks
- vector retrieval

PostgreSQL + pgvector is the preferred direction for the first implementation.

---

# 🧰 AI Tools

AI employees will access tools through a controlled router.

Planned tools:

- searchKnowledge
- createDocument
- readDocument
- sendEmail
- createTask
- updateTask
- scheduleMeeting
- readCalendar
- createReport
- requestApproval

Execution pipeline:

```text
Tool request
    ↓
Schema validation
    ↓
Permission check
    ↓
Risk classification
    ↓
Approval policy
    ↓
Budget check
    ↓
Execute
    ↓
Audit log
    ↓
Result
```

---

# 📁 Project structure

```text
src/
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── login/
│   └── workspace/
│
├── ai/
│   ├── agents/
│   ├── providers/
│   ├── memory/
│   ├── tools/
│   ├── policies/
│   ├── approvals/
│   └── evaluation/
│
├── components/
├── features/
│   ├── auth/
│   ├── workspace/
│   ├── office/
│   ├── chat/
│   ├── meetings/
│   ├── departments/
│   └── ai-workforce/
│
├── game/
│   ├── engine/
│   ├── player/
│   ├── ai-player/
│   ├── map/
│   ├── collision/
│   ├── camera/
│   └── networking/
│
├── realtime/
├── server/
├── db/
├── hooks/
├── lib/
├── types/
└── utils/

prisma/
├── schema.prisma
└── seed.ts
```

---

# 🛠️ Local development

## Requirements

Recommended:

- Node.js 22+
- npm
- PostgreSQL 17+
- Redis 8+
- Git
- Docker Desktop or Docker Engine

Optional:

- Ollama
- LiveKit
- S3/R2-compatible object storage

---

## 1. Clone

```bash
git clone https://github.com/Strong-Bee/Virtual-Ofice.git
cd Virtual-Ofice
```

---

## 2. Install

```bash
npm install
```

---

## 3. Environment

```bash
cp .env.example .env.local
```

Configure:

```env
DATABASE_URL=...
REDIS_URL=...
AUTH_SECRET=...
```

Then configure whichever AI providers you want.

---

## 4. Start infrastructure

```bash
docker compose up -d
```

This starts:

- PostgreSQL
- Redis

Check:

```bash
docker compose ps
```

---

## 5. Generate Prisma client

```bash
npm run db:generate
```

---

## 6. Run migrations

```bash
npm run db:migrate
```

---

## 7. Seed development data

```bash
npm run db:seed
```

The seed creates:

- Demo workspace
- Marketing
- Engineering
- Finance
- human supervisors
- AI employees
- main office
- office rooms

---

## 8. Start Next.js

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🧪 Testing

Run unit tests:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

Type checking:

```bash
npm run typecheck
```

Lint:

```bash
npm run lint
```

Production build:

```bash
npm run build
```

---

# 🔑 Provider setup examples

## OpenAI

```env
OPENAI_API_KEY=...
```

Optional:

```env
OPENAI_BASE_URL=https://api.openai.com/v1
```

## Anthropic

```env
ANTHROPIC_API_KEY=...
```

## Gemini

```env
GEMINI_API_KEY=...
```

Google currently recommends environment variables for Gemini credentials. citeturn0search0

## OpenRouter

```env
OPENROUTER_API_KEY=...
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
```

## NVIDIA NIM

```env
NVIDIA_API_KEY=...
NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1
```

This allows NVIDIA models to be selected without changing the application architecture.

## Ollama

```env
OLLAMA_BASE_URL=http://127.0.0.1:11434/v1
OLLAMA_API_KEY=ollama
```

Ollama can therefore be used as the local/private AI backend.

## Custom OpenAI-compatible API

```env
CUSTOM_AI_BASE_URL=https://your-server.example/v1
CUSTOM_AI_API_KEY=...
CUSTOM_AI_MODEL=your-model
```

This makes it possible to connect self-hosted inference servers and compatible gateways without changing the core agent architecture.

---

# ☁️ Production deployment

Recommended production topology:

```text
                     Cloudflare
                         │
                  ┌──────▼──────┐
                  │ Load Balancer│
                  └──────┬──────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
      Next.js        Realtime #1    Realtime #2
          │              │              │
          │              └──────┬───────┘
          │                     ▼
          │                   Redis
          │                     │
          └──────────────┬──────┘
                         ▼
                    PostgreSQL
                         │
                 Object Storage
```

For Vercel:

- deploy Next.js application
- use managed PostgreSQL
- use managed Redis
- deploy realtime server separately
- use LiveKit Cloud or self-hosted LiveKit
- use R2/S3 for files

---

# 🔒 Security checklist

Before production:

- [ ] Generate strong AUTH_SECRET
- [ ] Never commit .env.local
- [ ] Rotate leaked credentials
- [ ] Enable database TLS
- [ ] Enable Redis authentication/TLS
- [ ] Configure secure cookies
- [ ] Validate every API payload with Zod
- [ ] Enforce workspace membership
- [ ] Enforce RBAC
- [ ] Authenticate WebSocket connections
- [ ] Rate-limit authentication
- [ ] Rate-limit AI endpoints
- [ ] Validate uploads
- [ ] Restrict MIME types
- [ ] Limit upload size
- [ ] Sanitize rendered content
- [ ] Never log secrets
- [ ] Audit AI actions
- [ ] Enforce AI budgets
- [ ] Enforce approval policies
- [ ] Prevent AI privilege escalation
- [ ] Protect destructive operations
- [ ] Enable monitoring and alerts

---

# 🧭 Application routes

Current and planned routes include:

```text
/
├── login
├── dashboard
│
└── workspace/[workspaceId]
    ├── office/[officeId]
    ├── departments
    ├── departments/[departmentId]
    ├── departments/[departmentId]/ai
    ├── editor
    ├── members
    ├── meetings
    ├── settings
    └── settings/ai-governance
```

---

# 🗄️ Database domains

The Prisma schema is designed around:

- Users
- Accounts
- Sessions
- Workspaces
- Workspace members
- Departments
- Department members
- Department supervisors
- Offices
- Rooms
- Maps
- Map objects
- Avatars
- Presence
- Messages
- AI employees
- AI tasks
- AI activities
- AI approvals

The schema will expand as the remaining phases are implemented.

---

# 🧑‍💻 Development principles

### Server-first security

Business authorization happens server-side.

### Data-driven office

Maps, rooms, objects and interactions are database/configuration driven.

### Realtime isolation

Transient movement/presence state does not become database traffic.

### AI provider abstraction

No department should be permanently coupled to one model vendor.

### Human-in-the-loop

High-impact AI actions require explicit human control.

### Least privilege

Every AI employee gets only the tools and permissions it needs.

### Auditability

Important AI actions must be traceable.

### Type safety

TypeScript strict mode and schema validation are preferred throughout the project.

---

# 🤝 Contributing

1. Create a feature branch.
2. Make the smallest safe change.
3. Add or update tests.
4. Run:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

5. Open a pull request.

---

# 📜 License

The repository should receive an explicit license before public distribution.

Until a license is added, do not assume that the source code is freely reusable.

---

# ⭐ Project direction

Virtual Office is intended to evolve from a virtual workplace into a complete **AI company operating platform**:

```text
Virtual Office
      │
      ├── Human Workforce
      ├── AI Workforce
      ├── Departments
      ├── Knowledge
      ├── Tasks
      ├── Meetings
      ├── Communication
      ├── Finance
      ├── Analytics
      ├── Governance
      └── Automation
```

The final system should allow a company to define its organizational structure, place humans and AI employees inside a persistent virtual office, assign work, supervise AI decisions, control budgets, review performance and operate the business from one platform.
