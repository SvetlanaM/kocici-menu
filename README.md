
# Kočičí Menu 🐱🍽️  

A web‑application that helps cat owners keep track of what their cats love (or hate) to eat, compare product quality & price, and plan pantry supplies in a smarter way.

Live demo » **https://www.kocicimenu.cz**  
Demo credentials: **admin@kocicimenu.cz / Admin12345**

---

## Features
* Add and manage **multiple cats**
* **Review** every food your cats have tried
* Track review history with **interactive charts**
* **Recommendation engine** suggesting products that fit each cat’s taste & nutrition profile
* Powerful **search, filter & sort** across hundreds of products
* **Nutrition tips** and vet contacts in one place
* Personal **activity statistics** and supply planning dashboard

## Tech stack
| Layer | Technology |
|-------|------------|
| Front‑end | **Next.js 11** · React 17 · TypeScript · Tailwind CSS |
| Data | Apollo Client · **Hasura GraphQL** engine |
| State / hooks | React Hook Form · React Context |
| Auth | Netlify Identity · JSON Web Tokens |
| Uploads | Amazon S3 via `next‑s3-upload` |
| Charts | Chart.js + react‑chartjs‑2 |
| Tooling | ESLint · Prettier · GraphQL Codegen · Husky |
| CI/CD | Netlify Build Plugins |

## Architecture overview
```text
Browser ─┬─▶ Next.js pages / API routes
         │
         ├─▶ Apollo Client (GraphQL queries & mutations)
         │
         └─▶ Netlify Functions (server‑side auth, S3 upload‑sign)
                      │
                      ▼
            Hasura GraphQL ⇄ PostgreSQL
```

---

## Getting started

### Prerequisites
* **Node.js 16 LTS** (or newer)
* **Yarn** (recommended) or npm
* Access to a **Hasura** instance (cloud or local) containing the project schema
* (Optional) **Docker & Docker Compose** if you prefer containerised setup

### Local development
```bash
# 1. Clone repository
$ git clone https://github.com/SvetlanaM/kocici-menu.git
$ cd kocici-menu

# 2. Configure environment
$ cp .env.example .env   # then edit .env and fill in secrets

# 3. Install dependencies
$ yarn install --frozen-lockfile

# 4. Snapshot GraphQL schema & generate typed hooks
$ yarn introspect   # requires HASURA_ENDPOINT & HASURA_PASSWORD
$ yarn codegen

# 5. Start development server
$ yarn dev
# App running at http://localhost:3000
```

### Docker
1. **Build the image**
   ```bash
   docker build -t kocici-menu .
   ```
2. **Run the container** (reads variables from your existing `.env` file):
   ```bash
   docker run --env-file .env -p 3000:3000 kocici-menu
   ```

> **Tip:** A minimal `docker-compose.yml` is included below for convenience. Feel free to extend it with a Postgres + Hasura service when developing offline.

```yaml
version: "3.9"
services:
  web:
    build: .
    ports:
      - "3000:3000"
    env_file: .env
    restart: unless-stopped
```

---

## Environment variables
| Variable | Required | Description |
|----------|----------|-------------|
| `HASURA_ENDPOINT` | ✅ | URL of your Hasura GraphQL endpoint (`https://…/v1/graphql`) |
| `HASURA_PASSWORD` | ✅ | Hasura admin secret used by `yarn introspect` |
| `NEXT_PUBLIC_HASURA_PASSWORD` |  | Exposes password in browser (use **only** in trusted dev env) |
| `NEXT_PUBLIC_CAT_APP_TESTING_API_ENDPOINT` |  | Mock API endpoint for end‑to‑end tests |
| `S3_UPLOAD_REGION` / `NEXT_PUBLIC_S3_UPLOAD_REGION` | ✅ if uploads | AWS region, e.g. `eu-central-1` |
| `S3_UPLOAD_BUCKET` / `NEXT_PUBLIC_S3_UPLOAD_BUCKET` | ✅ if uploads | S3 bucket name |
| `S3_UPLOAD_KEY` / `NEXT_PUBLIC_S3_UPLOAD_KEY` | ✅ if uploads | IAM access key |
| `S3_UPLOAD_SECRET` / `NEXT_PUBLIC_S3_UPLOAD_SECRET` | ✅ if uploads | IAM secret |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` |  | GA‑4 measurement ID |
| `SITE_URL` / `NEXT_PUBLIC_WEBSITE_URL` |  | Fully‑qualified URL used by `next‑sitemap` |

Create a **`.env`** file and define the variables that apply to your environment. Values prefixed with `NEXT_PUBLIC_` are exposed client‑side; keep secrets on the server side only.

---

## Project scripts
| Script | What it does |
|--------|--------------|
| `yarn dev` | Run Next.js in development mode with hot‑reload |
| `yarn build` | Build the production bundle (`.next/`) |
| `yarn start` | Start production server (needs `yarn build` first) |
| `yarn lint` | ESLint + TypeScript checks |
| `yarn introspect` | Download latest Hasura schema into `schema.graphql` |
| `yarn codegen` | Generate typed Apollo hooks in `graphql/generated/` |

---

## Deployment (Netlify)
The repository is pre‑configured for Netlify:
1. Set the **environment variables** in *Site Settings → Build & Deploy → Environment*.
2. Netlify will run `yarn introspect && yarn codegen && yarn build` automatically (see `netlify.toml`).
3. SSR pages are handled by the official **@netlify/plugin‑nextjs** plugin.

---

## Contributing
Contributions, bug reports and cat memes are welcome! Fork the repo, create a feature branch and open a pull request.

---

## License
[MIT](LICENSE)
