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

## Theme switching

The shared theme toggle uses the browser View Transitions API with an inline GDG logo mask.
Its centered 600 ms reveal blends into the next theme, without a pause, an oversized zoom or an image download on click.
Both theme directions use the same reveal; reduced-motion preferences and older browsers switch instantly.
Theme changes continue through `lib/theme.ts` so appearance settings and the navigation toggle stay in sync.
Run `node scripts/check-theme-toggle.mjs` to check theme persistence, settings synchronization, fallbacks and transition cleanup.
