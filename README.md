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

## Prompts



- `Crea una aplicacio full-stack amb Next.js 16 (App Router), Prisma i PostgreSQL per una empresa de lloguer de campers. Implementa arquitectura en capes (routes -> controllers -> services), validacio de dades, gestio d'errors i separacio clara de responsabilitats.`

- `Implementa autenticacio amb Auth.js (credentials) i sessions JWT. Afegeix rols ADMIN i EDITOR, proteccio de rutes /admin amb middleware/proxy, i control de permisos per endpoint: comentaris nomes autenticats, gestio de models per EDITOR/ADMIN i gestio de rols nomes ADMIN.`

- `Construeix un backoffice complet per campers amb CRUD: llistat, alta, edicio i baixa. El model camper ha de tenir slug unic, nom, descripcio curta i llarga, preu/dia, places, llits, transmissio, combustible, imageUrl i isPublished. Inclou formularis robustos i missatges d'error clars.`

- `Crea la part publica amb landing premium, cataleg de campers i pagina de detall per slug. Mostra cards amb imatge, especificacions i preu. Al detall, afegeix comentaris ordenats per data i formulari per crear comentari amb comprovacio de sessio.`

- `Aplica disseny dark modern i responsive amb una UI consistent entre zona publica i admin: capcalera global, targetes amb jerarquia visual, bon contrast, estat actiu al menu i components reutilitzables.`



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
