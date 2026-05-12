# IA6 - Landing corporativa de lloguer de campers

Projecte full-stack amb Next.js 16 per a una empresa de lloguer de furgonetes camper.

## Stack

- Next.js 16 (App Router)
- PostgreSQL (Docker)
- Prisma ORM
- Auth.js (next-auth, Credentials)
- Control d'acces per rols (EDITOR i ADMIN)

## Funcionalitats principals

- Landing publica amb proposta de valor.
- Cataleg de models camper persistit a BD.
- Detall de model amb comentaris.
- Comentaris: lectura publica, creacio nomes per usuaris autenticats.
- Formulari de contacte amb validacio i persistencia.
- Panell admin per gestionar models (EDITOR/ADMIN).
- Panell admin per gestionar rols d'usuaris (nomes ADMIN).

## Estructura (resum)

- `src/app/(site)` -> pages publiques (`/`, `/campers`, `/campers/[slug]`, `/login`, `/register`).
- `src/app/admin` -> backoffice (`/admin/campers`, `/admin/users`).
- `src/app/api` -> Route Handlers API.
- `src/controllers/api` -> capa controller.
- `src/services` -> capa de servei i access a dades.
- `prisma/schema.prisma` -> model de dades.

## Models de dades

- `User` (email, passwordHash, role)
- `CamperModel` (fitxa del model, preu, caracteristiques, publicacio)
- `Comment` (comentari per model i usuari)
- `ContactRequest` (sollicituds del formulari)

## Variables d'entorn

Crea `.env` amb:

```env
DATABASE_URL="postgresql://blog:blogsecret@localhost:5432/blogdb?schema=public"
AUTH_SECRET="canvia-aquest-valor-en-produccio"
```

## Execucio local

1. Instal lar dependencies:

```bash
npm install
```

2. Arrencar PostgreSQL (Docker):

```bash
docker compose up -d
```

3. Aplicar migracions:

```bash
npx prisma migrate dev
```

4. Generar client Prisma:

```bash
npx prisma generate
```

5. Carregar dades de prova:

```bash
npm run db:seed
```

6. Iniciar aplicacio:

```bash
npm run dev
```

## Credencials de prova

- ADMIN: `admin@demo.local` / `demo1234`
- EDITOR: `editor@demo.local` / `editor1234`
- USER autenticat: `user@demo.local` / `user1234`

## Endpoints principals

- Public:
	- `GET /api/campers`
	- `GET /api/campers/[slug]`
	- `GET /api/comments/[camperModelId]`
	- `POST /api/contact`
	- `POST /api/auth/register`
- Autenticat:
	- `POST /api/comments`
- Admin (EDITOR/ADMIN):
	- `GET/POST /api/admin/models`
	- `GET/PATCH/DELETE /api/admin/models/[id]`
- Admin (nomes ADMIN):
	- `GET /api/admin/users`
	- `PATCH /api/admin/users/[id]/role`

## Relacio amb sprints IA6

- Sprint 1:
	- Landing + cataleg + formulari.
	- BD, migracions i seed operatives.
- Sprint 2:
	- API completa (models, comentaris, contacte).
	- Auth.js i restriccions per rol.
	- Backoffice de models i rols.

## Deploy

- Entorn recomanat: Vercel + PostgreSQL gestionat (Neon/Supabase/Railway).
- En produccio, executa migracions amb:

```bash
npx prisma migrate deploy
```

## URL de demo

- Local: `http://localhost:3000`
- Produccio: pendent de desplegament.
