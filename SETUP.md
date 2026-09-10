# Local setup

The required tools and project libraries are already covered in the Notion tasks.

Run:

```bash
# Create the local frontend environment file.
cp .env.example .env.local

# Start the frontend development server.
pnpm dev
```

Open `http://localhost:3000`. The frontend is configured to use `http://localhost:3001` as its local API base URL via `NEXT_PUBLIC_API_URL`.

Use `pnpm check` for linting and type checking, and `pnpm build` to validate a production build.
