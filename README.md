# Bazardor

Clean source copy of the Bazardor application.

## Required environment variables

- `DATABASE_URL`
- `BETTER_AUTH_URL`
- `BETTER_AUTH_SECRET`

Optional:

- `API_BASE_URL` to override the primary product API endpoint
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to enable Google sign-in
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` to enable GitHub sign-in

Install dependencies with `npm install`, then run `npm run dev` for development or `npm run build` to create a production build.
